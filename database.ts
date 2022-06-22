import { Sequelize } from "sequelize";
import { initUser } from "./model/User.model";

const sequelize: Sequelize = new Sequelize("api_jwt_typescript", "root", "1234", {
  host: "localhost",
  dialect: "mysql"
});

const db = {
  sequelize: sequelize,
  User: initUser(sequelize)
};

export default db;