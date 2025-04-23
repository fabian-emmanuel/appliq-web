import { API_PATH } from "../constants";
import { Brain } from "./Brain";
import type { RequestParams } from "./http-client";

const constructBaseUrl = (): string => {
  return `https://api.databutton.com${API_PATH}`;
};

type BaseApiParams = Omit<RequestParams, "signal" | "baseUrl" | "cancelToken">;

const constructBaseApiParams = (): BaseApiParams => {
  return {
    credentials: "include",
  };
};

const constructClient = () => {
  const baseUrl = constructBaseUrl();
  const baseApiParams = constructBaseApiParams();

  return new Brain({
    baseUrl,
    baseApiParams,
  });
};

const brain = constructClient();

export default brain;
