import axios from "axios";

export const createOrderUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getProductByCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const createCategories = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
});

export const deleteCategory = async (id, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${id}`, {
    headers: {
      authtoken,
    },
});


export const addMovie = async (details, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/add-movie`, details, {
    headers: {
      authtoken,
    },
});

export const getMovies = async () =>
  await axios.get(`${process.env.REACT_APP_API}/movies`);

export const getMoviesByType = async (type) =>
  await axios.post(`${process.env.REACT_APP_API}/movies`, type);

export const getMovie = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/movie/${id}`);

export const addMovieVideo = async (id, clips, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/add-video/${id}`, clips, {
    headers: {
      authtoken,
    }
  });

export const getMovieByCategory = async (id, type) =>
  await axios.post(`${process.env.REACT_APP_API}/movie/related/${id}`,type);

export const getMovieByDate = async (id) =>
  await axios.post(`${process.env.REACT_APP_API}/sort`);

export const getEpisode = async (id, details) =>
 await axios.post(`${process.env.REACT_APP_API}/episode/${id}`, details);

export const addEpisode = async (id, details, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/add-episode/${id}`, details, {
    headers: {
      authtoken,
    },
});

export const getRelatedEpisode = async (id, episodeId, type) =>
  await axios.post(`${process.env.REACT_APP_API}/episode/${id}/${episodeId}`, type);

export const getEpisodeDetails = async (id, type) =>
  await axios.post(`${process.env.REACT_APP_API}/episode-details/${id}`, type);

  

  


  

