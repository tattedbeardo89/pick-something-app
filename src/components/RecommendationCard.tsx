
import React from "react";
import { Movie, TvShow, Book, Category } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart, Video } from "lucide-react";

interface RecommendationCardProps {
  item: Movie | TvShow | Book;
  category: Category;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, category }) => {
  // Helper function to determine if the item is a movie
  const isMovie = (item: any): item is Movie => {
    return 'title' in item && 'release_date' in item;
  };

  // Helper function to determine if the item is a TV show
  const isTvShow = (item: any): item is TvShow => {
    return 'name' in item && 'first_air_date' in item;
  };

  // Helper function to determine if the item is a book
  const isBook = (item: any): item is Book => {
    return 'authors' in item && 'infoLink' in item;
  };

  // Get the appropriate image URL based on item type
  const getImageUrl = () => {
    if (isMovie(item) || isTvShow(item)) {
      const path = isMovie(item) ? item.poster_path : item.poster_path;
      return path
        ? `https://image.tmdb.org/t/p/w500${path}`
        : "https://via.placeholder.com/500x750?text=No+Image+Available";
    } else if (isBook(item) && item.imageLinks?.thumbnail) {
      return item.imageLinks.thumbnail.replace('http:', 'https:');
    }
    return "https://via.placeholder.com/500x750?text=No+Image+Available";
  };

  // Get the appropriate title based on item type
  const getTitle = () => {
    if (isMovie(item)) return item.title;
    if (isTvShow(item)) return item.name;
    if (isBook(item)) return item.title;
    return "Unknown Title";
  };

  // Get the appropriate description based on item type
  const getDescription = () => {
    if (isMovie(item) || isTvShow(item)) {
      return item.overview || "No description available.";
    }
    if (isBook(item)) {
      return item.description || "No description available.";
    }
    return "No description available.";
  };

  // Get the appropriate link based on item type
  const getLink = () => {
    if (isMovie(item)) {
      return `https://www.themoviedb.org/movie/${item.id}`;
    }
    if (isTvShow(item)) {
      return `https://www.themoviedb.org/tv/${item.id}`;
    }
    if (isBook(item)) {
      return item.infoLink;
    }
    return "#";
  };

  // Get Amazon affiliate link for books
  const getAmazonLink = () => {
    if (isBook(item)) {
      // Replace YOUR_AFFILIATE_ID with your actual Amazon affiliate ID in production
      const affiliateId = "picksomethi0a-20";
      const searchQuery = encodeURIComponent(`${item.title} ${item.authors.join(' ')}`);
      return `https://www.amazon.com/s?k=${searchQuery}&tag=${affiliateId}`;
    }
    return "";
  };

  // Get "Where to Watch" link for movies and TV shows
  const getWhereToWatchLink = () => {
    if (isMovie(item)) {
      return `https://www.justwatch.com/us/search?q=${encodeURIComponent(item.title)}`;
    }
    if (isTvShow(item)) {
      return `https://www.justwatch.com/us/search?q=${encodeURIComponent(item.name)}`;
    }
    return "";
  };

  // Get additional details based on item type
  const getDetails = () => {
    if (isMovie(item)) {
      return (
        <>
          <p>Released: {item.release_date ? new Date(item.release_date).getFullYear() : 'Unknown'}</p>
          <p>Rating: {item.vote_average ? `${item.vote_average.toFixed(1)}/10` : 'N/A'}</p>
        </>
      );
    }
    if (isTvShow(item)) {
      return (
        <>
          <p>First aired: {item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'Unknown'}</p>
          <p>Rating: {item.vote_average ? `${item.vote_average.toFixed(1)}/10` : 'N/A'}</p>
        </>
      );
    }
    if (isBook(item)) {
      return (
        <>
          <p>Authors: {item.authors?.join(', ') || 'Unknown'}</p>
          <p>Published: {item.publishedDate ? new Date(item.publishedDate).getFullYear() : 'Unknown'}</p>
        </>
      );
    }
    return null;
  };

  // Choose color based on category
  const getCategoryColor = () => {
    switch (category) {
      case 'movie':
        return 'from-theme-movie/50 to-theme-movie/20';
      case 'tv':
        return 'from-theme-tv/50 to-theme-tv/20';
      case 'book':
        return 'from-theme-book/50 to-theme-book/20';
      default:
        return 'from-primary/50 to-primary/20';
    }
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className={`w-full max-w-md bg-gradient-to-b ${getCategoryColor()} border-white/10 text-white shadow-lg animate-fade-in`}>
      <div className="grid grid-cols-3 gap-4">
        <CardHeader className="col-span-3 sm:col-span-1 p-4">
          <div className="w-full h-[200px] sm:h-[280px] rounded-md overflow-hidden">
            <img
              src={getImageUrl()}
              alt={getTitle()}
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>
        
        <div className="col-span-3 sm:col-span-2">
          <CardContent className="p-4 pt-0 sm:pt-4">
            <CardTitle className="text-xl mb-2 text-white">{getTitle()}</CardTitle>
            <div className="text-sm text-white/70 mb-3">
              {getDetails()}
            </div>
            <CardDescription className="text-white/80 line-clamp-4">
              {truncateDescription(getDescription())}
            </CardDescription>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex flex-col gap-2">
            <Button
              className="mt-2 bg-white/20 hover:bg-white/30 text-white w-full"
              asChild
            >
              <a href={getLink()} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                View Details
              </a>
            </Button>
            
            {isBook(item) && (
              <Button
                className="bg-amber-600/80 hover:bg-amber-600 text-white w-full"
                asChild
              >
                <a href={getAmazonLink()} target="_blank" rel="noopener noreferrer">
                  <ShoppingCart size={16} className="mr-2" />
                  Buy on Amazon
                </a>
              </Button>
            )}
            
            {(isMovie(item) || isTvShow(item)) && (
              <Button
                className="bg-blue-600/80 hover:bg-blue-600 text-white w-full"
                asChild
              >
                <a href={getWhereToWatchLink()} target="_blank" rel="noopener noreferrer">
                  <Video size={16} className="mr-2" />
                  Where to Watch
                </a>
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
