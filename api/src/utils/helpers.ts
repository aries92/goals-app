import jwt from "jsonwebtoken";
import config from "../config";
import { AuthenticationError } from "apollo-server-express";

export function withAuth(cb: any) {
  return async (_: any, __: any, context: any, info: any) => {
    if (!context.user) {
      return new AuthenticationError("not authorized");
    }
    return cb(_, __, context, info);
  };
}

// @ts-ignore
export function context({ req }) {
  const token = req.headers.authorization || "";
  try {
    // @ts-ignore
    const user = { ...jwt.verify(token.split(" ")[1], config.jwtSecret) };
    return { user };
  } catch (e) {
    return {};
  }
}

export function handleError(message: string, fallback?: string) {
  if (message) {
    throw Error(message);
  }
  throw fallback;
}
