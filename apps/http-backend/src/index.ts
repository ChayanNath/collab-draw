import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import authMiddleware from "./middleware/authMiddleware";
import roomRouter from "./routes/room";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat";

const app = express();
app.use(express.json());

app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", authMiddleware, roomRouter);
app.use("/api/v1/chat", authMiddleware, chatRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
