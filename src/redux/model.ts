import { Action, PersistStorage } from "easy-peasy";

export interface NonPersistentStorageModel {
  headerTitle: string;
  setHeaderTitle: Action<NonPersistentStorageModel, string>;
}

export interface UserStorageModel extends PersistStorage {
  isLoggedIn: boolean;
  info?: object;
}

export interface StoreModel {
  nonPersistent: NonPersistentStorageModel;
  userStorage: UserStorageModel;
}
