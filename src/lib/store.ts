import { create } from 'zustand';
import { fetchRandomImages, getImageById, type UnsplashPhoto } from '../api/getPictures/getPictures';

interface PictureStore {
  bgImage: string;
  images: UnsplashPhoto[];
  selectedPhoto: UnsplashPhoto | null;

  favorites: UnsplashPhoto[];

  fetchImages: () => Promise<void>;
  fetchPhotoById: (id: string) => Promise<void>;

  toggleFavorite: (photo: UnsplashPhoto) => void;
  isFavorite: (id: string) => boolean;
}

export const usePictureStore = create<PictureStore>((set, get) => ({
  bgImage: '',
  images: [],
  selectedPhoto: null,
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  fetchImages: async () => {
    const images = await fetchRandomImages();
    set({
      images,
      bgImage: images[0]?.urls?.regular || '',
    });
  },

  fetchPhotoById: async (id: string) => {
    const photo = await getImageById(id);
    set({ selectedPhoto: photo });
  },

  toggleFavorite: (photo) => {
    const { favorites } = get();
    const exists = favorites.find((f) => f.id === photo.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== photo.id)
      : [...favorites, photo];

    set({ favorites: updated });
    localStorage.setItem('favorites', JSON.stringify(updated));
  },

  isFavorite: (id) => {
    return get().favorites.some((f) => f.id === id);
  },
}));
