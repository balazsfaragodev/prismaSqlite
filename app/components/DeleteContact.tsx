"use client";

import { deleteContact } from "../lib/actions";
import ListButton from "./ListButton";
import Image from "next/image";
import { DeleteContactProps } from "../lib/types";

const DeleteContact: React.FC<DeleteContactProps> = ({ id }) => {
  const handleDelete = async () => {
    await deleteContact(id);
  };

  return (
    <div className="flex justify-end">
      <ListButton onClick={handleDelete} className="rounded-b-lg">
        <Image
          src="/svg/Delete.svg"
          alt="Delete"
          width={24}
          height={24}
          className="opacity-56"
        />
        Remove
      </ListButton>
    </div>
  );
};

export default DeleteContact;
