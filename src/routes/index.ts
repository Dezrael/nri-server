import { Router } from "express";
import { authRouter } from "./auth.routes";
import { classesRouter } from "./classes.routes";
import { mushroomsRouter } from "./mushrooms.routes";
import { passivesRouter } from "./passives.routes";
import { skillsRouter } from "./skills.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/classes", classesRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/passives", passivesRouter);
apiRouter.use("/mushrooms", mushroomsRouter);
