import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const DashBroadActionButton = ({ className, type }) => {
  return (
    <button
      className={`${className} border border-black/10 py-xs px-sm rounded-md flex gap-xs justify-center items-center cursor-pointer ${type == 'delete' && 'text-red-500 hover:bg-red-50 border-red-200'}`}
    >
      {type == 'delete' && <MdDelete size={20} />}
      {type == 'edit' && <MdEdit size={20} />}
      {type == 'delete' ? 'Delete' : type == 'edit' ? 'Edit' : ''}
    </button>
  );
};

export default DashBroadActionButton;
