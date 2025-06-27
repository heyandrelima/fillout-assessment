"use client";
import { useAddPageModal } from "@/hooks/useAddPageModal";
import { usePages } from "@/hooks/usePages";
import React, { useState } from "react";

const AddPageModal = () => {
  const { isOpen, afterId } = useAddPageModal();
  const [pageTitle, setPageTitle] = useState<string>("");
  const { addPage } = usePages();
  const { hideModal } = useAddPageModal();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageTitle.trim()) return;
    addPage(pageTitle, afterId);
    hideModal();
    setPageTitle("");
  };
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#000]/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-auto flex flex-col relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={() => hideModal()}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="p-8 flex-1 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Add New Page</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Page Title
              <input
                type="text"
                name="pageTitle"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9DA4B2] px-[12px] py-[8px] focus:ring-[#9DA4B2] focus:ring-1"
                placeholder="Enter page title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer"
            >
              Add Page
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPageModal;
