import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createData, Toast } from '../Api/api';

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const contact = { id: Date.now(), name, email, phone };
    Toast.fire({
        icon: 'success',
        title: 'Contact Created!',
      });
    await createData(`/contacts`, contact);
    navigate('/');
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-72 flex flex-col gap-5 bg-gray-100 p-5 rounded shadow-xl mx-auto mt-20"
    >
      <div className="">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="name"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example"
        />
      </div>
      <div className="">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
      </div>
      <div className="">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone
        </label>
        <input
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="09xxxxxxxxx"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="text-white bg-gray-500 px-3 py-1 shadow-lg w-20 rounded text-sm inli"
        >
          create
        </button>
        <button
          type="submit"
          onClick={() => navigate('/')}
          className="text-white bg-red-400 px-3 py-1 shadow-lg w-20 rounded text-sm"
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default Create;
