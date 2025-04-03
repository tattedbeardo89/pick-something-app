import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onSearch(e.target.value.trim());
  };

  return (
    <div className="flex w-full max-w-md space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Enter a keyword (e.g. sci-fi, thriller)"
        value={keyword}
        onChange={handleChange}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-theme-purple"
        disabled={isLoading}
      />
    </div>
  );
};

export default SearchBar;
