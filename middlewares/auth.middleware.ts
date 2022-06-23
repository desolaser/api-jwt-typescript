import { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/jwt.service";
import UserType from "../types/UserType";

export const authorize = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;
    if (!jwt) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    const decodedToken: UserType = await validateToken(jwt);
    const hasAccessToEndpoint = allowedRoles.some((at: string) =>
      at == decodedToken.role
    )

    if (!hasAccessToEndpoint) {
      return res.status(401).json({ message: 'No enough privileges to access endpoint' })
    }

    next();
  } catch (err) {
    console.log(err);
  }
}