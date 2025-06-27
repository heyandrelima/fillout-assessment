"use client";
import { usePathname } from "next/navigation";
import { PageButton } from "./PageButton";
import { FaPlus } from "react-icons/fa";
import { usePages } from "@/hooks/usePages";
import { useAddPageModal } from "@/hooks/useAddPageModal";
import { useState } from "react";

export const PageNavBar = () => {
  const pathname = usePathname();
  const { pages } = usePages();

  return (
    <div className="absolute bottom-0 h-[72px] z-10 w-full p-[20px]">
      <div className="inline-flex gap-[0px] items-center">
        {pages.map((page, index) => (
          <div className="inline-flex items-center" key={page.id}>
            <PageButton
              href={`/${page.id}`}
              isActive={pathname === `/${page.id}`}
              pageId={page.id}
            >
              {page.title}
            </PageButton>
            <NavSeparator showPlus={index < pages.length} afterId={page.id} />
          </div>
        ))}
        <AddPageButton />
      </div>
    </div>
  );
};

type NavSeparatorProps = {
  showPlus?: boolean;
  afterId?: string;
};
const NavSeparator = ({ showPlus = true, afterId }: NavSeparatorProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { movePage } = usePages();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const pageId = e.dataTransfer.getData("text/plain");
    if (!pageId) return;
    movePage(pageId, afterId);
  };

  return (
    <div
      className="inline-flex items-center group h-[32px]"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
    >
      <div
        className={`overflow-clip ${isDraggingOver ? "w-[20px]" : "w-[10px]"} ${
          showPlus ? "group-hover:min-w-[20px]" : ""
        }`}
      >
        <div
          className={`border-t min-w-[100px] border-[#C0C0C0] border-dashed `}
        />
      </div>
      {showPlus && !isDraggingOver && <PlusButton afterId={afterId} />}
      <div
        className={`${
          isDraggingOver ? "w-[64px] border-[1px]" : "w-[0px] border-[0px]"
        } h-[24px] border-[#C0C0C0] rounded-[8px] transition-all`}
      />
      <div
        className={`overflow-clip ${isDraggingOver ? "w-[20px]" : "w-[10px]"}
        ${showPlus ? "group-hover:min-w-[20px]" : ""}
        `}
      >
        <div
          className={`border-t min-w-[100px] border-[#C0C0C0] border-dashed `}
        />
      </div>
    </div>
  );
};

const PlusButton = ({ afterId }: { afterId?: string }) => {
  const { showModal } = useAddPageModal();
  return (
    <button
      className="p-[0px] w-[0px] h-[0px] overflow-hidden group-hover:w-[16px] group-hover:h-[16px]
    transition-all text-center flex items-center group-hover:p-[3px]
    border-[1px] border-[#E1E1E1] rounded-[50%] cursor-pointer bg-white
    hover:scale-120"
      onClick={() => showModal(afterId)}
    >
      <FaPlus />
    </button>
  );
};

const AddPageButton = () => {
  const { showModal } = useAddPageModal();
  return (
    <button
      className={`
          inline-flex gap-[6px] items-center justify-center cursor-pointer
          bg-white border-[#E1E1E1] border-1 shadow-sm/6 focus:inset-ring-[1px] focus:inset-ring-[#2F72E2] focus:ring-[#2F72E2]/25 focus:ring-[1px]
        rounded-[8px] px-[10px] py-[4px]`}
      onClick={() => showModal()}
    >
      <FaPlus />
      <span>Add page</span>
    </button>
  );
};
