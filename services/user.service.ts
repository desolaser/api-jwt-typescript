import db from "../database";
import { User } from "../model/User.model";
import CreateUserInput from "../types/CreateUserInput";

const createUser = async (userData: CreateUserInput) => {
  const user: User = await db.User.create({
    user_name: userData.userName,
    email: userData.email,
    password: userData.password,
    role: userData.role
  });

  return user;
};

const getUserByEmail = async (email: string) => {    
  const user: User | null = await db.User.findOne({ 
    where: { email } 
  });

  return user;
}

export default {
  createUser,
  getUserByEmail
};