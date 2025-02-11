import { useEffect, useState } from "react";
import { IoIosFastforward } from "react-icons/io";

interface Props {
  minusCount: number | null;
  plusCount: number | null;
}

const Count = ({plusCount, minusCount}: Props) => {
  const [toRender, setToRender] = useState(false);

  useEffect((): void => {
    if (plusCount || minusCount) {
      setToRender(true);
    } else {
      setToRender(false);
    }
  }, [plusCount, minusCount]);

  return (
    <>
      {toRender && (
        <div className="ml-auto w-max text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <IoIosFastforward />
          {plusCount ? <span>+{plusCount}</span> : null}
          <span>{plusCount && minusCount ? "|" : ""}</span>
          {minusCount ? <span>-{minusCount}</span> : null}
        </div>
      )}
    </>
  );
};

export default Count;
