import { Action } from "easy-peasy";

export interface NonPersistentStorageModel {
  headerTitle: string;
  setHeaderTitle: Action<NonPersistentStorageModel, string>;
}

export interface StoreModel {
  nonPersistent: NonPersistentStorageModel;
}
