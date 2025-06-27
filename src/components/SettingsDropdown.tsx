"use client";
import { Dropdown } from "./Dropdown";
import { IoFlag } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import { PiPencilSimpleLine, PiCopy } from "react-icons/pi";
import { LuClipboard } from "react-icons/lu";
import { usePages } from "@/hooks/usePages";
import { useRouter } from "next/dist/client/components/navigation";

type Props = {
  pageId: string;
  isOpen?: boolean;
};

export const SettingsDropdown = ({ isOpen, pageId }: Props) => {
  const { movePage, removePage } = usePages();
  const router = useRouter();

  return (
    <Dropdown.Container title="Settings" isOpen={isOpen}>
      <Dropdown.Content>
        <Dropdown.Item onClick={() => movePage(pageId)}>
          <>
            <span className="text-[#2F72E2] text-[16px]">
              <IoFlag />
            </span>
            <span>Set as first page</span>
          </>
        </Dropdown.Item>
        <Dropdown.Item>
          <>
            <span className="text-[#9DA4B2] text-[16px]">
              <PiPencilSimpleLine />
            </span>
            <span>Rename</span>
          </>
        </Dropdown.Item>
        <Dropdown.Item>
          <>
            <span className="text-[#9DA4B2] text-[16px]">
              <LuClipboard />
            </span>
            <span>Copy</span>
          </>
        </Dropdown.Item>
        <Dropdown.Item>
          <>
            <span className="text-[#9DA4B2] text-[16px]">
              <PiCopy />
            </span>
            <span>Duplicate</span>
          </>
        </Dropdown.Item>

        <Dropdown.Separator />

        <Dropdown.Item
          onClick={() => {
            removePage(pageId);
            router.push("/");
          }}
        >
          <>
            <span className="text-[#EF494F] text-[16px]">
              <TbTrash />
            </span>
            <span className="text-[#EF494F]">Delete</span>
          </>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Container>
  );
};
