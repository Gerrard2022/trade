import React from 'react'

import {Header} from "../components";

const Inventory = () => {
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center">
          <Header category="Your" title="Inventory List" />          
        </div> 
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      Currently updating page
    </p>
    </div>
  )
}

export default Inventory
