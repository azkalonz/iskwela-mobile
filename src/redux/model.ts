import { Action, PersistStorage, Thunk } from "easy-peasy";

export interface NonPersistentStorageModel {
  headerTitle: string;
  setHeaderTitle: Action<NonPersistentStorageModel, string>;
}

export interface AuthData {
  type: string;
  token: string;
}

export type UserInfo = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone_number: number;
  preferences: object;
  school_id: number;
  status: number;
  user_type: "s" | "t";
  username: string;
};

export interface UserStorageModel extends PersistStorage {
  isLoggedIn: boolean;
  info?: UserInfo;
  accessToken?: string;
  setAccessToken: Thunk<UserStorageModel, AuthData>;
  setIsLoggedIn: Action<UserStorageModel, boolean>;
  setInfo: Action<UserStorageModel, object>;
  logout: Action<UserStorageModel>;
}

export interface StoreModel {
  nonPersistent: NonPersistentStorageModel;
  userStorage: UserStorageModel;
}
