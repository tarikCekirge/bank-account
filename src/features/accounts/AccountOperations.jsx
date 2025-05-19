import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./AccountSlice";

const AccountOperations = () => {

    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useDispatch();
    const { loan: currentLoan, balance: currentBalance, loanPurpose: currentLoanProse } = useSelector(state => state.account)

    console.log(currentLoan, currentBalance, currentLoanProse)

    const handleDeposit = () => {
        if (!depositAmount) return;
        dispatch(deposit(depositAmount));
        setDepositAmount("");
    }

    function handleWithdrawal() {
        if (!withdrawalAmount) return;
        if (withdrawalAmount > currentBalance) {
            alert("Yetersiz bakiye");
            return;
        }
        dispatch(withdraw(withdrawalAmount));
        setWithdrawalAmount("");
    }

    const handleRequestLoan = () => {
        if (!loanAmount || !loanPurpose) return;
        if (currentLoan > 0) {
            alert("Zaten bir borcunuz var");
            return;
        }
        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount("");
        setLoanPurpose("");
    }

    const handlePayLoan = () => {
        if (currentLoan <= 0) return
        dispatch(payLoan());
        alert("Borç ödendi");
    }


    return (
        <div className="bg-slate-200 pt-4 pb-10 px-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Banka İşlemleri</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800">Para Yatır</label>
                    <input min={0}
                        className="border p-3 border-slate-700 rounded-lg"
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(+e.target.value)}
                    />
                    <select
                        className="border p-3 border-slate-700 rounded-lg"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="TL">Türk Lirası</option>
                        <option value="USD">Amerikan Doları</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">İngiliz Sterlini</option>
                    </select>

                    <button className="p-3 bg-slate-700 text-white font-bold rounded-lg cursor-pointer hover:bg-slate-600" onClick={handleDeposit}>Para Yatır ({depositAmount} {currency})</button>
                </div>

                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800">Para Çekme</label>
                    <input
                        className="border p-3 border-slate-700 rounded-lg"
                        min={0}
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(+e.target.value)}
                    />
                    <button className="p-3 bg-slate-700 text-white font-bold rounded-lg cursor-pointer hover:bg-slate-600" onClick={handleWithdrawal}>
                        Para Çek {withdrawalAmount}
                    </button>
                </div>

                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800">Borç Al</label>
                    <input min={0}
                        className="border p-3 border-slate-700 rounded-lg"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Borç Miktarı"
                    />
                    <input
                        className="border p-3 border-slate-700 rounded-lg"
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Borç Nedeni"
                    />
                    <button
                        className="p-3 bg-slate-700 text-white font-bold rounded-lg cursor-pointer hover:bg-slate-600"
                        onClick={handleRequestLoan}>Borç Al</button>
                </div>

                {currentLoan > 0 && (
                    <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                        <label className="p-3 flex items-center font-bold text-slate-800">Borç Öde {currentLoan}({currentLoanProse})</label>
                        <button
                            className="p-3 bg-slate-700 text-white font-bold rounded-lg cursor-pointer hover:bg-slate-600"
                            onClick={handlePayLoan}>Borç Öde</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AccountOperations