"use client";

import { useState } from "react";
import ContactDetails from "./ContactDetails";
import ContactActions from "./ContactActions";
import EditContact from "./EditContact";
import { ContactListProps } from "../lib/types";
import { useAtom } from "jotai";
import { editContactModalOpenAtom } from "../lib/atoms/atoms";
import useFileHandler from "../lib/hooks/useFileHandler";

const ContactList: React.FC<ContactListProps> = ({ data }) => {
  const [hoveredContactId, setHoveredContactId] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useAtom(editContactModalOpenAtom);

  const { setFile, setPreviewUrl } = useFileHandler();

  const toggleActions = (id: string) => {
    if (showActions === id) {
      setShowActions(null);
    } else {
      setShowActions(id);
    }
  };

  const handleMouseEnter = (id: string) => {
    setHoveredContactId(id);
  };

  const handleMouseLeave = () => {
    setHoveredContactId(null);
    setShowActions(null);
  };

  const openModal = (id: string, fileUrl?: string) => {
    if (modalOpen && activeContactId === id) {
      setModalOpen(false);
      setActiveContactId(null);
    } else {
      setFile(null);
      setPreviewUrl(fileUrl || null);
      setModalOpen(true);
      setActiveContactId(id);
      setShowActions(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveContactId(null);
  };

  return (
    <div className="mt-3">
      {data.map((item) => (
        <div
          className="flex flex-col md:flex-row justify-between gap-4 py-3 rounded-lg duration-300 relative "
          key={item.id}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <ContactDetails
            name={item.name}
            phone={item.phone}
            fileUrl={item?.fileUrl}
          />

          {hoveredContactId === item.id && activeContactId !== item.id && (
            <ContactActions
              item={item}
              showActions={showActions}
              toggleActions={toggleActions}
              openModal={openModal}
            />
          )}

          {modalOpen && activeContactId === item.id && (
            <EditContact
              initialData={{
                id: item.id,
                name: item.name || "",
                phone: item.phone || "",
                email: item.email || "",
                fileUrl: item?.fileUrl,
              }}
              onClose={closeModal}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
