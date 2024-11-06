import express, { Request, Response } from "express";

const app = express();

const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server ok");
});

app.get("/users/:id", (req: Request, res: Response) => {
  res.send("Server ok");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
