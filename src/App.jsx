import React from 'react'
import CreateCustomer from './features/customers/CreateCustomer'
import Customer from './features/customers/Customer'
import AccountOperations from './features/accounts/AccountOperations'
import BalanceDisplay from './features/accounts/BalanceDisplay'
import { useSelector } from 'react-redux'

const App = () => {

  const fullName = useSelector(state => state.customer.fullName)
  return (
    <section className='p-4 space-y-3'>
      <div className='px-3'>
        <h1 className="text-3xl font-bold mb-2 text-slate-800">Banka Hesabı</h1>
      </div>
      {fullName === "" ? <CreateCustomer /> : <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>}
      {/* <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay /> */}




    </section>
  )
}

export default App