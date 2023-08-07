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
  // useTheme,
  useMediaQuery,
} from "@mui/material";
import {Header} from "../components";
// import { useGetProductsQuery } from "../state/api";
import { useStateContext } from '../contexts/ContextProvider';

const Product = ({
  _id,
  name,
  description,
  price,
  category,
  supply,
  stat,
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

        <Typography variant="body2">{description}</Typography>
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
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
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
            <button
              type="button"
              className={` text-white p-3 hover:drop-shadow-xl bg-[#7352ff] rounded-[10px]`}
              onClick={() => {}}
            >Add a product</button>
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
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
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