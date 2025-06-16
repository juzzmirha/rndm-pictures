import './input.css';
import { useEffect, useState } from "react";
import { Search } from 'lucide-react';
import { fetchRandomImages, searchImages } from "../../api/getPictures/getPictures";

interface SearchInputProps {
  onSearchResult: (results: Awaited<ReturnType<typeof searchImages>>) => void;
}

export default function SearchInput({ onSearchResult }: SearchInputProps) {
  const [bgImage, setBgImage] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    fetchRandomImages().then((images) => {
      setBgImage(images[0]?.urls?.regular || "");
    });
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const results = await searchImages(query.trim());
    onSearchResult(results);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div
      className="navbar_bottom"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="search_container">
        <input
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Search className="search_icon" size={20} onClick={handleSearch} />
      </div>
    </div>
  );
}
