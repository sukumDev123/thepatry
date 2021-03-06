import {
  loginUser,
  register_user,
  login_normal
} from "../presents/user.present";
import { UserModel } from "../models/user.model";
import { MessageModel } from "../../message.model";

export const login = async (req, res, next) => {
  if (req.body) {
    try {
      const { email, password } = req.body;
      const loginUserVa = await loginUser(email, password);
      res.json(loginUserVa);
    } catch (error) {
      next({ message: JSON.stringify(error), status: 500 });
    }
  }
};
export const register = async (req, res, next) => {
  try {
    const { email, password, displayname } = req.body;
    const register = await register_user(
      new UserModel(email, password, displayname, false, "user"),
      req.mysql_db
    );

    res.json(register);
  } catch (error) {
    next({ message: JSON.stringify(error), status: 500 });
  }
};
export const loginNormal = async (req, res, next) => {
  try {
    const { roles } = req.query;
    const { email, password } = req.body;
    const loginData = await login_normal(req.mysql_db, {
      email: email,
      password: password
    });
    if (roles) {
      res.json(new MessageModel("Admin is logined.", 200, loginData)).end();
    } else {
      res.json(new MessageModel("Get auth.", 200, loginData));
    }
  } catch (error) {
    console.log(error);
    next({ message: JSON.stringify(error), status: 500 });
  }
};
// export const createNewUser = async (req, res, next) => {}
