const Skeleton = () => {
  return (
    <div className="w-[95%] mx-auto rounded-xl overflow-hidden h-24 bg-zinc-400 dark:bg-zinc-700 py-3 px-4">
      <div className="h-6 bg-zinc-300 dark:bg-zinc-500 mb-4 mt-1 rounded-xl"></div>
      <div className="h-4 w-4/5 bg-zinc-300 dark:bg-zinc-500 rounded-xl"></div>
    </div>
  );
};

export default Skeleton;
