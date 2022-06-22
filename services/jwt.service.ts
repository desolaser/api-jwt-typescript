import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import UserType from "../types/UserType";

export const generateToken = (userData: UserType) => {
  const keyPath: string = path.join(__dirname, "keys", "private.key");
  const privateKey: Buffer = fs.readFileSync(keyPath);

  const signOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "1h"
  };

  return sign(userData, privateKey, signOptions);
}
  
export const validateToken = (token: string) => {
  const keyPath: string = path.join(__dirname, "keys", "public.key");
  const publicKey: Buffer = fs.readFileSync(keyPath);

  const verifyOptions : VerifyOptions = {
    algorithms: ["RS256"]
  };

  return new Promise<UserType>((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error: any, decoded: UserType) => {
      if (error) 
        return reject(error);

      return resolve(decoded);
    });
  });
}