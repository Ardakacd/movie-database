import express from "express";
const router = express.Router();
import { login } from "./databaseManagers/controller/databaseManagerController.js";

const db_managers = "/database_managers";

router.post(`${db_managers}/login`, login);

export default router;
