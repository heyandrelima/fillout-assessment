"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { SettingsDropdown } from "./SettingsDropdown";
import { useRouter } from "next/navigation";

type Props = PropsWithChildren<{
  isActive?: boolean;
  href: string;
  pageId: string;
}>;

export const PageButton = ({ children, isActive, href, pageId }: Props) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDotsClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!dotsRef.current?.contains(target)) {
      setOpenDropdown(false);
    }
  };

  const handleContextMenuButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(true);
  };

  const handleContextMenuOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!buttonRef.current?.contains(target)) {
      setOpenDropdown(false);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData("text/plain", pageId);
    e.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleContextMenuOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleContextMenuOutside);
    };
  }, []);

  return (
    <div className="relative inline-block z-10">
      <button
        ref={buttonRef}
        onClick={() => router.push(href)}
        draggable={true}
        onContextMenu={handleContextMenuButton}
        onDragStart={handleDragStart}
        className={`
          inline-flex gap-[6px] items-center justify-center cursor-pointer
          ${
            isActive
              ? "bg-white border-[#E1E1E1] border-1 shadow-sm/6 focus:inset-ring-[1px] focus:inset-ring-[#2F72E2] focus:ring-[#2F72E2]/25 focus:ring-[1px]"
              : "bg-[#9DA4B2]/15 hover:bg-[#9DA4B2]/35"
          }
        rounded-[8px] px-[10px] py-[4px]`}
      >
        <span
          className={`text-[20px] ${
            isActive ? "text-[#F59D0E]" : "text-[#8C93A1]"
          }`}
        >
          <FiFileText />
        </span>
        <span
          className={`text-[14px]/[20px] font-medium ${
            isActive ? "text-[#1A1A1A]" : "text-[#677289]"
          }`}
        >
          {children}
        </span>
        {isActive && (
          <span
            ref={dotsRef}
            className="text-[16px] text-[#9DA4B2] hover:text-[#1A1A1A]"
            onClick={handleDotsClick}
          >
            <HiDotsVertical />
          </span>
        )}
      </button>
      <SettingsDropdown pageId={pageId} isOpen={openDropdown} />
    </div>
  );
};
