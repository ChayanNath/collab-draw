import { JWT_SECRET } from "@workspace/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const [, tokenValue] = token.split(" ");
    if (!tokenValue) {
      return res.status(401).send("Unauthorized");
    }

    const decodedToken = jwt.verify(tokenValue, JWT_SECRET) as {
      userId: string;
    };

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).send("Unauthorized");
    }

    req.user = decodedToken.userId;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
