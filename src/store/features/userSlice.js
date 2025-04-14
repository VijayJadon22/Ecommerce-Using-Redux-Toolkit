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
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        const res = await fetch(`https://67fb96761f8b41c816844ac5.mockapi.io/crud/${userId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("Failed to delete user");
        }
        return userId; // Return the ID of the deleted user
    } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
    }
});

export const editUser = createAsyncThunk("user/editUser", async (data, { rejectWithValue }) => {
    try {
        console.log("Data is", data);
        const res = await fetch(`https://67fb96761f8b41c816844ac5.mockapi.io/crud/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to update user details");
        }

        const result = await res.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
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

            // Handling deleteUser asyncThunk states
            .addCase(deleteUser.pending, (state) => {
                state.loading = true,
                    state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handling editUser asyncThunk states
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user);
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default userSlice.reducer;