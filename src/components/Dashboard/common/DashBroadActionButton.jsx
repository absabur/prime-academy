import React from 'react';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

const DashBroadActionButton = ({ className, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}  rounded-md flex justify-center items-center cursor-pointer text-primary ${type == 'delete' && 'text-red-500 hover:bg-red-50 border-red-200'}`}
    >
      {type == 'delete' && <MdDelete size={20} />}
      {type == 'edit' && <FaRegEdit size={20} />}
      {type == 'view' && <FaEye size={20} />}
    </button>
  );
};

export default DashBroadActionButton;
