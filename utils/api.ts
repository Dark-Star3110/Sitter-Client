import axios, { AxiosRequestConfig, Method } from "axios";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export type RequestParams<T> = {
  method: Method;
  path: string;
  data?: any;
  config?: Partial<AxiosRequestConfig>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
};

const isFunction = (func: any) =>
  func &&
  (Object.prototype.toString.call(func) === "[object Function]" ||
    "function" === typeof func ||
    func instanceof Function);

export async function request<T = any>(params: RequestParams<T>): Promise<T> {
  const { method, path, data, config, onSuccess, onError } = params;
  const accessToken = localStorage.getItem("access_token");

  try {
    const res = await axiosInstance.request<T>({
      method,
      url: path,
      data,
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...config?.headers,
      },
    });
    if (isFunction(onSuccess)) {
      onSuccess?.(res.data);
    }
    return res.data;
  } catch (error) {
    if (isFunction(onError)) {
      onError?.(error);
    }
    return false as any;
    // throw error;
  }
}
