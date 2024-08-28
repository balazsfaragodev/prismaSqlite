import { ListButtonProps } from "../lib/types";

const ListButton: React.FC<ListButtonProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex justify-start items-center w-full gap-3 px-[10px] py-3 h-10 bg-Grey-80 hover:bg-Grey-70 active:bg-Grey-60 ${className}`}
    >
      {children}
    </button>
  );
};

export default ListButton;
