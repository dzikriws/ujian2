import { Request, Response } from "express";
import pool from "../config/pool";

export const getDoctors = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM master_doctor");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *         POST DOCTOR          *
 *                              *
 ********************************/

export const createDoctor = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { doctor_name, address, city, country, kategori, contact_phone } =
      req.body;

    client.query("BEGIN");

    const createDoctorQuery = `
        INSERT INTO master_doctor 
          (doctor_name_name, address, city, country, kategori, contact_phone) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
    `;

    const result = await client.query(createDoctorQuery, [
      doctor_name,
      address,
      city,
      country,
      kategori,
      contact_phone,
    ]);

    const doctorName = result.rows[0].doctor_name_name;

    await client.query("COMMIT");

    res
      .status(201)
      .json({
        message: `Doctor ${doctorName} created successfully`,
        data: result.rows[0],
      });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *          PUT DOCTOR          *
 *                              *
 ********************************/

export const updateDoctor = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { doctor_id } = req.params;
    const { doctor_name, address, city, country, kategori, contact_phone } =
      req.body;

    const parsedDoctorId = parseInt(doctor_id);

    if (isNaN(parsedDoctorId)) {
      res.status(400).json({ message: "Invalid doctor id" });
      return;
    }

    client.query("BEGIN");

    const updateDoctorQuery = `
          UPDATE master_doctor 
          SET doctor_name_name = $1, 
            address = $2, city = $3, country = $4, 
            kategori = $5, contact_phone = $6
          WHERE doctor_id = $7
          RETURNING *
      `;

    const result = await client.query(updateDoctorQuery, [
      doctor_name,
      address,
      city,
      country,
      kategori,
      contact_phone,
      parsedDoctorId,
    ]);

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    const doctorName = result.rows[0].doctor_name_name;

    await client.query("COMMIT");

    res.status(200).json({
      message: `Doctor ${doctorName} updated successfully`,
      data: result.rows[0],
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *        DELETE DOCTOR         *
 *                              *
 ********************************/

export const deleteDoctor = async (req: Request, res: Response) => {
  let client;
  try {
    client = await pool.connect();
    const { doctor_id } = req.params;
    const parsedDoctorId = parseInt(doctor_id);

    const deleteDoctorQuery = `
        DELETE FROM master_doctor 
        WHERE doctor_id = $1
        RETURNING doctor_name_name
    `;

    const result = await client.query(deleteDoctorQuery, [parsedDoctorId]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    const doctorName = result.rows[0].doctor_name_name;

    res
      .status(200)
      .json({ message: `Doctor ${doctorName} deleted successfully` });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
