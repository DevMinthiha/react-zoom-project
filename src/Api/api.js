import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:3000';

export const getData = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}`);
  return data;
};

export const deleteData = async (url) => {
  await axios.delete(`${BASE_URL}${url}`);
};

export const createData = async(url, data) => {
    await axios.post(`${BASE_URL}${url}`, data);
}

export const updateData = async(url, data) => {
    await axios.patch(`${BASE_URL}${url}`, data);
}

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })