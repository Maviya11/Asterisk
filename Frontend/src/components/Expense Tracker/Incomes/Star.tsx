import { useState } from "react";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";

const Star = () => {
  const [isStarred, setIsStarred] = useState(false);

  return isStarred ? (
    <GoStarFill color="gold" onClick={() => setIsStarred(false)} />
  ) : (
    <GoStar className="dark:text-white" onClick={() => setIsStarred(true)} />
  );
};

export default Star;
