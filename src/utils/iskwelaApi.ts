import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "../axios";
import store from "../redux/store";

type ApiRequestAfterCallback = {
  (data: any): void;
};
type ApiRequestFailCallback = {
  (error: AxiosError): void;
};
type ApiRequestSuccessCallback = {
  (data: any): void;
};
type ApiRequestProps = {
  endpoint: string;
  before?: Function;
  after?: ApiRequestAfterCallback;
  fail?: ApiRequestFailCallback;
  success?: ApiRequestSuccessCallback;
  requestConfig?: AxiosRequestConfig;
};
const request = async <T>(params: ApiRequestProps, type: "get" | "post") => {
  const {
    endpoint,
    after = () => {},
    fail = () => {},
    success = () => {},
    before = () => {},
    requestConfig = {},
  } = params;
  try {
    before();
    const accessToken = store.getState().userStorage.accessToken;
    const axiosReqConfig = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : {};
    const request = await axios[type](endpoint, {
      ...axiosReqConfig,
      ...requestConfig,
    });
    if (request.status === 200) {
      const c = request.data as T;
      after(c);
      if (success) return success(c);
    }
  } catch (error) {
    const err = error as AxiosError;
    if (fail) {
      return fail(err);
    }
  }
};

const get = <T>(params: ApiRequestProps) => {
  return request<T>(params, "get");
};

const post = <T>(params: ApiRequestProps) => {
  return request<T>(params, "post");
};

const iskwelaApi = { get, post };

export default iskwelaApi;
