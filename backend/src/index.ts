import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Morgan from "./config/morgan";

import userRoutes from "./routes/userRoute";
import doctorRoutes from "./routes/doctorRoute";
import serviceRoutes from "./routes/serviceRoute";
import serviceCategoryRoutes from "./routes/serviceCategoryRoute";
import transactionRoutes from "./routes/transactionRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(Morgan);

app.use("/login", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/services", serviceRoutes);
app.use("/service_category", serviceCategoryRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on PORT:${PORT} in ${process.env.DB_NAME} db as ${process.env.DB_USER} user`
  );
});
