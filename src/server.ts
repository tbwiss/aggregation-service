import express, { Request, Response } from "express";
import { getUserAggregateById } from "./services/user-service";

const app = express();

const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server ok");
});

app.get("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = getUserAggregateById(userId);

    if (!user) {
      // User not found, send 404 response
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    // Handle potential errors, such as database errors
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
