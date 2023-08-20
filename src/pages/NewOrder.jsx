import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { useStateContext } from '../contexts/ContextProvider';

const NewOrder = () => {

    const [data, setData] = useState([]);

    const [cust, useCust] = useState('');
    const [method, setMethod] = useState();
    const [paid, setPaid] = useState();
    const [topay, setTopay] = useState(0);
    const [balance, setBalance] = useState(0);
    const [unitsTaken, setUnitsTaken] = useState(0);

    const { id } = useParams();
    const { dispatch,customers } = useStateContext();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/client/customers`)
        .then((res) =>{ 
          dispatch({ type: 'GET_CUSTOMERS', payload: res.data })
        })
        .catch(err => console.log(err))
        if(id){
            axios.get(`${import.meta.env.VITE_BASE_URL}/client/transactions/${id}`)
            .then((res) =>{ 
                setData(res.data)
                  // setLoading(false);
                })
            .catch(err => console.log(err))
        }
    }, []);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

    <div className="flex">
      <div class="flex-1 h-40 mt-8 mr-8 flex items-center justify-center">
        <div class="text-black text-center">
          <p class="text-lg mt-2 font-bold">Customer Names</p>
          <select value={data.customer || cust} 
                      onChange={(e) =>  useCust(e.target.value)}
                      className="block appearance-none w-[18rem] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option>{data.customer || "Select customer"}</option>
                        {customers && customers.map((info) => (
                        <option key={info._id}>{info.name}</option>
                        ))}
                      </select>
          <p className='mt-2'>Customer Balance: $ {data.balance}</p>
          <div className="p-4">                
                      <select value={method} 
                      onChange={(e) => setMethod(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option value="">Select a payment method</option>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                      </select>
                  </div>
        </div>
      </div>

      <div class="flex-1 h-40 mt-8 mr-8 flex items-center justify-center">
        <div class="text-black text-center">
          <p class="text-lg mt-2 font-bold">Total order Amount: ${data.totalAmount}</p>
          <p className='mt-2'>Customer Pay: $ {data.paid}</p>
          <p className='mt-2'>Customer Balance: $ {data.balance}</p>
          <p className='mt-2'>Your Balance: $ {data.balance}</p>
        </div>
  </div>
  </div>
  <p className='mt-2 text-black'>Item Number: </p>

  <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Ordered Bags</TableCell>
          <TableCell>Shipped Bags</TableCell>
          <TableCell>Left Bags</TableCell>
          <TableCell>Pairs/Bag</TableCell>
          <TableCell>Unit Price</TableCell>
          <TableCell>Item Total Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          
          <TableRow>
            <TableCell>{}</TableCell>
            <TableCell>{data.orderedBags}</TableCell>
            <TableCell>{data.shippedBags}</TableCell>
            <TableCell>{data.leftBags}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{data.totalAmount}</TableCell>
 
          </TableRow>             
       
      </TableBody>
    </Table>

    </div>
  )
}

export default NewOrder
