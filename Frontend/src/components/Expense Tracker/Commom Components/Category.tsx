import { useContext, useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { Categories } from "../../../hooks/useCategory";
import { ExpenseListData, listDataContext } from "../Expenses/ExpenseOverview";
import { listPageDataContext } from "../DetailsPage";

interface Props {
  onClick: (category: string) => void;
  onAddCategory: () => void;
  newCategory?: Categories;
}

const Category = ({ onClick, onAddCategory, newCategory }: Props) => {
  const expenseListData = useContext(listDataContext);
  const detailsPageData = useContext(listPageDataContext);

  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>();

  // Sets data from the Details page
  useEffect(() => {
    if (detailsPageData) {
      const uniqueDataMap = new Map<string, ExpenseListData>();

      detailsPageData.forEach((item) => {
        if (item) {
          // Check if the item is not null
          if (!uniqueDataMap.has(item.category)) {
            uniqueDataMap.set(item.category, {
              category: item.category,
              total: item.amount,
              budget: item.budget,
            });
          } else {
            const existingItem = uniqueDataMap.get(item.category)!;
            uniqueDataMap.set(item.category, {
              ...existingItem,
              total: existingItem.total + item.amount,
            });
          }
        }
      });

      setCategories(Array.from(uniqueDataMap.values()));
    }
  }, [detailsPageData]);

  // Sets data from the ExpenseOverview page
  useEffect(() => {
    setCategories([...(expenseListData || [])]);
  }, [expenseListData]);

  // Adds new categories
  useEffect(() => {
    // Checks if newCategory is not empty
    if (newCategory?.category) {
      setCategories([...categories, newCategory]);
    }
  }, [newCategory]);

  const handleClick = (index: number, category: string) => {
    // Checks click on add category
    if (category === "Add Category") {
      onAddCategory();
      return;
    }
    onClick(category);
    setSelectedCategory(index);
  };

  return (
    <div className="w-full mx-auto mt-6 grid grid-cols-2 min-[461px]:grid-cols-3 min-[650px]:grid-cols-4 min-[850px]:grid-cols-5 xl:grid-cols-4  gap-4">
      {categories.map((item, index) => (
        <div
          onClick={() => handleClick(index, item.category)}
          key={index}
          className={`bg-white px-2 flex flex-col gap-2 items-center justify-center rounded-lg py-3 w-full cursor-pointer dark:bg-[#21222b] ${
            selectedCategory === index
              ? "text-black border-2 border-black dark:text-gray-300 dark:border-gray-300"
              : "border-2 text-gray-500 dark:border-gray-600"
          }`}
        >
          <p>{item.category}</p>
        </div>
      ))}
      <div
        onClick={() => handleClick(categories.length, "Add Category")}
        className={`bg-white px-2 flex flex-col gap-2 items-center justify-center rounded-lg py-2 w-full cursor-pointer border-2 text-gray-500 dark:bg-[#21222b] dark:border-gray-600`}
      >
        <LuPlusCircle size={30} />
      </div>
    </div>
  );
};

export default Category;
