// src/utils/SwalUtils.js
import Swal from 'sweetalert2';

const SwalUtils = {
  success: (message, title = 'Success!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-green-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  error: (message, title = 'Error!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-red-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  info: (message, title = 'Info') => {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-blue-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  warning: (message, title = 'Warning!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-yellow-400 min-w-[180px] text-black px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  confirm: (onConfirm) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  },
};

export default SwalUtils;
