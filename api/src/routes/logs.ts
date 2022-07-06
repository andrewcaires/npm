import { Router } from "express";

import { all } from "../controllers/logs";

import { auth, permission } from "../middlewares";

const router = Router();

router.use(auth);

router.get("/", permission("logs.read"), all);

export default router;
