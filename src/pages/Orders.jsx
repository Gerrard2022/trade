import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


import {Header} from "../components";

const Sales = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/transactions`)
    .then((res) =>{ 
      setData(res.data)
      // setLoading(false);
    })
    .catch(err => console.log(err))
}, []);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between items-center ">
          <Header category="Item" title="Orders" />
          <Link to="/new-order">
          <button
            className="bg-[#7352FF] text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
               >
            Add a New Order
          </button>
      </Link>
        </div> 
        <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Item Number</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Order Number</TableCell>
          <TableCell>Bags ordered</TableCell>
          <TableCell>Bags Shipped</TableCell>
          <TableCell>Bags left</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {data.map((info) => (
    <TableRow key={info._id} className="cursor-pointer hover:bg-gray-100">
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {format(new Date(info.createdAt), "MM/dd/yyyy 'at' hh:mm a")}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.customer}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.phoneNumber}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.orderedBags}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.shippedBags}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          {info.leftBags}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/orders/${info._id}`}>
          ${info.totalAmount}
        </Link>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

    </Table>  
      </div>
  );
};

export default Sales;