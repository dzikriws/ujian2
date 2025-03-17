import { Request, Response } from "express";
import pool from "../config/pool";
import md5 from "md5";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  let client;
  try {
    client = await pool.connect();
    const query = `
      SELECT username, email, hash_password FROM master_user 
      WHERE (username = $1 OR email = $2) AND status = 'A'
    `;
    const result = await client.query(query, [username || null, email || null]);

    if (result.rows.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = result.rows[0];
    if (md5(password) !== user.hash_password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const findRoleQuery = `
    SELECT role FROM user_role 
    WHERE username = $1 AND status = 'A'
  `;
    const roleResult = await client.query(findRoleQuery, [user.username]);

    const roles =
      roleResult.rows.length > 0
        ? roleResult.rows.map((row) => ({ role: row.role }))
        : undefined;

    res.status(200).json({
      message: "Login successful",
      data: {
        username: user.username,
        email: user.email,
        ...(roles && { roles }),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { username, email, password } = req.body;

//   const client = await pool.connect();
//   try {
//     const checkQuery = `
//         SELECT username, email FROM master_user
//         WHERE username = $1 OR email = $2
//       `;
//     const checkResult = await client.query(checkQuery, [username, email]);

//     if (checkResult.rows.length > 0) {
//       res.status(409).json({ message: "Username or email already exists" });
//       return;
//     }

//     const hashedPassword = md5(password);
//     const insertQuery = `
//         INSERT INTO master_user (username, email, hash_password, status)
//         VALUES ($1, $2, $3, 'A') RETURNING username, email
//       `;
//     const result = await client.query(insertQuery, [
//       username,
//       email,
//       hashedPassword,
//     ]);

//     res.status(201).json({
//       message: "User registered successfully",
//       data: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   } finally {
//     client.release();
//   }
// };
