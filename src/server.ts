import express, { Request, Response } from "express";
import cron from "node-cron";
import { getUserAggregateById } from "./services/user-service";
import { fetchTransactions } from "./services/transaction-service";

const app = express();

const port: number = 3100;

// Fetch transactions every 15 seconds
cron.schedule("*/15 * * * * *", () => {
  fetchTransactions();
});

app.get("/", (req: Request, res: Response) => {
  res.send("server ok");
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

app.get("/requested-payouts/:userId", (req: Request, res: Response) => {
  res.status(500).json({ error: "Not implemented" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
