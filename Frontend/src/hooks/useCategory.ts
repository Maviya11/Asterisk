import { useState } from "react";

export type Categories = {
  category: string;
  // icon: IconType | string;
};

export const useCategory = () => {
  const [newCategory, setNewCategory] = useState<Categories>({
    category: "",
    // icon: "",
  });

  return { newCategory, setNewCategory };
};
