import { action, thunk } from "easy-peasy";
import iskwelaApi from "../../utils/iskwelaApi";
import { UserInfo, UserStorageModel } from "../model";

const userStorage: UserStorageModel = {
  isLoggedIn: false,
  logout: action((states) => {
    states.isLoggedIn = false;
    states.accessToken = "";
  }),
  login: thunk(async (actions, { username, password, success, fail }) => {
    iskwelaApi.post({
      endpoint: `login?username=${username}&password=${password}`,
      after: async (data) => {
        const { token_type, access_token } = data;
        const isVerified = await actions.verifyToken({
          authData: {
            type: token_type,
            token: access_token,
          },
        });
        if (isVerified && success) {
          success();
        }
      },
      fail,
    });
  }),
  verifyToken: thunk(async (actions, { authData, success, fail }) => {
    let isVerified = false;
    await iskwelaApi.get({
      endpoint: "user?include=preferences",
      after: (userDetails) => {
        actions.setInfo(userDetails);
        actions.setAccessToken(authData);
        if (success) success();
        return true;
      },
      fail: (error) => {
        if (fail) fail(error);
        actions.logout();
      },
      success: () => {
        isVerified = true;
      },
      requestConfig: {
        headers: {
          Authorization: `${authData.type} ${authData.token}`,
        },
      },
    });
    return isVerified;
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
