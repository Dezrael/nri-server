import { Router } from "express";
import { mushroomsRouter } from "./mushrooms.routes";
import { passivesRouter } from "./passives.routes";
import { skillsRouter } from "./skills.routes";

export const apiRouter = Router();

apiRouter.use("/skills", skillsRouter);
apiRouter.use("/passives", passivesRouter);
apiRouter.use("/mushrooms", mushroomsRouter);
