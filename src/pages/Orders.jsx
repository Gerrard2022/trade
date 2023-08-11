import React from 'react';

import { Header, Button, Form } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Orders = () => {

  const { currentColor, currentMode } = useStateContext();
  const handleProductSubmit = () => {
    // Handle product form submission
    console.log('Product Form Data:');
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center">
         <Header category="Page" title="Orders" />
        <Form type="product" onSubmit={handleProductSubmit} />
        </div>

    </div>
  );
};
export default Orders;