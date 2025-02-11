interface Props {
  onInput: (value: number) => void;
  errorMessage?: string;
}

const Amount = ({ onInput, errorMessage }: Props) => {
  return (
    <div className="input-containers w-[95%] mx-auto mb-1 border-b-2 border-b-black pt-7 max-w-3xl">
      <div className="flex items-baseline gap-3">
        <label htmlFor="amount" className="labels mr-0">
          Amount
        </label>
        {errorMessage && (
          <p className="text-red-600 text-[0.875rem] ">{errorMessage}</p>
        )}
      </div>

      <div className="flex items-center justify-between pb-2 px-[5%] rounded mt-2 w-full mx-auto dark:bg-[#1e1e22]">
        <input
          onChange={(e) => {
            onInput(parseInt(e.target.value));
            // setExpenses({ ...expenses, amount: parseInt(e.target.value) })
          }}
          min={0}
          id="amount"
          placeholder="00.00"
          type="number"
          className="px-3 py-4 text-3xl font-semibold w-[87%] focus:outline-none font-roboto bg-transparent dark:text-white"
        />
        <span className="text-xl mt-6 font-medium font-sans text-gray-500 dark:text-white">
          INR
        </span>
      </div>
    </div>
  );
};

export default Amount;
