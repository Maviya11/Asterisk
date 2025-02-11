import { useState } from "react";

const useIncrement = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  return { isDisabled, setIsDisabled };
};

export default useIncrement;
