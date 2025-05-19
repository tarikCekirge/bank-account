import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

const initialNewCustomer = {
    fullName: "",
    nationalID: ""
};

const CreateCustomer = () => {
    const [newCustomer, setNewCustomer] = useState(initialNewCustomer);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        const isFormFilled =
            newCustomer.fullName.trim() !== "" && newCustomer.nationalID.trim() !== "";
        setDisabled(!isFormFilled);
    }, [newCustomer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCustomer.fullName || !newCustomer.nationalID) return;
        dispatch(createCustomer(newCustomer.fullName, newCustomer.nationalID));
        setNewCustomer(initialNewCustomer);

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-slate-200 pt-4 pb-10 px-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Yeni Hesap</h2 >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800" htmlFor="fullName">Ad Soyad</label>
                    <input className="border p-3 border-slate-700 rounded-lg"
                        onChange={handleChange}
                        name="fullName"
                        id="fullName"
                        type="text"
                        value={newCustomer.fullName}
                    />
                </div>
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800" htmlFor="nationalID">Kimlik No:</label>
                    <input className="border p-3 border-slate-700 rounded-lg"
                        onChange={handleChange}
                        name="nationalID"
                        id="nationalID"
                        type="text"
                        value={newCustomer.nationalID}
                    />
                </div>
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg  p-4">
                    <button disabled={disabled} type="submit" className="col-start-2 p-3 bg-slate-700  text-white font-bold rounded-lg cursor-pointer hover:bg-slate-600">Gönder</button>
                </div>
            </form>
        </div >
    );
};

export default CreateCustomer;
