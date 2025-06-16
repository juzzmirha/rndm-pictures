import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageById } from "../../api/getPictures/getPictures";
import type { UnsplashPhoto } from "../../api/getPictures/getPictures";
import Navbar from '../../components/Navbar/navbar';
import './detail.css';
import { Heart, Download } from 'lucide-react';
import { usePictureStore } from "../../lib/store";
import { toast } from 'react-hot-toast';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const toggleFavorite = usePictureStore((state) => state.toggleFavorite);
  const isFavorite = usePictureStore((state) => state.isFavorite);
  const [photo, setPhoto] = useState<UnsplashPhoto | null>(null);
 
  useEffect(() => {
    if (id) {
      getImageById(id).then(setPhoto);
    }
  }, [id]);

  const handleDownload = async () => {
    if (!photo) return;
    try {
      const response = await fetch(photo.urls.full);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `unsplash-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
};

  if (!photo) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: 20 }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="detail">
      <Navbar />

      <div
        className="detail_background"
        style={{ backgroundImage: `url(${photo.urls.full})` }}
      />

      <div className="detail_content">
        <div className="detail_header">
          <div className="detail_user">
            <img
              src={photo.user.profile_image?.medium}
              alt={photo.user.name}
              className="detail_avatar"
            />
            <div className="detail_user_info">
              <div className="detail_user_name">{photo.user.name}</div>
              <div className="detail_user_tag">@{photo.user.username}</div>
            </div>
          </div>

          <div className="detail_actions">
            <button
              className="detail_like"
              onClick={() => {
                toggleFavorite(photo);
                toast.success("Фото добавлено в избранное!");
              }}
            >
              <Heart
                size={20}
                className="add_fv"
                color={isFavorite(photo.id) ? "red" : "white"}
              />
            </button>

            <button className="detail_download" onClick={handleDownload}>
              <Download size={18} /> Download
            </button>
          </div>
        </div>

        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          className="detail_main_img"
        />
      </div>
    </div>
  );
}
