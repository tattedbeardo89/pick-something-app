
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full max-w-md space-x-2 mb-6"
    >
      <Input
        type="text"
        placeholder="Enter a keyword (e.g. sci-fi, thriller)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-theme-purple"
        required
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        variant="secondary" 
        disabled={isLoading || !keyword.trim()}
        className="bg-white/20 hover:bg-white/30 text-white"
      >
        <Search size={18} className="mr-1" /> Search
      </Button>
    </form>
  );
};

export default SearchBar;
