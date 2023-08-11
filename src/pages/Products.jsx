import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {Header, ProductForm} from "../components";
import { useStateContext } from '../contexts/ContextProvider';

const Product = ({
  _id,
  name,
  price,
  category,
  supply,
}) => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",

        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}

          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} >
          ${Number(price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit

      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  const { currentColor, currentMode } = useStateContext();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/client/products`)
      .then((res) =>{ 
        setData(res.data)
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
          {data.map(
            ({
              _id,
              name,
              price,
              category,
              supply,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                price={price}
                category={category}
                supply={supply}
               
              />
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