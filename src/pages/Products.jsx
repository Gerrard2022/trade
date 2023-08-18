import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

import {Header, ProductForm, BuyForm} from "../components";
import { useStateContext } from '../contexts/ContextProvider';

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  const { currentColor, currentMode, transactions } = useStateContext();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/client/stocks`)
      .then((res) =>{ 
        setData(res.data);
       // console.log("hii", res.data.items);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className="flex justify-between items-center">
          <Header category="Your" title="Products" />
            
        </div> 

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Item Number</TableCell>
                <TableCell>Number of Bags</TableCell>
                <TableCell>Available for sale</TableCell>
                <TableCell>Pairs per Bags</TableCell>
                <TableCell>Item Stock Value</TableCell>
                <TableCell>Item Stock Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((stock) => (
    stock.items.map(({
      itemNumber,
      size,
      pairOrBag,
      itemSellingPrice,
      unitsOnHand,
      _id
    }) => (
      <TableRow key={_id} className="cursor-pointer hover:bg-gray-100">
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{} </Link></TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>
            {itemNumber}
            </Link>
            </TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{unitsOnHand}</Link></TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{unitsOnHand}</Link></TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{pairOrBag}</Link></TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{unitsOnHand * itemSellingPrice}</Link></TableCell>
        <TableCell>
          <Link to={`/inventory/${stock._id}/${_id}`}>{stock.description}</Link></TableCell>
      </TableRow>
    ))
  ))}
</TableBody>

          </Table> 
         
    </div>
  );
};

export default Products;