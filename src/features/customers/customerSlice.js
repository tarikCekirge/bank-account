import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
  isLoading: false,
};

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async ({ fullName, nationalID }, { rejectWithValue }) => {
    try {
      // Fake  API isteği simülasyonu
      if (!fullName || !nationalID) {
        return rejectWithValue("Ad ve TC Kimlik Numarası boş olamaz.");
      }
      await new Promise((res) => setTimeout(res, 1000));
      return {
        fullName,
        nationalID,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Kayıt hatası:", error);
      return rejectWithValue("Kayıt sırasında bir hata oluştu.");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // createCustomer: {
    //   reducer: (state, action) => {
    //     state.fullName = action.payload.fullName;
    //     state.nationalID = action.payload.nationalID;
    //     state.createdAt = action.payload.createdAt;
    //   },
    //   prepare: (fullName, nationalID) => ({
    //     payload: {
    //       fullName,
    //       nationalID,
    //       createdAt: new Date().toISOString(),
    //     },
    //   }),
    // },

    updateName: (state, action) => {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        alert(action.payload);
      });
  },
});

export const { updateName } = customerSlice.actions;
export default customerSlice.reducer;
