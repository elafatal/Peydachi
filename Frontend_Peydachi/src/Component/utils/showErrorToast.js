// utils/showErrorToast.js
import Swal from 'sweetalert2';

const showErrorToast = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    "خطای ناشناخته‌ای رخ داده است";

  Swal.fire({
    position: "top-end",
    icon: "error",
    html: `<div class="text-justify">${message}</div>`,
    showConfirmButton: false,
    timer: 4000,
    toast: true,
    customClass: {
      popup: 'text-sm px-4 py-3 max-w-md w-full',
      icon: 'text-xs mb-2',
    },
  });
};

export default showErrorToast;
