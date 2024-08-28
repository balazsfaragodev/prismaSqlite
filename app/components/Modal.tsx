"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ModalProps } from "../lib/types";

const Modal: React.FC<ModalProps> = ({ modalOpen, children }) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 h-screen w-screen bg-black bg-opacity-40 z-10 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed top-1/2 left-1/2  z-20 w-[364px] max-h-[90vh] bg-Grey-100 rounded-lg overflow-y-auto "
            initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.95 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
