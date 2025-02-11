interface Props {
  render: string;
  totalexpense: number;
}

const Total = ({ render, totalexpense }: Props) => {
  return (
    <div className="min-[900px]:grid min-[900px]:grid-cols-2 gap-3 px-6 xl:grid-cols-1 min-[1450px]:grid-cols-2">
      <div className="max-w-lg bg-[#0f0f0f] text-white mx-auto rounded-2xl px-6 py-4 min-[900px]:mx-0 xl:mx-auto xl:w-full min-[1450px]:mr-auto">
        <p className="text-gray-400">Overall {render}</p>
        <div className="flex justify-between items-center mt-2 gap-6">
          <div className="flex gap-3 items-center">
            <span className="text-xl">&#8377;</span>
            <p className="text-3xl font-roboto">{totalexpense}</p>
          </div>
          <p className="text-gray-400 text-lg">INR</p>
        </div>
      </div>
    </div>
  );
};

export default Total;
