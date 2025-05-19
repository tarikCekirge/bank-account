import { useSelector } from "react-redux"

const Customer = () => {
    const customer = useSelector(store => store.customer.fullName)
    console.log(customer)
    return (
        <div className="px-3">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Hoşgeldin {customer}</h2>
        </div>
    )
}

export default Customer