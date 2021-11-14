import { AxiosError } from "axios";
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
  id?: number;
  first_name?: string;
  last_name?: string;
  school_id?: number;
  user_type?: "s" | "t" | "p";
  username?: string;
  email?: string;
  phone_number?: number;
  status?: number;
  preferences?: {
    email_subscription: number;
    profile_picture: string;
    push_notifications: 1;
  };
};

export interface AxiosErrorCallback {
  (error: AxiosError): void;
}

export interface UserStorageModel extends PersistStorage {
  isLoggedIn: boolean;
  info?: UserInfo;
  accessToken?: string;
  tokenType?: string;
  verifyToken: Thunk<
    UserStorageModel,
    { authData: AuthData; success?: Function; fail?: AxiosErrorCallback }
  >;
  setAccessToken: Action<UserStorageModel, AuthData>;
  setIsLoggedIn: Action<UserStorageModel, boolean>;
  setInfo: Action<UserStorageModel, object>;
  logout: Action<UserStorageModel>;
  login: Thunk<
    UserStorageModel,
    {
      username: string;
      password: string;
      success?: Function;
      fail?: AxiosErrorCallback;
    }
  >;
}

export interface StoreModel {
  nonPersistent: NonPersistentStorageModel;
  userStorage: UserStorageModel;
  classes: ClassesModel;
}

export type ClassModel = {
  id?: number;
  name: string;
  description: string;
  bg_image: string | null;
  room_number?: string;
  frequency?: string;
  date_from: string;
  date_to: string;
  time_from: string;
  time_to: string;
  next_schedule?: any;
  color?: string;
  subject?: {
    id: number;
    name: string;
  };
  teacher?: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
  section?: {
    id: number;
    name: string;
    year_id: number;
  };
  year?: {
    id: number;
    name: string;
  };
};

interface ClassesCallback {
  (classes: ClassesModel): void;
}

export interface ClassesModel extends UserInfo {
  classes: ClassModel[] | [];
  currentClass: ClassModel | null;
  getClasses: Thunk<
    ClassesModel,
    {
      success?: ClassesCallback;
      fail?: AxiosErrorCallback;
    }
  >;
  setCurrentClass: Action<ClassesModel, ClassModel>;
  setClasses: Action<ClassesModel, ClassModel[]>;
  removeClasses: Action<ClassesModel>;
}
