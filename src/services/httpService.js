const { default: axios } = require("axios");

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

app.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalConfig = error.config;

    // اگر اصلاً response وجود نداشته باشد
    // یعنی معمولاً مشکل Network / CORS / URL / Connection است
    if (!error.response) {
      console.error("Axios Network Error:", error.message);
      return Promise.reject(error);
    }

    // اگر config وجود نداشته باشد
    if (!originalConfig) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          {
            withCredentials: true,
          }
        );

        if (data) {
          return app(originalConfig);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const http = {
  get: app.get.bind(app),
  patch: app.patch.bind(app),
  put: app.put.bind(app),
  delete: app.delete.bind(app),
  post: app.post.bind(app),
};

export default http;