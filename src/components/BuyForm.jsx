import React, { useState } from 'react';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
import ShopIcon from '@mui/icons-material/Shop';

const BuyForm = ({ ID }) => {

  const {  dispatchs } = useStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: '',
      unitsTaken: '',
    }
  ]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Products:", products);
  
    axios.post(`${import.meta.env.VITE_BASE_URL}/client/transactions`, { products })
      .then(res => {
        if (res.status === 201) { // Check the response status
          dispatchs({ type: 'CREATE_TRANSACTION', payload: res.data }); // Dispatch res.data
          alert("Purchase done");
        } else {
          console.error("Transaction creation failed");
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsOpen(false)); // Always close the modal, regardless of success or failure
  };
  

  return (
    <div>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
        onClick={() => {
            setIsOpen(true)
            setProducts({ ...products, id: ID });
        }}
            >               
          <ShopIcon/>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-3xl font-semibold">
                  BUY
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
        
                  <label className="block mb-4">
                    Number of Items:
                    <input
                      type="telephone"
                      value={setProducts.unitsTaken}
                      onChange={(e) =>
                        setProducts({ ...products, unitsTaken: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"

                    />
                  </label>

                  <div className="flex justify-between items-center">                   
                        <button
                        type="submit"
                        onClick={() => handleSubmit}
                        className={`text-white rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                        BUY NOW
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyForm;
