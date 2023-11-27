import express, { Express } from "express";
import searchRouter from "./routes/searchRouter";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(searchRouter);

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
