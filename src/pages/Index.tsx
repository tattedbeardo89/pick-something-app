import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryButtons from "@/components/CategoryButtons";
import RecommendationCard from "@/components/RecommendationCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Category, Movie, TvShow, Book } from "@/types";
import { searchMovies, searchTvShows, searchBooks, getRandomItem } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [recommendation, setRecommendation] = useState<Movie | TvShow | Book | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
    setSelectedCategory(null);
    setRecommendation(null);
    setHasSearched(false);
  };

  const handleCategorySelect = async (category: Category) => {
    if (!keyword) {
      toast({
        title: "Enter a keyword first",
        description: "Please enter a keyword to search for recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSelectedCategory(category);
    setRecommendation(null);

    try {
      let result = null;

      switch (category) {
        case "movie":
          const movies = await searchMovies(keyword);
          result = getRandomItem<Movie>(movies);
          break;
        case "tv":
          const tvShows = await searchTvShows(keyword);
          result = getRandomItem<TvShow>(tvShows);
          break;
        case "book":
          const books = await searchBooks(keyword);
          result = getRandomItem<Book>(books);
          break;
        default:
          break;
      }

      if (result) {
        setRecommendation(result);
      } else {
        toast({
          title: "No results found",
          description: `We couldn't find any ${category} matching your keyword. Try a different search term.`,
          variant: "destructive",
        });
      }

      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-main text-white flex flex-col justify-between">
      <div className="container max-w-4xl mx-auto px-4 py-8 lg:py-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          What Should I Watch or Read?
        </h1>
        <p className="text-lg text-center text-white/80 mb-8 max-w-2xl">
          Enter a keyword to get a random movie, TV show, or book recommendation
        </p>
        
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <CategoryButtons
          onSelectCategory={handleCategorySelect}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          disabled={!keyword}
        />

        <div className="w-full flex flex-col items-center min-h-[200px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-white/80">Finding the perfect recommendation...</p>
            </div>
          ) : hasSearched && !recommendation ? (
            <div className="text-center p-8 bg-white/10 rounded-lg">
              <h3 className="text-xl mb-2">No results found</h3>
              <p className="text-white/80">Try a different keyword or category.</p>
            </div>
          ) : recommendation && selectedCategory ? (
            <>
              <div className="mb-6 flex justify-between w-full max-w-md">
                <h2 className="text-xl font-semibold">Your Recommendation</h2>
                <button
                  onClick={() => handleCategorySelect(selectedCategory)}
                  className="text-sm text-white/80 hover:text-white underline"
                >
                  Get Another
                </button>
              </div>
              <RecommendationCard item={recommendation} category={selectedCategory} />
            </>
          ) : (
            <div className="text-center p-8 bg-white/10 rounded-lg animate-pulse-light">
              <h3 className="text-xl mb-2">Ready to discover something new?</h3>
              <p className="text-white/80">
                Enter a keyword above and select a category to get started.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="w-full bg-black/80 text-white/60 text-sm py-4 text-center">
        <p>&copy; {new Date().getFullYear()} PickSomething.app. All rights reserved.</p>
        <p>Powered by TMDb and Google Books APIs</p>
      </footer>
    </div>
  );
};

export default Index;
