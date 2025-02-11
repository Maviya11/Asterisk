import { ImCross } from "react-icons/im";

interface Props {
  onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  return (
    <>
      {/* <div className="bg-[#f3f3f3] dark:bg-[#1e1e22] rotate-45 h-16 w-16 rounded fixed bottom-[52.5px] left-1/2 transform -translate-x-1/2 z-20 min-[400px]:bottom-[58.5px] lg:left-[7.85vw] lg:rotate-0 xl:hidden"></div> */}
      <button onClick={onClick} className="shadow-xl">
        <div
          className="fixed bg-purple-900 p-2 rotate-45 rounded left-1/2 bottom-[51px] transform -translate-x-1/2 z-20 border-b-8 border-r-8 border-[#f3f3f3] dark:border-[#1e1e22]
        min-[400px]:bottom-[57px] min-[400px]:p-3 lg:z-30 lg:rotate-0 lg:left-[7.8vw] lg:border-l-8 lg:border-t-8 xl:hidden"
        >
          <ImCross color="white" size={25} className="lg:rotate-45" />
        </div>
      </button>
    </>
  );
};

export default AddButton;
