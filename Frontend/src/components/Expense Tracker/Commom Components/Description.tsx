interface Props {
  onInput: (value: string) => void;
  errorMesssage: string;
}

const Description = ({ onInput, errorMesssage }: Props) => {
  return (
    <div className="input-containers w-[95%] mx-auto relative mt-7 max-w-3xl">
      <div className="flex items-baseline">
        <label htmlFor="des" className="labels mr-2">
          <span>Expense made for</span>
        </label>
        {errorMesssage && (
          <p className="text-red-600 text-[0.875rem] mr-auto">{errorMesssage}</p>
        )}
      </div>
      <input
        onChange={
          (e) => onInput(e.target.value)
          // setExpenses({ ...expenses, description: e.target.value })
        }
        maxLength={100}
        name=""
        id="des"
        placeholder="Add a note..."
        className="border w-full mx-auto mt-3 min-h-[50px] text-xl border-gray-500 rounded-lg focus:outline-none p-3 dark:border-white dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default Description;
