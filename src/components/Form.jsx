import React, { useState } from 'react';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '../components';

const Form = () => {

  const { currentColor, currentMode } = useStateContext();
  const navigate = useNavigate();

  const options = ["Rwanda", "Uganda", "Tanzania"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [Open, setOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phoneNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, country:  selectedOption})
    axios.post(`${import.meta.env.VITE_BASE_URL}/client/customers`, {...formData})
    .then(res =>     {
      location.reload();
      navigate('/customers');
    })
    .catch(err => console.log(err))
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Open customer Form
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-3xl font-semibold">
                  Customer Form
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  {/* Render form inputs here */}
                  <label className="block mb-4">
                    Name:
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    email:
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    Phone Number:
                    <input
                      type="telephone"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"

                    />
                  </label>

                  {/* my dropdown */}
                  <div className="flex flex-col relative">
                    <button
                    type='button'
                      className='bg-[#acbdf7d3] p-4 mb-4 w-3/4 flex items-center justify-between rounded-lg tracking-wider text-lg font-bold'
                      onClick={() => setOpen(prev => !prev)}
                    >
                      {selectedOption}
                      {Open ? (<AiOutlineCaretUp className='h-8' />):(<AiOutlineCaretDown className='h-8 '/>)}
                    </button>
                    {Open && (
                      <div className="absolute bg-blue-400 top-20 flex flex-col items-start rounded-lg p-2">
                        {options.map((item, i) => (
                          <div className="w-full p-3 hover:bg-blue-300 cursor-pointer rounded-lg"
                           key={i}
                           onClick={() => setSelectedOption(item)}>
                            <h3>{item}</h3>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Add other input fields here */}
                  <div className="flex justify-between items-center">                   
                        {/* <Button
                        color="white"
                        bgColor={currentColor}
                        text="Add"
                        borderRadius="10px"
                        onClick={handleSubmit}
                        /> */}
                        <button
                        type="submit"
                        onClick={() => handleSubmit}
                        className={`text-white rounded-[10px] bg-[#7352ff]  p-3 hover:drop-shadow-xl`}
                      >
                        Add
                      </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
