import { Request, Response } from "express";
import pool from "../config/pool";

export const getServiceCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM master_service_category`);
    res
      .status(200)
      .json({ message: "Success getting service category", data: result.rows });
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
 *        POST S.CATEGORY       *
 *                              *
 ********************************/

export const createServiceCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { category_name } = req.body;

    await client.query("BEGIN");

    const checkCategoryQuery = `SELECT 1 FROM master_service_category WHERE category_name = $1`;
    const checkCategoryResult = await client.query(checkCategoryQuery, [
      category_name,
    ]);

    if (checkCategoryResult?.rowCount && checkCategoryResult.rowCount > 0) {
      await client.query("ROLLBACK");
      res.status(400).json({
        message: `Service category with name ${category_name} already exists`,
      });
      return;
    }

    const insertQuery = `
      INSERT INTO master_service_category (category_name) 
      VALUES ($1) 
      RETURNING category_name
    `;
    const result = await client.query(insertQuery, [category_name]);

    if (!result?.rowCount || result.rowCount === 0) {
      await client.query("ROLLBACK");
      res.status(500).json({ message: "Failed to create service category" });
      return;
    }

    const serviceCategoryName = result.rows[0]?.category_name || "";

    await client.query("COMMIT");

    res.status(201).json({
      message: `Service category ${serviceCategoryName} created successfully`,
      data: result.rows[0],
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error creating service category:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *        PUT S.CATEGORY        *
 *                              *
 ********************************/

export const updateServiceCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { service_category_id } = req.params;
    const { category_name } = req.body;

    const parsedServiceId = parseInt(service_category_id);

    client.query("BEGIN");

    const result = await client.query(
      `UPDATE master_service_category SET category_name = $1 WHERE service_category_id = $2 RETURNING *`,
      [category_name, parsedServiceId]
    );

    if (result.rowCount === 0) {
      client.query("ROLLBACK");
      res.status(404).json({
        message: `Service category with service id ${service_category_id} not found`,
      });
      return;
    }

    const serviceCategoryName = result.rows[0].category_name;

    client.query("COMMIT");

    res.status(200).json({
      message: `Service category ${serviceCategoryName} updated successfully`,
      data: result.rows,
    });
  } catch (error) {
    if (client) {
      client.query("ROLLBACK");
    }
    console.error("Error updating service category:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *      DELETE S.CATEGORY       *
 *                              *
 ********************************/

export const deleteServiceCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { service_category_id } = req.params;
    const parsedServiceId = parseInt(service_category_id);

    const result = await client.query(
      `DELETE FROM master_service_category WHERE service_category_id = $1 RETURNING category_name`,
      [parsedServiceId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Service category not found" });
      return;
    }

    const serviceCategoryName = result.rows[0].category_name;

    res.status(200).json({
      message: `Service category ${serviceCategoryName} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting service category:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
