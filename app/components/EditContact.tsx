"use client";

import Modal from "./Modal";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import ContactForm from "./ContactForm";
import { ButtonType, EditContactProps } from "../lib/types";
import { useAtom } from "jotai";
import { editContactModalOpenAtom } from "../lib/atoms/atoms";
import useFileHandler from "../lib/hooks/useFileHandler";
import handleContactSubmit from "../lib/hooks/handleContactSubmit";

const EditContact: React.FC<EditContactProps> = ({ initialData, onClose }) => {
  const [modalOpen, setModalOpen] = useAtom(editContactModalOpenAtom);
  const {
    file,
    previewUrl,
    handleFileChange,
    handleFileUpload,
    handleFileDelete,
  } = useFileHandler();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleContactSubmit({
      initialData,
      file,
      handleFileUpload,
      form: e.currentTarget,
    });

    setModalOpen(false);
    onClose();
  };

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <div className="flex flex-col gap-6 p-6">
          <h2>Edit contact</h2>
          <ImagePreview
            previewUrl={previewUrl}
            handleFileChange={(e) =>
              handleFileChange(e.target.files?.[0] || null)
            }
            handleFileDelete={handleFileDelete}
            inputId="edit-file-input"
          />
          <ContactForm initialData={initialData} />
        </div>
        <div className="flex justify-end p-6 gap-2 text-center">
          <Button
            type="button"
            buttonType={ButtonType.SECONDARY}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" buttonType={ButtonType.PRIMARY}>
            Done
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditContact;
