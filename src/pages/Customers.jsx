import { useEffect, useState } from "react";
import axios from 'axios';
import { Box } from "@mui/material";
// import { useGetCustomersQuery } from "../state/api";
import { Header, Button, Form } from '../components';
import { DataGrid } from "@mui/x-data-grid";

import { useStateContext } from '../contexts/ContextProvider';

const Customers = () => {

  // const { data, isLoading } = useGetCustomersQuery();
  const { currentColor, currentMode } = useStateContext();

  const handleProductSubmit = () => {
    // Handle product form submission
    console.log('Product Form Data:');
  };

  const columns = [  
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },

  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/client/customers`)
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
          <Header category="List of" title="Customers" />
            {/* <Button
              color="white"
              bgColor={currentColor}
              text="Add a customer"
              borderRadius="10px"
              onClick={() => {}}
            /> */}
            <Form />
        </div>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {

            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {

          },
          "& .MuiDataGrid-footerContainer": {

            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {

          },
        }}
      >
        <DataGrid
          loading={loading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>          
    </div>
  );
};

export default Customers;