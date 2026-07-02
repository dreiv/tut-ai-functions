import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const mockUsers = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" },
  { id: 3, name: "Charlie", role: "Moderator" },
];

const mockServerStats = {
  status: "healthy",
  uptime: process.uptime(),
  version: "1.0.0",
  memoryUsage: process.memoryUsage().heapUsed,
};

app.get("/api", (_, res) => {
  res.send("Welcome to Log Rotation!");
});

app.get("/api/test", (_, res) => {
  res.send("Tested!");
});

app.get("/api/data", (_, res) => {
  res.json(mockUsers);
});

app.get("/api/stats", (_, res) => {
  const dynamicStats = {
    ...mockServerStats,
    uptime: Math.floor(process.uptime()) + " seconds",
  };
  res.json(dynamicStats);
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
