import { AxiosError } from "axios";
import { action, thunk } from "easy-peasy";
import axios from "../../axios";
import { ClassesModel, ClassModel } from "../model";
import store from "../store";

const classes: ClassesModel = {
  classes: [],
  getClasses: thunk(async (actions, { success, fail }) => {
    try {
      const accessToken = store.getState().userStorage.accessToken;
      const classes = await axios.get("student/classes", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (classes.status === 200) {
        const c = classes.data as ClassesModel;
        actions.setClasses(c.classes);
        if (success) success(c);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (fail) {
        fail(err);
      }
    }
  }),
  setClasses: action((states, classes: ClassModel[]) => {
    states.classes = classes;
  }),
};

export default classes;
