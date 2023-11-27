// server.js
import express from "express";
import searchRouter from "./routes/searchRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(searchRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
