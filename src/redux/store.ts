import { createStore, createTypedHooks, persist } from "easy-peasy";
import { StoreModel } from "./model";
import { nonPersistent, userStorage as u, classes } from "./models";

const store = createStore<StoreModel>(
  {
    nonPersistent,
    userStorage: persist(u, {
      storage: "localStorage",
    }),
    classes,
  },
  {
    version: 1,
  }
);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export default store;
