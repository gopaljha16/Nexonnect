import { createSlice , createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axiosClient from '../utils/axiosClient'


//login 
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email ,password  } , {rejectWithValue })=>{
        try{
            const res = await axiosClient.post("/auth/login" , {email , password})
            return res.data
        }catch(err){
            return rejectWithValue (err?.response?.data || "Login Failed")
        }
    }
)

 export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async({firstName, email ,password  } , {rejectWithValue })=>{
        try{
            const res = await axiosClient.post("/auth/register" , {firstName, email , password})
            return res.data
        }catch(err){
            return rejectWithValue (err?.response?.data || "Signup Failed")
        }
    }
)

export const logutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/auth/logout");
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Logout Failed");
    }
  }
)

// Check authentication status on app load
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/auth/me"); // We'll need to create this endpoint
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Not authenticated");
    }
  }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        initialized: false,
    },
    reducers:{
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending , (state) =>{
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(loginUser.fulfilled , (state , action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }),
        builder.addCase(loginUser.rejected , (state , action) =>{
            state.loading = false;
            state.error = action.payload;
        })
         builder.addCase(signupUser.pending , (state) =>{
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(signupUser.fulfilled , (state , action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }),
        builder.addCase(signupUser.rejected , (state , action) =>{
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(logutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        }),
        builder.addCase(logutUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
        }),
        builder.addCase(logutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
        
        // Check auth status cases
        builder.addCase(checkAuthStatus.pending, (state) => {
          state.loading = true;
        }),
        builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.initialized = true;
        }),
        builder.addCase(checkAuthStatus.rejected, (state) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
          state.initialized = true;
        });
    }
})

export const { clearError } = authSlice.actions;

export default authSlice.reducer