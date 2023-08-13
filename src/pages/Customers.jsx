import { useEffect, useState } from "react";
import axios from 'axios';
import { Header, Button, Form } from '../components';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import { useStateContext } from '../contexts/ContextProvider';

const Customers = () => {

  const { currentColor, currentMode, customers, dispatch } = useStateContext();



  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/client/customers`)
      .then((res) =>{ 
        //setData(res.data)
        // setLoading(false);
        dispatch({ type: 'GET_CUSTOMERS', payload: res.data })
      })
      .catch(err => console.log(err))
  }, []);

  const handleDelete = ({ _id, name }) => {
    axios.delete(`${import.meta.env.VITE_BASE_URL}/client/customers/${_id}`)
    .then(res => {
      alert(name + " has been deleted");
      dispatch({ type: 'DELETE_CUSTOMER', payload: res })
      //location.reload();
    })
    .catch(err => console.log(err))
  }

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
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Country</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers && customers.map((info) => (       
          <TableRow key={info._id} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{info._id}</TableCell>
            <TableCell>{info.name}</TableCell>
            <TableCell>{info.email}</TableCell>
            <TableCell>{info.phoneNumber}</TableCell>
            <TableCell>{info.country}</TableCell>
            <TableCell onClick={() => handleDelete(info)}><DeleteIcon/></TableCell>
          </TableRow>             
        ))}
      </TableBody>
    </Table>         
    </div>
  );
};

export default Customers;