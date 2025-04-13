import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("user/createUser", async (data, { rejectWithValue }) => {
    try {
        const res = await fetch("https://67fb96761f8b41c816844ac5.mockapi.io/crud", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
    }
});

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch("https://67fb96761f8b41c816844ac5.mockapi.io/crud");
        if (!res.ok) {
            throw new Error("Failed to fetch users"); // Handle non-200 responses
        }
        const result = await res.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || "Something went wrong")
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create user";
            })

            // Handling fetchAllUsers asyncThunk states
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default userSlice.reducer;