import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { User } from "../model/User.model";
import { generateToken } from "../services/jwt.service";
import UserToken from "../types/UserToken";
import UserType from "../types/UserType";
import SignInInput from "../types/SignInInput";
import CreateUserInput from "../types/CreateUserInput";

const saltRounds: number = 10;

interface IUserController {
  signIn: (req: Request, res: Response) => void,
  signUp: (req: Request, res: Response) => void,
}

const userController: IUserController = {
  signIn: async (req: Request, res: Response) => {
    try {
      const input: SignInInput = {
        email: req.body.email,
        password: req.body.password
      }

      if (input.email == "" || input.password == "") {
        return res.status(401).json({ message: "There are validation errors" })
      }

      const user: User | null = await userService.getUserByEmail(req.body.email);
      if (user === null) {
        return res.status(401).json({ message: "User doesn't exists" });
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const userData: UserType = {
        id: user.id,
        userName: user.user_name,
        email: user.email,
        role: user.role
      }

      const data: UserToken = {
        token: generateToken(userData),
        user: userData
      }

      res.status(200).json(data);
    } catch (err: any) {
      res.status(401).json({ message: "Hubo un error inesperado. Error: " + err.message })
    }

    // si es valida retornar el usuario y el token
  },
  signUp: async (req: Request, res: Response) => {
    try {      
      const userData: CreateUserInput = {
        userName: req.body.user,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      }

      if (userData.userName == "" || userData.email == "" || 
        userData.password == "" || userData.role == "") {
        return res.status(401).json({ message: "There are validation errors" });
      }

      const salt: string = bcrypt.genSaltSync(saltRounds);
      userData.password = bcrypt.hashSync(userData.password, salt);;

      const user: User = await userService.createUser(userData);
      const userResponse: UserType = {
        id: user.id,
        userName: user.user_name,
        email: user.email,
        role: user.role
      }
      
      const data: UserToken = {
        token: generateToken(userResponse),
        user: userResponse
      }

      res.status(200).json(data);
    } catch (err: any) {
      res.status(401).json({ message: "Hubo un error inesperado. Error: " + err.message })
    }
  },
}

export default userController;