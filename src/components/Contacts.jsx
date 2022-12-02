import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteData, getData, Toast } from '../Api/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        'bg-red-500 text-white px-4 py-2 rounded border-0 shadow-lg mx-3',
      cancelButton:
        'bg-green-500 text-white px-4 py-2 rounded border-0  shadow-lg',
    },
    buttonsStyling: false,
  });
  const getContacts = async () => {
    const data = await getData('/contacts');
    setContacts(data);
  };
  const apiDeleteContact = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          await deleteData(`/contacts/${id}`);
          getContacts();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
    // await deleteData(`/contacts/${id}`);
    // Toast.fire({
    //   icon: 'success',
    //   title: 'Deleted!',
    // });
    // getContacts();
  };
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <>
      <Link to={'/create'}>
        <button className="text-white mx-3 bg-gray-500 px-5 py-2 shadow-lg transition duration-200 ease-in hover:scale-105 rounded my-5">
          Create New Contact
        </button>
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {contact.name}
                </th>
                <td className="py-4 px-6">{contact.email}</td>
                <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                  {contact.phone}
                </td>
                <td className="py-4 px-6 flex items-center gap-3">
                  <Link to={`/edit/${contact.id}`}>
                    <AiTwotoneEdit className="text-xl text-green-500 cursor-pointer" />
                  </Link>
                  <AiFillDelete
                    onClick={() => apiDeleteContact(contact.id)}
                    className="text-xl text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contacts;
