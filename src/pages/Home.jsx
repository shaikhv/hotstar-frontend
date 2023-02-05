import React, { useEffect, useState } from "react";
import SliderContainer from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import ListingSlider from "../components/Slider/ListingSlider";
import { getMovies, getMovieByDate, getMoviesByType } from "../constants/urls";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container } from "reactstrap";

const titles = {
  movie: "Movies",
  episode: "Episodes",
  isSortedList: "Recently Added",
};

const Home = () => {
  const [isMovieList, setMovieList] = useState([]);
  const [isEpisodeMovieList, setEpisodeMovieList] = useState({
    isSortedList: [],
    movie: [],
    episode: [],
  });

  useEffect(() => {
    getSliderList();
    movieSortDate();
    getMovieList("movie");
    getMovieList("episode");
  }, []);

  const getSliderList = () => {
    getMovies()
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const movieSortDate = () => {
    getMovieByDate()
      .then(({ data }) => {
        setEpisodeMovieList((prevState) => ({
          ...prevState,
          isSortedList: data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMovieList = (type) => {
    getMoviesByType({ type })
      .then(({ data }) => {
        setEpisodeMovieList((prevState) => ({
          ...prevState,
          [type]: data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SliderContainer isMovieList={isMovieList} />
      <Categories />
      {Object.keys(isEpisodeMovieList).map((key, i) => {
        if (!isEpisodeMovieList?.[key]?.length) {
          return (
            <Container fluid key={`loader${i}`} className="my-4 mx-3 mx-md-5">
              <SkeletonTheme color="#182235" highlightColor="#26324e">
                <Skeleton className="mx-0 mx-md-3" count={1} height={228} />
              </SkeletonTheme>
            </Container>
          );
        }
        return (
          <ListingSlider
            key={titles[key]}
            isMovieList={isEpisodeMovieList[key]}
            title={titles[key]}
          />
        );
      })}
    </>
  );
};

export default Home;
