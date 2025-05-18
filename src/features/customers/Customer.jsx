import { useSelector } from "react-redux"

const Customer = () => {
    const customer = useSelector(store => store.customer.fullName)
    console.log(customer)
    return (
        <div>Hoşgeldin {customer}</div>
    )
}

export default Customer