import { Sequelize, DataTypes, Model, Optional } from "sequelize";

type UserAttributes = {
  id: number,
  user_name: string,
  email: string,
  password: string,
  role: string;
}
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare user_name: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

const initUser = (sequelize: Sequelize) => {
  return User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  { 
    tableName: "users",
    sequelize
  });
}

export { User, initUser };