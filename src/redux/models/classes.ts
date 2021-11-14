import { action, thunk } from "easy-peasy";
import iskwelaApi from "../../utils/iskwelaApi";
import { ClassesModel, ClassModel } from "../model";

const classes: ClassesModel = {
  classes: [],
  currentClass: null,
  removeClasses: action((states) => {
    states.classes = [];
  }),
  setClasses: action((states, classes: ClassModel[]) => {
    states.classes = classes;
  }),
  setCurrentClass: action((states, Class) => {
    states.currentClass = Class;
  }),
  getClassDetails: thunk((actions, { id, success, fail }) => {
    iskwelaApi.get<ClassModel>({
      endpoint: `student/class/${id}?include=schedules`,
      success: (classDetails) => {
        if (success) success(classDetails);
      },
      fail: (error) => {
        if (fail) fail(error);
      },
    });
  }),
  getClasses: thunk(async (actions, { success, fail }) => {
    iskwelaApi.get<ClassModel>({
      endpoint: "student/classes",
      before: () => {
        actions.removeClasses();
      },
      success: (classes) => {
        actions.setClasses(classes);
        if (success) success(classes);
      },
      fail: (error) => {
        if (fail) fail(error);
      },
    });
  }),
};

export default classes;
