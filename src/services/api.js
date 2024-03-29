import axios from "axios";
// import { HOST_API } from 'src/config';
import TokenService from "./tokenService";

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || 'http://localhost:4000';
console.log('HOST_API---', HOST_API);

const instance = axios.create({
    baseURL: HOST_API,
    headers: {
        "Content-Type": "application/json",
      },
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (originalConfig.url !== "/auth/login" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await instance.post("/auth/refreshToken", {
//             refreshToken: TokenService.getLocalRefreshToken(),
//           });
//           const { accessToken } = rs.data;
//           TokenService.updateLocalAccessToken(accessToken);
//           return instance(originalConfig);
//         } catch (_error) {
//           console.log('refreshToken_error====', _error);
//           TokenService.removeUser()
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default instance;