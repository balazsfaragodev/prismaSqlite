"use client";

import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import ContactForm from "./ContactForm";
import { ButtonType } from "../lib/types";
import { useAtom } from "jotai";
import { addContactModalOpenAtom } from "../lib/atoms/atoms";
import useFileHandler from "../lib/hooks/useFileHandler";
import handleContactSubmit from "../lib/hooks/handleContactSubmit";
import Image from "next/image";

const AddContact: React.FC = () => {
  const [modalOpen, setModalOpen] = useAtom(addContactModalOpenAtom);
  const {
    file,
    previewUrl,
    setFile,
    setPreviewUrl,
    handleFileChange,
    handleFileUpload,
    handleFileDelete,
  } = useFileHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleContactSubmit({
      file,
      handleFileUpload,
      form: e.currentTarget,
    });

    setModalOpen(false);
  };

  const openModal = () => {
    setFile(null);
    setPreviewUrl(null);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={openModal} buttonType={ButtonType.SPECIAL}>
        <Image src="/svg/Add.svg" alt="Add" width={24} height={24} />
        Add new
      </Button>
      <Modal modalOpen={modalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-6 p-6">
            <h2>Add contact</h2>
            <ImagePreview
              previewUrl={previewUrl}
              handleFileChange={(e) =>
                handleFileChange(e.target.files?.[0] || null)
              }
              handleFileDelete={handleFileDelete}
              inputId="add-file-input"
            />
            <ContactForm
              initialData={{
                name: "",
                phone: "",
                email: "",
              }}
            />
          </div>
          <div className="flex justify-end gap-2 p-6 text-center">
            <Button
              type="button"
              buttonType={ButtonType.SECONDARY}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" buttonType={ButtonType.PRIMARY}>
              Done
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddContact;
