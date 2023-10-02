const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getTrendingMedia = async (type) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMedia = async (type) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMedia = async (type) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTvorMoviesByGenre = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTvorMovieVideoDetailsById = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTvorMovieSearchResults = async (type, query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getTvorMovieDetailsById = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarTvorMovie = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};
export const getAllFavorites = async (uid, accountId) => {
  try {
    const res = await fetch(
      `/api/favorites/get-all-favorites?id=${uid}&accountId=${accoundId}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
};
