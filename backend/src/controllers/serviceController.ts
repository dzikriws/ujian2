import { Request, Response } from "express";
import pool from "../config/pool";

export const getServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM public."vw.service"`);
    res.status(200).json({
      message: "Success getting services",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *         POST SERVICES        *
 *                              *
 ********************************/

export const createService = async (
  req: Request<
    {},
    {},
    {
      service_name: string;
      service_group: string;
      categories: { category_id: number; price: number }[];
    }
  >,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { service_name, service_group, categories } = req.body;

    await client.query("BEGIN");

    // Checking service name
    const checkServiceQuery = `
      SELECT 1
      FROM master_service
      WHERE service_name = $1 AND service_group = $2
    `;

    const checkServiceResult = await client.query(checkServiceQuery, [
      service_name,
      service_group,
    ]);

    if (checkServiceResult?.rowCount && checkServiceResult.rowCount > 0) {
      await client.query("ROLLBACK");
      res.status(400).json({
        message: `Service with name ${service_name} already exists in ${service_group}'s group`,
      });
      return;
    }

    // Creating service
    const createServiceQuery = `
      INSERT INTO master_service
        (service_name, service_group)
      VALUES ($1, $2)
      RETURNING service_id, service_name
    `;

    const result = await client.query(createServiceQuery, [
      service_name,
      service_group,
    ]);

    const serviceId = result.rows[0].service_id;

    // Creating into pricelists
    for (const category of categories) {
      const createServiceCategoryQuery = `
        INSERT INTO pricelists
          (service_id, service_category_id, price)
        VALUES ($1, $2, $3)
      `;

      await client.query(createServiceCategoryQuery, [
        serviceId,
        category.category_id,
        category.price,
      ]);
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: `Service ${service_name} with ${service_group} group created successfully`,
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *         PUT SERVICES         *
 *                              *
 ********************************/

export const updateService = async (
  req: Request<
    { service_id: string },
    {},
    {
      service_name: string;
      service_group: string;
      categories: { category_id: number; price: number }[];
    }
  >,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { service_id } = req.params;
    const { service_name, service_group, categories } = req.body;

    const parsedServiceId = parseInt(service_id);

    if (isNaN(parsedServiceId)) {
      res.status(400).json({ message: "Invalid service_id" });
      return;
    }

    await client.query("BEGIN");

    // Checking service
    const checkServiceQuery = `
        SELECT service_id FROM master_service WHERE service_id = $1
      `;
    const checkServiceResult = await client.query(checkServiceQuery, [
      parsedServiceId,
    ]);

    if (checkServiceResult.rowCount === 0) {
      await client.query("ROLLBACK");
      res.status(404).json({ message: "Service not found" });
      return;
    }

    // Update service
    const updateServiceQuery = `
        UPDATE master_service
        SET service_name = $1, service_group = $2
        WHERE service_id = $3
      `;
    await client.query(updateServiceQuery, [
      service_name,
      service_group,
      parsedServiceId,
    ]);

    // Take existing categories
    const existingCategoriesQuery = `
        SELECT service_category_id FROM pricelists WHERE service_id = $1
      `;
    const existingCategoriesResult = await client.query(
      existingCategoriesQuery,
      [parsedServiceId]
    );
    const existingCategoryIds = existingCategoriesResult.rows.map(
      (row) => row.service_category_id
    );

    // Update in pricelists
    for (const category of categories) {
      if (existingCategoryIds.includes(category.category_id)) {
        // If category already exists, update
        const updateCategoryQuery = `
            UPDATE pricelists
            SET price = $1
            WHERE service_id = $2 AND service_category_id = $3
          `;
        await client.query(updateCategoryQuery, [
          category.price,
          parsedServiceId,
          category.category_id,
        ]);
      } else {
        // If category doesn't exist, insert
        const insertCategoryQuery = `
            INSERT INTO pricelists (service_id, service_category_id, price)
            VALUES ($1, $2, $3)
          `;
        await client.query(insertCategoryQuery, [
          parsedServiceId,
          category.category_id,
          category.price,
        ]);
      }
    }

    // Delete categories not in input
    const inputCategoryIds = categories.map((category) => category.category_id);
    const categoriesToDelete = existingCategoryIds.filter(
      (id) => !inputCategoryIds.includes(id)
    );

    if (categoriesToDelete.length > 0) {
      const deleteCategoryQuery = `
          DELETE FROM pricelists
          WHERE service_id = $1 AND service_category_id = ANY($2::int[])
        `;
      await client.query(deleteCategoryQuery, [service_id, categoriesToDelete]);
    }

    await client.query("COMMIT");

    res.status(200).json({
      message: `Service ${service_name} updated successfully`,
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *        DELETE SERVICES       *
 *                              *
 ********************************/

export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { service_id } = req.params;
    const result = await client.query(
      `DELETE FROM master_service WHERE service_id = $1 RETURNING *`,
      [service_id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Service not found" });
      return;
    }

    const serviceName = result.rows[0].service_name;
    const serviceGroup = result.rows[0].service_group;

    res.status(200).json({
      message: `Service ${serviceName} in ${serviceGroup}'s group deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
