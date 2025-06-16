import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  likes: number;
  links: {
    download: string;
  };
}

export const fetchRandomImages = async (): Promise<UnsplashPhoto[]> => {
  const res = await unsplashApi.get<UnsplashPhoto[]>("/photos/random", {
    params: { count: 9 },
  });
  console.log(res.data)
  return res.data;
};

export const getImageById = async (id: string): Promise<UnsplashPhoto> => {
  const res = await unsplashApi.get<UnsplashPhoto>(`/photos/${id}`);
  return res.data;
};

export const searchImages = async (
  query: string
): Promise<UnsplashPhoto[]> => {
  const res = await unsplashApi.get<{ results: UnsplashPhoto[] }>(
    "/search/photos",
    {
      params: {
        query,
        per_page: 20,
      },
    }
  );
  return res.data.results;
};
