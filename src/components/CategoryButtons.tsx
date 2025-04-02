
import React from "react";
import { Button } from "@/components/ui/button";
import { Film, Tv, Book } from "lucide-react";
import { Category } from "@/types";
import LoadingSpinner from "./LoadingSpinner";

interface CategoryButtonsProps {
  onSelectCategory: (category: Category) => void;
  isLoading: boolean;
  selectedCategory: Category | null;
  disabled: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  onSelectCategory,
  isLoading,
  selectedCategory,
  disabled
}) => {
  const categories: { name: Category; icon: React.ReactNode; color: string }[] = [
    { name: "movie", icon: <Film size={20} />, color: "bg-theme-movie" },
    { name: "tv", icon: <Tv size={20} />, color: "bg-theme-tv" },
    { name: "book", icon: <Book size={20} />, color: "bg-theme-book" }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
      {categories.map(({ name, icon, color }) => (
        <Button
          key={name}
          className={`flex-1 ${color} text-white font-medium transition-all ${
            selectedCategory === name ? "ring-2 ring-white scale-105" : ""
          }`}
          onClick={() => onSelectCategory(name)}
          disabled={disabled || isLoading}
        >
          {isLoading && selectedCategory === name ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              {icon}
              <span className="ml-2 capitalize">{name}</span>
            </>
          )}
        </Button>
      ))}
    </div>
  );
};

export default CategoryButtons;
