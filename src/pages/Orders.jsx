import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { format } from 'date-fns';


import {Header, TransactionForm} from "../components";

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
          <div className="flex justify-between items-center">
          <Header category="Your" title="Orders" />
            <TransactionForm />
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
            <TableCell>{format(new Date(info.createdAt), "MM/dd/yyyy 'at' hh:mm a")}</TableCell>
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.email}</TableCell>
            <TableCell>{info.phoneNumber}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell onClick={() => handleDelete(info)}><DeleteIcon/></TableCell>
          </TableRow>
            
        ))}
      </TableBody>
    </Table>  
      </div>
  );
};

export default Sales;