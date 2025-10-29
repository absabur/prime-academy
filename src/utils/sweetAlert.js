// src/utils/SwalUtils.js
import Swal from 'sweetalert2';

const SwalUtils = {
  success: (message, title = 'Success!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      iconColor: 'var(--color-primary-light)',
      confirmButtonText: 'Okay',
      confirmButtonColor: 'var(--color-primary)',
    });
  },

  error: (message, title = 'Error!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Okay',
      confirmButtonColor: 'var(--color-secondary)',
      iconColor: 'var(--color-secondary-light)',
    });
  },

  info: (message, title = 'Info') => {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      iconColor: 'var(--color-primary)',
      confirmButtonText: 'Okay',
      confirmButtonColor: 'var(--color-primary)',
    });
  },

  warning: (message, title = 'Warning!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Okay',
      confirmButtonColor: 'var(--color-secondary)',
      iconColor: 'var(--color-secondary-light)',
    });
  },

  confirm: (onConfirm, buttonText = 'Yes, delete it!') => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      iconColor: 'var(--color-secondary-light)',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-secondary)',
      confirmButtonText: buttonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  },
};

export default SwalUtils;
