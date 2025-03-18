import { api } from "../utils/api";

export const getUserRoles = async () => {
  const response = await api.get("/employees");
  return response.data.data;
};

export const addUserRole = async (user: { username: string; role: string }) => {
  await api.post("/employees", user);
};

export const updateUserRole = async (
  id: number,
  user: { username: string; role: string }
) => {
  await api.put(`/employees/${id}`, user);
};

export const deleteUserRole = async (id: number) => {
  await api.delete(`/employees/${id}`);
};
