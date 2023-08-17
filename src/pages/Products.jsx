import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {Header, ProductForm, BuyForm} from "../components";
import { useStateContext } from '../contexts/ContextProvider';

const Product = ({
  itemNumber,
  price,
  supply,
  _id,
  size
}) => {


  return (
    <Card
      sx={{
        backgroundImage: "none",

        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
      <BuyForm ID={_id} itemNumber={itemNumber} price={price}/>  
        <Typography
          sx={{ fontSize: 14 }}

          gutterBottom
        >
              
          {size}
        </Typography>
        <Typography variant="h5" component="div">
          {itemNumber}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} >
          ${Number(price).toFixed(2)}
        </Typography>
          <Typography>Items Left: {supply}</Typography>
      </CardContent>
    </Card>
  );
};

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
    <Box m="1.5rem 2.5rem">
    <div className="flex justify-between items-center">
          <Header category="Your" title="Products" />
            <ProductForm />
        </div> 
      {data || !loading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data && data.map((stock) => (
             <div key={stock._id} className="flex-row flex-wrap">
             <p>Stock Date: {stock.stockDate}</p>
             <p>Number of Bags: {stock.numberOfBags}</p>
             {/* ... other stock fields */}
             
             <p>Items:</p>
             {stock.items.map(({
              itemNumber,
              size,
              itemSellingPrice,
              unitsOnHand,
              _id
          }) => (
            <div className="">
              <Product
                key={_id}
                _id={_id}
                itemNumber={itemNumber}
                price={itemSellingPrice}
                supply={unitsOnHand}
                size={size}
              />
              </div>
              ))}
              </div>
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
    </div>
  );
};

export default Products;