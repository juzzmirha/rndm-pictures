import Navbar from '../../components/Navbar/navbar'
import './favourite.css'
import { usePictureStore } from '../../lib/store'
import { useNavigate } from 'react-router-dom'

export default function FavouritePage() {
    const { favorites } = usePictureStore();
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>
            <h1 className='favourite_h1'>Избранное</h1>
            <div className="gallery">
                {favorites.map((img) => (
                    <img
                        key={img.id}
                        src={img.urls.small}
                        alt={img.alt_description}
                        className="gallery__item"
                        onClick={() => navigate(`/photo/${img.id}`)}
                    />
                ))}
            </div>
        </div>
    )
}