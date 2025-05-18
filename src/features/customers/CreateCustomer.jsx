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
        <div>
            <h2>Yeni Hesap</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Ad Soyad</label>
                    <input
                        onChange={handleChange}
                        name="fullName"
                        id="fullName"
                        type="text"
                        value={newCustomer.fullName}
                    />
                </div>
                <div>
                    <label htmlFor="nationalID">Kimlik No:</label>
                    <input
                        onChange={handleChange}
                        name="nationalID"
                        id="nationalID"
                        type="text"
                        value={newCustomer.nationalID}
                    />
                </div>
                <button disabled={disabled} type="submit">Gönder</button>
            </form>
        </div>
    );
};

export default CreateCustomer;
