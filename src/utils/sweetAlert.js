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
        confirmButtonColor: 'red',
      },
    });
  },

  error: (message, title = 'Error!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  },

  info: (message, title = 'Info') => {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Okay',
    });
  },

  warning: (message, title = 'Warning!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Okay',
    });
  },

  confirm: (onConfirm, buttonText = 'Yes, delete it!') => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: buttonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  },
};

export default SwalUtils;
