import { connect } from "react-redux";

const formatCurrency = (value) => {
    if (value === undefined || value === null) return "";
    if (typeof value !== "number") return value;
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}
const BalanceDisplay = ({ balance }) => {
    return (
        <div className="bg-slate-200 py-4 px-6 text-2xl font-bold text-slate-700  rounded-xl">{formatCurrency(balance)}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: state.account.balance,
    }
}

export default connect(mapStateToProps)(BalanceDisplay)