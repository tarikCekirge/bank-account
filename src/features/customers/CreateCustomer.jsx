import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "./customerSlice";

const initialNewCustomer = {
    fullName: "",
    nationalID: "",
};

const CreateCustomer = () => {
    const [newCustomer, setNewCustomer] = useState(initialNewCustomer);
    const [disabled, setDisabled] = useState(true);
    const { isLoading } = useSelector((state) => state.customer);

    const dispatch = useDispatch();

    useEffect(() => {
        const isFormFilled =
            newCustomer.fullName.trim() !== "" && newCustomer.nationalID.trim() !== "";
        setDisabled(!isFormFilled);
    }, [newCustomer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCustomer(newCustomer))
            .unwrap()
            .then((result) => {
                console.log("Başarılı:", result);
                setNewCustomer(initialNewCustomer);
            })
            .catch((err) => {
                console.error("Hata:", err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-slate-200 pt-4 pb-10 px-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Yeni Hesap</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800" htmlFor="fullName">Ad Soyad</label>
                    <input
                        className="border p-3 border-slate-700 rounded-lg"
                        onChange={handleChange}
                        name="fullName"
                        id="fullName"
                        type="text"
                        value={newCustomer.fullName}
                    />
                </div>
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg bg-slate-300 p-4">
                    <label className="p-3 flex items-center font-bold text-slate-800" htmlFor="nationalID">Kimlik No:</label>
                    <input
                        className="border p-3 border-slate-700 rounded-lg"
                        onChange={handleChange}
                        name="nationalID"
                        id="nationalID"
                        type="text"
                        value={newCustomer.nationalID}
                    />
                </div>
                <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-3 rounded-lg p-4">
                    <button
                        disabled={disabled || isLoading}
                        type="submit"
                        className={`col-start-2 p-3 font-bold rounded-lg cursor-pointer
              ${disabled || isLoading
                                ? "bg-slate-400 text-white cursor-not-allowed"
                                : "bg-slate-700 text-white hover:bg-slate-600"}`}
                    >
                        {
                            isLoading ? <span className="flex items-center gap-2 justify-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin  fill-slate-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                Yükleniyor
                            </span> : "Gönder"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCustomer;
