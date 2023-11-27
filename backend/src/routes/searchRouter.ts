import express, { Request, Response, Router } from "express";
import { search } from "../controllers/searchController";

const router: Router = express.Router();

router.post("/search", async (req: Request, res: Response) => {
  const { email, number } = req.body;
  const result = await search(email, number);
  res.json(result);
});

export default router;
