import { useState } from 'react';
import axios from 'axios';

import {Header} from "../components";

const Inventory = () => {

  // image upload states and code
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

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

  const handleSubmit = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        uploadImage(reader.result);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        alert('something went wrong!');
    };
     };

  const uploadImage = async (base64EncodedImage) => {
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/client/stocks`, { data: base64EncodedImage }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
          setFileInputState('');
          setPreviewSource('');
          alert('Image uploaded successfully');
      } catch (err) {
          console.error(err);
          alert('Something went wrong!');
      }
  };


  return (
    <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
          <div className="flex justify-between items-center">
          <Header category="Your" title="Inventory List" />          
        </div> 
        <div className="flex">
      <div class=" flex-col  mr-[30rem]">
        <label className="block mb-4">
                    Item Number:
                    <input
                      type="text"
                      //value={}
                      onChange={(e) => {}}
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
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label>
                  <div className="p-4">                
                      <select 
                      //value={} 
                      onChange={(e) => {}}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      required
                          >
                        
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                  </div>
                  </label>  
                  <label className="block mb-4">
                    Pair/Bag:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Reorder Level:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Units on Hand (Bag):
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
            </label>
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
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <label className="block mb-4">
                    Number of Bags:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Location:
                    <input
                      type="text"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Factory Price:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Selling Price:
                    <input
                      type="number"
                      //value={}
                      onChange={(e) => {}}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>

                  <button
                        type="submit"
                        onClick={() => {}}
                        className={`text-white text-lg rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                      +  Add Transaction
                      </button>
        </div>
      </div>
    </div>
  )
}

export default Inventory
