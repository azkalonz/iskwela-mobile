import { action, thunk } from "easy-peasy";
import axios from "../../axios";
import { AuthData, UserInfo, UserStorageModel } from "../model";

const userStorage: UserStorageModel = {
  isLoggedIn: false,
  logout: action((states) => {
    states.isLoggedIn = false;
    states.accessToken = "";
  }),
  setAccessToken: thunk(async (actions, token: AuthData) => {
    const userDetails = await axios.get("user?include=preferences", {
      headers: {
        Authorization: `${token.type} ${token.token}`,
      },
    });
    if (userDetails.status === 200) {
      actions.setInfo(userDetails.data);
      return true;
    }
    return false;
  }),
  setInfo: action((states, info: UserInfo) => {
    states.info = info;
    states.isLoggedIn = true;
  }),
  setIsLoggedIn: action((states, isLoggedIn) => {
    states.isLoggedIn = isLoggedIn;
  }),
  getItem: (key) => key,
  removeItem: (key) => {},
  setItem: (key, data) => {},
};

export default userStorage;
