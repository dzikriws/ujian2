import { Request, Response } from "express";
import pool from "../config/pool";

/********************************
 *                              *
 *      GET TRANSACTIONS        *
 *                              *
 ********************************/
export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();

    const {
      doctor_name,
      patient_name,
      username,
      service_group,
      start_date,
      end_date,
      min_grand_total,
      max_grand_total,
      skip,
      take,
    } = req.query;

    let query = `SELECT * FROM public."vw.transactions" WHERE 1=1`;
    const queryParams: any[] = [];
    let paramIndex = 1;

    // Filtering
    if (doctor_name) {
      query += ` AND doctor_name ILIKE $${paramIndex}`;
      queryParams.push(`%${doctor_name}%`);
      paramIndex++;
    }
    if (patient_name) {
      query += ` AND patient_name ILIKE $${paramIndex}`;
      queryParams.push(`%${patient_name}%`);
      paramIndex++;
    }
    if (username) {
      query += ` AND username ILIKE $${paramIndex}`;
      queryParams.push(`%${username}%`);
      paramIndex++;
    }
    if (service_group) {
      query += ` AND service_group ILIKE $${paramIndex}`;
      queryParams.push(`%${service_group}%`);
      paramIndex++;
    }
    if (start_date) {
      query += ` AND transaction_date >= $${paramIndex}`;
      queryParams.push(start_date);
      paramIndex++;
    }
    if (end_date) {
      query += ` AND transaction_date <= $${paramIndex}`;
      queryParams.push(end_date);
      paramIndex++;
    }
    if (min_grand_total) {
      query += ` AND grand_total >= $${paramIndex}`;
      queryParams.push(min_grand_total);
      paramIndex++;
    }
    if (max_grand_total) {
      query += ` AND grand_total <= $${paramIndex}`;
      queryParams.push(max_grand_total);
      paramIndex++;
    }
    if (skip) {
      query += ` OFFSET $${paramIndex}`;
      queryParams.push(skip);
      paramIndex++;
    }
    if (take) {
      query += ` LIMIT $${paramIndex}`;
      queryParams.push(take);
      paramIndex++;
    }

    const result = await client.query(query, queryParams);

    res.status(200).json({
      message: "Success getting transactions",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *      GET TRANSACTION         *
 *                              *
 ********************************/

export const getTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();
    const { transaction_id } = req.params;
    const result = await client.query(
      `SELECT * FROM public."vw.transactions" WHERE transaction_id = $1`,
      [transaction_id]
    );

    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ message: `Transaction with id ${transaction_id} not found` });
      return;
    }
    res
      .status(200)
      .json({ message: "Success getting transaction", data: result.rows });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

/********************************
 *                              *
 *      POST TRANSACTION        *
 *                              *
 ********************************/

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  let client;
  try {
    client = await pool.connect();

    const {
      doctor_id,
      patient_name,
      service_id,
      date = new Date(),
      tax_rate = 0,
      username,
      details,
    } = req.body;

    await client.query("BEGIN");

    // Finding service group
    const findServiceGroupQuery = `
        SELECT service_group FROM master_service WHERE service_id = $1
      `;
    const findServiceGroupResult = await client.query(findServiceGroupQuery, [
      service_id,
    ]);

    const serviceGroup = findServiceGroupResult.rows[0].service_group;

    // Inserting transaction
    const insertTransactionQuery = `
        INSERT INTO transactions 
          (service_group, doctor_id, patient_name, transaction_date, tax_rate, username) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `;
    const insertTransactionResult = await client.query(insertTransactionQuery, [
      serviceGroup,
      doctor_id,
      patient_name,
      date,
      tax_rate,
      username,
    ]);

    const transactionId = insertTransactionResult.rows[0].transaction_id;

    // Inserting transaction details
    for (const detail of details) {
      // Finding price
      const findPriceQuery = `
          SELECT price FROM pricelists WHERE service_id = $1 AND service_category_id = $2
        `;
      const findPriceResult = await client.query(findPriceQuery, [
        service_id,
        parseInt(detail.category_id),
      ]);

      const price = findPriceResult.rows[0].price;
      const amount = price * detail.qty;

      // Parsing type
      const parsedPrice = parseFloat((Number(price) || 0).toFixed(2));
      const parsedAmount = parseFloat((Number(amount) || 0).toFixed(2));

      const insertTransactionDetailQuery = `
          INSERT INTO transaction_details 
            (transaction_id, service_id, service_category, quantity, price, amount) 
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
      await client.query(insertTransactionDetailQuery, [
        transactionId,
        service_id,
        detail.category_id,
        detail.qty,
        parsedPrice,
        parsedAmount,
      ]);
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: `Transaction for ${patient_name} handled by ${username} created successfully`,
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
