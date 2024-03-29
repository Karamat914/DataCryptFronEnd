
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT, UPDATE_ENDPOINT } from "@/config/constant/endPoints"
import { patch, post,  } from "@/services/restService"

export const signUpApi = (data) => {
    return post(REGISTER_ENDPOINT, data)
}
export const signInApi = (data) => {
    return post(LOGIN_ENDPOINT, data)
}
export const updateUserApi = (id, data) => {
    debugger;
    console.log("jjfbjbfjdjb",id);
    // Replace the :id placeholder in the endpoint with the actual ID
    const url = `${UPDATE_ENDPOINT}/${id}`;
    console.log("uuuuuuuuuuuuuuuuuuuuu",url);
    // Make a PATCH request to the constructed URL
    return patch(url, data);
}
export const signOutApi = (refreshToken) => {
  console.log("****refreshToken", {refreshToken});

    return deleteReq('auth/signOut', {refreshToken})
}
export const refreshTokenApi = (data) => {
    return post('auth/refreshToken', data)
}