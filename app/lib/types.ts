import { ReactNode, MouseEventHandler, ChangeEvent } from "react";

// Basic Contact structure
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  fileUrl?: string;
}

export interface ModalProps {
  modalOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  buttonType?: ButtonType;
  type?: "button" | "submit" | "reset";
  className?: string;
  isActive?: boolean;
}

// Props for ListButton component (inherits from ButtonProps)
export type ListButtonProps = ButtonProps;

export interface ImagePreviewProps {
  previewUrl: string | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileDelete: () => void;
  inputId: string;
}

// Type alias for initialData
export type ContactData = Omit<Contact, "id">;

// Props for forms using contact data
export interface EditContactProps {
  initialData: Contact;
  onClose: () => void;
}

export interface ContactFormProps {
  initialData: ContactData;
}

export interface DeleteContactProps {
  id: string;
}

export interface ContactListProps {
  data: Contact[];
}

// Enum for button types
export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SPECIAL = "special",
}

export interface ContactActionsProps {
  item: {
    id: string;
    fileUrl?: string;
  };
  showActions: string | null;
  toggleActions: (id: string) => void;
  openModal: (id: string, fileUrl?: string) => void;
}

export interface ContactDetailsProps {
  name: string;
  phone: string;
  fileUrl?: string;
}
