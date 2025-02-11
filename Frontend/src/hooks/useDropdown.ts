import { useState } from "react";

const useDropdown = (current?: boolean) => {
  const [isOpen, setIsOpen] = useState(current || false);
  return { isOpen, setIsOpen };
};

export default useDropdown;
