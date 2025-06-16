import './home.css'
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import { fetchRandomImages } from "../../api/getPictures/getPictures";
import type { UnsplashPhoto } from "../../api/getPictures/getPictures";
import { useNavigate } from "react-router-dom";
import SearchInput from '../../components/SearchInput/search-input';

export default function Home() {
    const [images, setImages] = useState<UnsplashPhoto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomImages().then(setImages);
    }, []);
    
    return (
        <div>
            <Navbar/>
            <SearchInput onSearchResult={setImages}/>
            <div className="gallery">
                {images.map((img) => (
                    <img
                        onClick={() => navigate(`/photo/${img.id}`)}
                        key={img.id}
                        src={img.urls.small}
                        alt={img.alt_description}
                        className="gallery__item"
                    />
                ))}
            </div>
        </div>
    )
}