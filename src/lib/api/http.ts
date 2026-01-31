import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const version = "/api/v1";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL_DEV + version;

let tokenGetter: () => string | null = () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem("auth:token");
  } catch {
    return null;
  }
};

export function setTokenGetter(fn: () => string | null) {
  tokenGetter = fn;
}

const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = tokenGetter?.();
  if (token) {
    config.headers = config.headers || {};
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      axios.isCancel(error) ||
      error.code === "ERR_CANCELED" ||
      error.message === "canceled"
    ) {
      return Promise.reject(error);
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth:token");
          localStorage.removeItem("auth:refreshToken");
          localStorage.removeItem("auth:user");
          localStorage.removeItem("persist:root");

          document.cookie =
            "auth:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "auth:user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

          if (!window.location.pathname.includes("/auth/login")) {
            window.location.href = "/auth/login";
          }
        }
      } else if (status === 403) {
        console.error("Access forbidden");
      } else if (status === 404) {
        console.error("Resource not found");
      } else if (status >= 500) {
        console.error("Server error occurred");
      }
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

/** Request config for typed helpers. */
export type RequestConfig = AxiosRequestConfig;

/** Typed GET. Returns response data. */
export async function get<T = unknown>(
  url: string,
  config?: RequestConfig
): Promise<T> {
  const res = await http.get<T>(url, config);
  return res.data;
}

/** Typed POST. Returns response data. */
export async function post<T = unknown, B = unknown>(
  url: string,
  body?: B,
  config?: RequestConfig
): Promise<T> {
  const res = await http.post<T>(url, body, config);
  return res.data;
}

/** Typed PUT. Returns response data. */
export async function put<T = unknown, B = unknown>(
  url: string,
  body?: B,
  config?: RequestConfig
): Promise<T> {
  const res = await http.put<T>(url, body, config);
  return res.data;
}

/** Typed PATCH. Returns response data. */
export async function patch<T = unknown, B = unknown>(
  url: string,
  body?: B,
  config?: RequestConfig
): Promise<T> {
  const res = await http.patch<T>(url, body, config);
  return res.data;
}

/** Typed DELETE. Returns response data. */
export async function del<T = unknown>(
  url: string,
  config?: RequestConfig
): Promise<T> {
  const res = await http.delete<T>(url, config);
  return res.data;
}

/** Typed request with full config. Returns response data. */
export async function request<T = unknown>(config: RequestConfig): Promise<T> {
  const res = await http.request<T>(config);
  return res.data;
}
