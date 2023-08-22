import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { useStateContext } from '../contexts/ContextProvider';

const NewOrder = () => {

  const { id } = useParams();
  const { dispatch,customers } = useStateContext();

    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);

    const [cust, useCust] = useState('');
    const [itemId, setItemId] = useState('');
    const [method, setMethod] = useState();
    const [paid, setPaid] = useState();
    const [topay, setTopay] = useState(0);
    const [balance, setBalance] = useState(0);
    const [shipped, setShipped] = useState(0);
    const [ordered, setOrdered] = useState(0);
    const [itemTaken, setItemTaken] = useState();
    const [itemPrice, setItemPrice] = useState()


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/client/customers`)
        .then((res) =>{ 
          dispatch({ type: 'GET_CUSTOMERS', payload: res.data })
        })
        .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_BASE_URL}/client/stocks`)
        .then((res) =>{ 
          setItems(res.data);
         // console.log("hii", res.data.items);
          //setLoading(false);
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

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(itemId);
      setProducts({ id: itemId, unitsTaken:ordered,  orderedBags: ordered ,shippedBags: shipped,customer: cust, balance: balance, topay: topay, paid: paid, method: method})
      console.log(products);
      axios.post(`${import.meta.env.VITE_BASE_URL}/client/transactions`,  { products })
        .then(res => {
          if (res.status === 201) { // Check the response status
           // dispatchs({ type: 'CREATE_TRANSACTION', payload: res }); // Dispatch res.data
            alert(`Purchase done for ${products[0].unitsTaken}  items of ${itemTaken}`);
            setProducts({products: []});
            location.reload()
          } else {
            console.error("Transaction creation failed");
            alert("Transaction failed");
             setProducts({products: []});
          }
        })
        .catch(err => {
          console.error(err)
         setProducts({products: []})
        })
    };


  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

    <div className="flex justify-between">
      <div class="flex flex-col ">
      
          <p class="text-lg mt-2 font-bold">Select customer</p>
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
                   <p className='mt-3'> Customer Balance:</p>
                        <input 
                        type="number"
                        value={topay - paid}
                        onChange={() => setBalance(topay - paid)}
                        className="w-[18rem] px-3 py-2 border rounded"
                        required
                        />  
                      <select value={method} 
                      onChange={(e) => setMethod(e.target.value)}
                      className=" my-4 block appearance-none w-[18rem] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option value="">Select a payment method</option>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                      </select>
               
                      <select 
                        value={itemTaken} 
                        onChange={(e) => {
                          setItemTaken(e.target.value);
                          setItemPrice(
                            items.find(stock => stock.items.some(item => item.itemNumber === e.target.value))
                              ?.items.find(item => item.itemNumber === e.target.value)?.itemSellingPrice || null
                          );
                          setItemId(
                            items.flatMap(stock => stock.items).find(item => item.itemNumber === e.target.value)?._id || null
                          );
                        }}
                        className="my-4 block appearance-none w-[18rem] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        required
                      >
                        <option value="">Select an Item Number</option>     
                        {items && items.map((stock) => (
                          stock.items.map(({ itemNumber, _id }) => (  
                            <option key={_id} value={itemNumber}>{itemNumber}</option>
                          ))
                        ))}
                      </select>
                <div className="flex flex-col gap-3">
                <label>
                    Ordered Bags:
                    <input 
                    type="number"
                    value={ordered}
                    onChange={(e) => {
                        setOrdered(e.target.value);
                        setTopay(e.target.value * itemPrice)
                    }}
                    className="w-[18rem] px-3 py-2 border rounded"
                    required
                     />
                </label>
                <label>
                    Shipped Bags:
                    <input 
                    type="number"
                    value={shipped}
                    onChange={(e) => setShipped(e.target.value)}
                    className="w-[18rem] px-3 py-2 border rounded"
                    required
                     />
                </label>
                </div>
               
      </div>

      <div class="flex-col">
       
          <label>
            Order total Amount in $
            <input 
            type="number"
            value={topay}
            className="w-full px-3 py-2 border rounded"
             />
          </label>
          <label className="block mb-4">
            Customer Pay
            <input 
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            />
          </label>
          <p className='mt-2'>Your Balance in $ </p>
          <input type="number" className="w-full px-3 py-2 border rounded" value={0} />
          
          <button
            className="my-5 bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="submit"
            onClick={(e) => handleSubmit(e)}
               >
            Confirm Order
          </button>
        </div>
  
  </div>

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
