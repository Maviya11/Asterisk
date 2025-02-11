interface Props {
  mainChore: string;
  choreDes: string | null;
}
const Commitment = ({mainChore, choreDes}: Props) => {
  return (
    <>
      <p className="text-black font-medium dark:font-normal dark:text-white">{mainChore}</p>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {choreDes}
      </span>
    </>
  );
};

export default Commitment;
