import { PiStarFourFill } from "react-icons/pi";

interface Props {
  name: string;
  stars: number;
  state: boolean;
  onClick: (key: number) => void;
}

const ResetTime = ({ name, stars, onClick, state }: Props) => {
  const noOfStars = [];

  for (let i = 0; i <= stars; i++) {
    noOfStars.push(i);
  }

  return (
    <>
      <div
        onClick={() => onClick(stars)}
        className={`${
          state ? "bg-[#D264B6] text-white dark:bg-purple-900 border-transparent" : "border-[#D264B6] dark:border-purple-900"
        } py-[7px] px-4 w-[20%] flex flex-col items-center gap-2 rounded cursor-pointer transition-colors duration-200 border-2 dark:text-white box-content`}
      >
        <span className="">{name}</span>
        <div className="flex gap-1">
          {noOfStars.map((_, index) => {
            return <PiStarFourFill key={index} className="" />;
          })}
        </div>
      </div>
    </>
  );
};

export default ResetTime;
