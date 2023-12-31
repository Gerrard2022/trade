import { useState, useEffect  } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, useMediaQuery } from '@mui/material';

import {Header} from "../components";

const Inventory = () => {

  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/client/stocks`)
    .then((res) =>{ 
      setData(res.data);
     // console.log("hii", res.data.items);
     // setLoading(false);
    })
    .catch(err => console.log(err))
}, []);

  // image upload states and code
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  // states 4 inventory item
  const [itemNumber, setItemNumber] = useState();
  const [size, setSize] = useState();
  const [location, setLocation] = useState('A');
  const [pair, setPair] = useState();
  const [fPrice, setFPrice] = useState();
  const [sPrice, setSPrice] = useState();
  const [reorder, setReorder] = useState();


  // states fr stock
  const [stockDate, setStockDate ] = useState();
  const [numberOfBags, setNumberOfBags ] = useState(0);
  const [Slocation, setSlocation ] = useState();
  const [description, setDescription ] = useState('Stock In');
  const [factoryPrice, setFactoryPrice ] = useState();
  const [sellingPrice, setSellingPrice] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
};

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

  const handleSubmit = (e) => {
    // if (!selectedFile) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    // reader.onloadend = () => {
    //     uploadImage(reader.result);
    // };
    // reader.onerror = () => {
    //     console.error('AHHHHHHHH!!');
    //     alert('something went wrong!');
    // };
console.log(itemNumber, 
  size, 
  location, 
  pair, 
  fPrice, 
  sPrice, 
  reorder, 
  stockDate, 
  numberOfBags,
  Slocation,
  description,
  factoryPrice,
  sellingPrice);
  console.log('location',location)
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/client/stocks`, 
    {items: [{
      itemNumber, 
      size, 
      location, 
      pairOrBag: pair, 
      itemFactoryPrice: fPrice, 
      itemSellingPrice: sPrice, 
      itemReorderLevel: reorder, 
      unitsOnHand: numberOfBags
    }], 
      stockDate, 
      numberOfBags,
      location: Slocation,
      description,
      factoryPrice,
      sellingPrice

    })
    .then(res =>  {
      alert("Added !!!")   
      location.reload();
      
    })
    .catch(err => console.log(err))
     };

  // const uploadImage = async (base64EncodedImage) => {
  //     try {
  //       await axios.post(`${import.meta.env.VITE_BASE_URL}/client/stocks`, { data: base64EncodedImage }, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //         setFileInputState('');
  //         setPreviewSource('');
  //         alert('Image uploaded successfully');
  //     } catch (err) {
  //         console.error(err);
  //         alert('Something went wrong!');
  //     }
  // };

const handleItemNumberChange = () =>{
  const pair = itemNumber.split('/')[1];
  setPair(pair);
}
  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
          <div className="flex justify-start items-center">
          <Header category="Your" title="Inventory List" />          
        </div> 
        <div className="flex justify-between">
           <div class=" flex-col ">
             <label className="block mb-4">
                    Item Number:
                    <input
                      type="text"
                      value={itemNumber}
                      onChange={(e) => setItemNumber(e.target.value)}
                      onBlur={() => handleItemNumberChange()}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
              <label 
              className="block mb-4"
              >
                    Size:
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label>
                  <div className="p-4">  
                  <label>  
                    Location           
                      <select 
                      value={location} 
                      onChange={(e) => {setLocation(e.target.value)}}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                      </label> 
                  </div>
                  </label>  
                  <label className="block mb-4">
                    Pair/Bag:
                    <input
                      type="number"
                      value={pair}
                      onChange={(e) => setPair(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="number"
                      value={fPrice}
                      onChange={(e) => setFPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                      type="number"
                      value={sPrice}
                      onChange={(e) => setSPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Reorder Level:
                    <input
                      type="number"
                      value={reorder}
                      onChange={(e) => setReorder(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Units on Hand (Bag):
                    <input
                      type="number"
                      value={numberOfBags}
                      onChange={() => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
            </label>
        </div>
         <div className="mx-10">
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />

        {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
       </div>
        <div className="flex-col">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add New Stock
           </p>
           <label className="block mb-4">
                    Stock Date:
                    <input
                      type="text"
                      value={stockDate}
                      onChange={(e) => setStockDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <label className="block mb-4">
                    Number of Bags:
                    <input
                      type="text"
                      value={numberOfBags}
                      onChange={(e) => {
                        setNumberOfBags(e.target.value)
                        console.log(numberOfBags)
                      }}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Location:
                    <input
                      
                      value={Slocation}
                      onChange={(e) => setSlocation(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label>
                    Description
                  <select 
                      value={description} 
                      onChange={(e) => {
                        console.log(e.target.value)
                        setDescription(e.target.value)
                      }}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        <option value="Stock In">Stock In</option>
                        <option value="Stock Out">Stock Out</option>
                      </select>
                      </label>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="text"
                      value={factoryPrice}
                      onChange={(e) => setFactoryPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                     
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className={`text-white text-lg rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                      +  Add Transaction
                      </button>
        </div>
      </div>

      <div className="mt-8">
      <p className="text-3xl font-extrabold tracking-tight mb-9 text-center text-slate-900">
      All Your Stocks
    </p>
      <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Bags</TableCell>
                <TableCell>Factory Price</TableCell>
                <TableCell>Selling Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((stock) => (
            
                      <TableRow key={stock._id} className="cursor-pointer hover:bg-gray-100">
                        <TableCell>{stock.stockDate}</TableCell>
                        <TableCell>{stock.description}</TableCell>
                        <TableCell>{stock.location}</TableCell>
                        <TableCell>{stock.numberOfBags}</TableCell>
                        <TableCell>{stock.factoryPrice}</TableCell>
                        <TableCell>{stock.sellingPrice}</TableCell>
                        </TableRow>
                  ))}
        </TableBody>

          </Table> 
      </div>
     
    </div>
  )
}

export default Inventory
