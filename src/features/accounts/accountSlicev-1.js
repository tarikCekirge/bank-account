const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

// Action creators
export const deposit = (amount, currency) => {
  return async (dispatch) => {
    dispatch(convertingCurrency(true));

    if (amount <= 0) {
      alert("Para yatırma işlemi negatif veya sıfır olamaz");
      dispatch(convertingCurrency(false));
      return;
    }

    if (currency === "TL") {
      dispatch({ type: "account/deposit", payload: amount });
      dispatch(convertingCurrency(false));
      return;
    }

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=TRY`
      );
      const data = await response.json();
      const rate = data.rates["TRY"];
      const convertedAmount = rate;
      dispatch({ type: "account/deposit", payload: convertedAmount });
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      alert("Para yatırma işlemi başarısız oldu");
    } finally {
      dispatch(convertingCurrency(false));
    }
  };
};

export const convertingCurrency = (isLoading) => {
  return { type: "account/convertingCurrency", payload: isLoading };
};

export const withdraw = (withdraw) => {
  return { type: "account/withdraw", payload: withdraw };
};
export const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
};
export const payLoan = () => {
  return { type: "account/payLoan" };
};

export default accountReducer;
