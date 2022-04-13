import express from 'express';
import { route } from 'express/lib/application';
import { createPlan, deletePlan, handleStar } from "../controllers/planController";

const router = express.Router();

router.post("",createPlan);
router.delete("/:planId", deletePlan);
router.patch("/:planId");
router.patch("/check");
router.get("/total?date=${date}&userId=${userId}");
router.get("/week/average?date=${date}&userId=${userId}");
router.get("/month/average?date=${date}&userId=${userId}");
router.post("/star", handleStar);
router.get("/statistic?date=${date}&userId=${userId}");
router.get("/week/total?date=${date}&userId=${userId}");
router.get("/plan/month/total?date=${date}&userId=${userId}")


export default router;