import React from 'react'
import CreateCustomer from './features/customers/CreateCustomer'
import Customer from './features/customers/Customer'
import AccountOperations from './features/accounts/AccountOperations'
import BalanceDisplay from './features/accounts/BalanceDisplay'
import { useSelector } from 'react-redux'

const App = () => {

  const fullName = useSelector(state => state.customer.fullName)
  return (
    <>
      <h1>Bank Account</h1>
      {fullName === "" ? <CreateCustomer /> : <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>}



    </>
  )
}

export default App