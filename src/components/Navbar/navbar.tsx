import "./navbar.css"
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="navbar_top">
                <div className="navbar_logo" onClick={() => navigate('/')}>
                    ART GALLERY
                </div>
                <div>
                    <button className="fv_btn" onClick={() => navigate('/favourite')}>
                        <Heart className="btn_icon" /> Избранное
                    </button>
                </div>
            </div>
        </div>
    )
}