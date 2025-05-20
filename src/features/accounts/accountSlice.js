import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }, { rejectWithValue }) => {
    if (amount <= 0) {
      return rejectWithValue("Para yatırma işlemi negatif veya sıfır olamaz.");
    }

    if (currency === "TL") {
      return amount;
    }

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=TRY`
      );
      const data = await response.json();
      return data.rates["TRY"]; // Çevrilmiş TL miktarı
    } catch (error) {
      console.error("Döviz çevirisi hatası:", error);
      return rejectWithValue("Döviz çevirisi başarısız oldu.");
    }
  }
);

// Başlangıç durumu
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    loan: {
      reducer: (state, action) => {
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
      prepare: (amount, purpose) => ({
        payload: { amount, purpose },
      }),
    },
    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance += action.payload;
        state.isLoading = false;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        alert(action.payload);
      });
  },
});

export default accountSlice.reducer;

// Actions
export const { withdraw, loan, payLoan } = accountSlice.actions;
