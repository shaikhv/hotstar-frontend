import React, { useEffect, useState } from 'react'
import SliderContainer from '../components/Slider/Slider';
import Categories from '../components/Categories/Categories';
import ListingSlider from '../components/Slider/ListingSlider';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, getMovies, getMovieByDate, getMoviesByType } from "../constants/urls";

function Home() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)
  const [isMovieList, setMovieList] = useState([]);
  const [isSortList, setSortList] = useState([]);
  const [isAllMovieList, setAllMovieList] = useState([]);
  const [isEpisodeList, setEpisodeList] = useState([]);

  console.log(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenId = await user.getIdTokenResult();
        currentUser(tokenId.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: tokenId.token
              }
            })
          })
          .catch((err) => console.log("Error", err))
      }
    })
    return () => unsubscribe();
  }, [dispatch])

  useEffect(() => {
    getMovies().then(res => {
      console.log(res)
      setMovieList(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    movieSortDate()
    getMovieList()
    getEpisodeList()
  },[])

  const movieSortDate = () => {
    getMovieByDate().then(res => {
      setSortList(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const getMovieList = () => {
    getMoviesByType({ type: 'movie' }).then(res => {
      setAllMovieList(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const getEpisodeList = () => {
    getMoviesByType({ type: 'episode' }).then(res => {
      setEpisodeList(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
    <SliderContainer isMovieList={isMovieList}/>
    <Categories />
    <ListingSlider isMovieList={isSortList} title="Recommended For You"/>
    <ListingSlider isMovieList={isAllMovieList} title="Movies"/>
    <ListingSlider isMovieList={isEpisodeList} title="Episodes"/>
    </>
  );
}

export default Home;
