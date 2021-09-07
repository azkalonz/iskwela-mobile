import { AxiosError } from "axios";
import { action, thunk } from "easy-peasy";
import axios from "../../axios";
import { UserInfo, UserStorageModel } from "../model";

const userStorage: UserStorageModel = {
  isLoggedIn: false,
  logout: action((states) => {
    states.isLoggedIn = false;
    states.accessToken = "";
  }),
  login: thunk(async (actions, { username, password, success, fail }) => {
    try {
      const auth = await axios.post(
        `login?username=${username}&password=${password}`
      );
      const result = await actions.verifyToken({
        authData: { type: auth.data.token_type, token: auth.data.access_token },
      });
      if (result && success) {
        success();
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && fail) {
        fail(error);
      }
    }
  }),
  verifyToken: thunk(async (actions, { authData, success, fail }) => {
    try {
      const userDetails = await axios.get("user?include=preferences", {
        headers: {
          Authorization: `${authData.type} ${authData.token}`,
        },
      });
      if (userDetails.status === 200) {
        actions.setInfo(userDetails.data);
        actions.setAccessToken(authData);
        if (success) success();
        return true;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (fail) fail(err);
    }
    return false;
  }),
  setAccessToken: action((states, { token, type }) => {
    states.accessToken = token;
    states.tokenType = type;
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
