import { post } from "../api/Conexion.js";

export const login = async (email: string, password: string): Promise<any> => {
  return await post("login", { email, password }).then((response) => response);
};

export const register = async (
  fullName: string,
  email: string,
  password: string,
  role = "user"
): Promise<any> => {
  return await post("register", { fullName, email, password, role }).then(
    (response) => response.data
  );
};

export const logout = async (): Promise<any> => {
  return await post("logout").then((response) => response.data);
};
