import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Header from "../components/Header";

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
          <Header category="Your" title="Customers" />
            <Form />
        </div> 
        <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Buyer</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell># of product</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((info) => (
          <>
          <TableRow key={info._id} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{info._id}</TableCell>
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.email}</TableCell>
            <TableCell>{info.phoneNumber}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell onClick={() => handleDelete(info)}><DeleteIcon/></TableCell>
          </TableRow>
             </>
        ))}
      </TableBody>
    </Table>  
      </div>
  );
};

export default Sales;