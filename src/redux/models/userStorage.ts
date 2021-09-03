import { UserStorageModel } from "../model";

const userStorage: UserStorageModel = {
  isLoggedIn: false,
  info: {},
  getItem: (key) => key,
  removeItem: (key) => {},
  setItem: (key, data) => {},
};

export default userStorage;
