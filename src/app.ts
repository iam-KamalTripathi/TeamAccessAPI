import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

const app: Express = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Log requests
app.use(morgan("dev"));

// Prevent brute-force attacks
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  }),
);

// Compress responses
app.use(compression());

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is working properly!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
