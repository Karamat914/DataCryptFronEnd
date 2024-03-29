import { createSlice } from '@reduxjs/toolkit';
import { refreshTokenApi, signInApi, signOutApi, signUpApi, updateUserApi } from '@/api/authApi';
// utils
// import { dispatch } from '../store';
import tokenService from '@/services/tokenService';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userInfo: {},
  token: ''
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    _signIn(state, {payload}) {
      state.userInfo = payload.data.info
      state.token = payload.auth_token
    },
    _updateUser(state, {payload}) {
      state.userInfo = payload.data.info
      state.token = payload.auth_token
    },
    _signOut(state) {
      state.token = ''
      state.userInfo = {}
    },

    _refreshToken(state, {payload}) {
      state.userInfo = payload
    },



    // HAS ERROR
    hasError(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  _signIn,
  _signOut,
  _updateUser,
  _refreshToken,
  setLoading,
  getLabelsSuccess,
  hasError
} = slice.actions
// ----------------------------------------------------------------------

export const signIn =  (data1) => async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const response = await signInApi(data1)
      console.log("88*********", response);
      // return
      const { data, auth_token} = response.data
      if (auth_token) {
        dispatch(_signIn(response.data))
        tokenService.setUser(data)
      } else {
        return error
      }

    } catch (error) {
      console.log("88*********error", error);
      dispatch(hasError(error));
    }
}
export const signUp =  (data) => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const response = await signUpApi(data)
    console.log("88*********", response);

  } catch (error) {
    console.log("88*********error", error);
    dispatch(hasError(error));
  }
}
export const updateUser = (id, data) => async (dispatch) => {
  try {
    // Dispatch action to indicate loading
    dispatch(setLoading(true));

    // Make an API call to update the user
    const response = await updateUserApi(id, data);

    // If the update was successful, dispatch the appropriate action
    if (response.status === 200) {
      // Dispatch action to update the user information in the store
      dispatch(_updateUser(response.data));

      // Dispatch action to indicate loading is complete
      dispatch(setLoading(false));

      // Optionally, dispatch any other actions or perform additional tasks
    } else {
      // If the update failed, handle the error accordingly
      dispatch(hasError(response.data.error));

      // Dispatch action to indicate loading is complete
      dispatch(setLoading(false));
    }
  } catch (error) {
    // If an unexpected error occurs, handle it here
    console.error('Error updating user:', error);

    // Dispatch action to indicate loading is complete
    dispatch(setLoading(false));

    // Dispatch action to indicate the error
    dispatch(hasError('An error occurred while updating user.'));
  }
};

export const signOut =  (data) => async (dispatch) => {
    // const refreshToken = tokenService.getLocalRefreshToken()
    try {
      // const response = await signOutApi(refreshToken)
      dispatch(_signOut())
    } catch (error) {
      dispatch(hasError(error));
    }
}

export const refreshToken = (data) => async (dispatch) => {
  try {
    const response = await refreshTokenApi(data)
    console.log("refreshToken response====", response);
    dispatch(_refreshToken(response))
    // dispatch(getLabelsSuccess(response.data.labels));
  } catch (error) {
    // dispatch(hasError(error));
  }
}

export const getUsers = (data) => async (dispatch) => {
  try {
    const response = await getUserA(data)
    console.log("get allusers response====", response);
    // dispatch(getLabelsSuccess(response.data.labels));
  } catch (error) {
    // dispatch(hasError(error));
  }
}