import { Router } from "express";

import auth from "./auth";
import groups from "./groups";
import logs from "./logs";
import routes from "./routes";
import users from "./users";

export const router = Router();

router.use("/auth", auth);
router.use("/groups", groups);
router.use("/logs", logs);
router.use("/routes", routes);
router.use("/users", users);

export { router as default };
