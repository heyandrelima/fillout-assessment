"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AddPageModalContextType = {
  isOpen: boolean;
  showModal: (afterId?: string) => void;
  hideModal: () => void;
  afterId?: string;
};

const AddPageModalContext = createContext<AddPageModalContextType | undefined>(
  undefined
);

export const AddPageModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [afterId, setAfterId] = useState<string | undefined>(undefined);

  const showModal = (afterId?: string) => {
    setIsOpen(true);
    setAfterId(afterId);
  };

  const hideModal = () => {
    setIsOpen(false);
    setAfterId(undefined);
  };

  return (
    <AddPageModalContext.Provider
      value={{ isOpen, showModal, hideModal, afterId }}
    >
      {children}
    </AddPageModalContext.Provider>
  );
};

export const useAddPageModal = () => {
  const context = useContext(AddPageModalContext);
  if (!context) {
    throw new Error(
      "useAddPageModal must be used within an AddPageModalProvider"
    );
  }
  return context;
};
