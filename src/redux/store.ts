import { createStore, createTypedHooks } from "easy-peasy";
import { StoreModel } from "./model";
import n from "./nonPersistent";

const store = createStore<StoreModel>(
  {
    nonPersistent: n,
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
