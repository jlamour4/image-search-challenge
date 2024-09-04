import axios from 'axios';

export const fetchImages = async (query: string) => {
  try {
    const response = await axios.get('https://api.imgur.com/3/gallery/search', {
      headers: { Authorization: `Client-ID b067d5cb828ec5a` },
      params: { q: query },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};