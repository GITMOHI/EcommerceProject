import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress, changePassword, fetchLoggedInUser, fetchLoggedInUserActivity, loginAdmin, loginUser, logoutUser, signupUser, updateUser } from "./authAPI";

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('user')) || null,
  activity:[],
  status: "idle",
  error:null,
  signed_up:false,
  password_changed: false,
};



//for admin...
export const loginAdminAsync = createAsyncThunk(
  "auth/loginAdmin",
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await loginAdmin(userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchLoggedInUserAsync = createAsyncThunk(
  'counter/fetchLoggedInUser', 
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const fetchLoggedInUserActivityAsync = createAsyncThunk(
  'counter/fetchLoggedInUserActivity', 
  async ({id}) => {
    const response = await fetchLoggedInUserActivity(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async ({userInfo,userId}, { rejectWithValue }) => {
    try {
      const data = await updateUser(userInfo,userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//add address..
export const addAddressAsync= createAsyncThunk(
  "auth/addAddress",
  async ({addressData,userId}, { rejectWithValue }) => {
    try {
      const response = await addAddress(addressData,userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await loginUser(userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUserAsync = createAsyncThunk(
  "auth/signupUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await signupUser(userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const changePasswordAsync = createAsyncThunk(
  "auth/changePassword",
  async (dataPass, { rejectWithValue }) => {
    try {
      const data = await changePassword(dataPass);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await logoutUser();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupStatus: (state) => {
      state.signed_up = false;
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('login', Date.now());
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loggedInUser = null;
        state.status = "failed";
        state.error = action.payload;
      })
      //admin
      .addCase(loginAdminAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('login', Date.now());
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.loggedInUser = null;
        state.status = "failed";
        state.error = action.payload;
      })

      
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('login', Date.now());
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.loggedInUser = null;
        state.status = "failed";
        state.error = action.payload;
      })
      
      .addCase(fetchLoggedInUserActivityAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoggedInUserActivityAsync.fulfilled, (state, action) => {
        state.activity = action.payload;
        state.status = "idle";
        state.error = null;
      })
      .addCase(fetchLoggedInUserActivityAsync.rejected, (state, action) => {
        state.acitivity = [];
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signupUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.signed_up = true;
        state.loggedInUser = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.loggedInUser = null;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "idle";
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('login', Date.now());
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.loggedInUser?.addresses?.push(action.payload);
        state.status = "idle";
        state.error = null;
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })


      .addCase(changePasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.password_changed = false;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        // state.loggedInUser = action.payload;
        state.status = "failed";   
        state.error = action.payload;
        state.password_changed = false;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.password_changed = true;

      })


      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = "failed";   
        state.error = action.payload;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = null;
        state.status = "succeeded";
        localStorage.removeItem('user');
        localStorage.setItem('logout', Date.now()); 
      });
  },
});

export const { resetSignupStatus,logout } = authSlice.actions;


export const selectUserStatus= (state) => state.auth.status;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthError= (state) => state.auth.error;
export const selectSignedUp= (state) => state.auth.signed_up;
export const selectActivity= (state) => state.auth.activity;
export const selectisPasswordChanged= (state) => state.auth.password_changed;

export default authSlice.reducer;
