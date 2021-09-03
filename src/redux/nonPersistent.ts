import { action } from "easy-peasy";
import { NonPersistentStorageModel } from "./model";

const nonPersistent: NonPersistentStorageModel = {
  headerTitle: "",
  setHeaderTitle: action((state, value) => {
    state.headerTitle = value;
  }),
};

export default nonPersistent;
