import { PropsWithChildren } from "react";

type ContainerProps = {
  title?: string;
  isOpen?: boolean;
};

const Container = ({
  title,
  isOpen,
  children,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute min-w-[240px] rounded-[12px] pb-[14px] bg-white shadow-sm/6 border-[#E1E1E1] border-1 overflow-clip z-50 left-0 bottom-[calc(100%+9px)]`}
    >
      <div className="bg-[#FAFBFC] p-[12px] font-medium text-[16px]/[24px] text-[#1A1A1A] font-[family-name:var(--font-blMelody)] border-b-[1px] border-b-[#E1E1E1]">
        {title}
      </div>
      {children}
    </div>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-[12px] px-[12px] pb-[12px] flex flex-col gap-[14px]">
      {children}
    </div>
  );
};

type ItemProps = {
  onClick?: () => void;
};

const Item = ({ children, onClick }: PropsWithChildren<ItemProps>) => {
  return (
    <div
      className="flex gap-[6px] items-center text-[14px]/[16px] font-medium cursor-pointer hover:bg-[#F9FAFB]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Separator = () => {
  return <div className="border-t border-[#E1E1E1]" />;
};

export const Dropdown = { Container, Content, Item, Separator };
