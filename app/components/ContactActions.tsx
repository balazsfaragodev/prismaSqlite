import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import ListButton from "./ListButton";
import DeleteContact from "./DeleteContact";
import { ButtonType, ContactActionsProps } from "../lib/types";
import { useEffect, useRef } from "react";

const ContactActions: React.FC<ContactActionsProps> = ({
  item,
  showActions,
  toggleActions,
  openModal,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropdownRef.current && showActions) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (dropdownRect.bottom > viewportHeight) {
        dropdownRef.current.classList.add("-mt-[168px]");
        dropdownRef.current.classList.remove("mt-2");
      } else {
        dropdownRef.current.classList.add("mt-2");
        dropdownRef.current.classList.remove("-mt-[168px]");
      }
    }
  }, [showActions]);
  return (
    <div className="flex items-center gap-2 relative justify-end">
      <Button buttonType={ButtonType.SECONDARY}>
        <Image src="/svg/Mute.svg" alt="Mute" width={24} height={24} />
      </Button>
      <Button buttonType={ButtonType.SECONDARY}>
        <Image src="/svg/Call.svg" alt="Call" width={24} height={24} />
      </Button>
      <Button
        onClick={() => toggleActions(item?.id)}
        buttonType={ButtonType.SECONDARY}
        isActive={showActions === item?.id}
      >
        <Image
          src="/svg/More.svg"
          alt="More"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </Button>
      <AnimatePresence initial={false}>
        {showActions === item?.id && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, x: 0, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 0, y: -10 }}
            className="absolute top-full right-0 bg-Grey-80 rounded-lg shadow-lg z-10 w-[219px] mt-2 mr-0 md:-mr-[178px]"
          >
            <ListButton
              onClick={() => openModal(item?.id, item?.fileUrl)}
              className="rounded-t-lg"
            >
              <Image
                src="/svg/Settings.svg"
                alt="Settings"
                width={24}
                height={24}
                className="opacity-56"
              />
              Edit
            </ListButton>
            <ListButton>
              <Image
                src="/svg/Favourite.svg"
                alt="Favourite"
                width={24}
                height={24}
                className="opacity-56"
              />
              Favourite
            </ListButton>
            <DeleteContact id={item?.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactActions;
