import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import styles from "./Movie.module.scss";
import {
  getMovie,
  getMovieByCategory,
  addEpisode,
  getEpisode,
  getRelatedEpisode,
  getEpisodeDetails,
} from "../../constants/urls";
import { get } from "lodash";
import ListingSlider from "../../components/Slider/ListingSlider";
import { useSelector } from "react-redux";
import AddVideo from "../../components/Movie/AddVideo";
import ClipsSlider from "../../components/Slider/ClipsSlider";
import VideoPlayerContainer from "../../components/VideoPlayerContainer/VideoPlayerContainer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Subscribe from "../SubScribe";

const MovieDetails = ({ setLoginModal }) => {
  const history = useHistory();
  const [isMovie, setMovie] = useState({});
  const { movieId, episodeId } = useParams();
  const { user } = useSelector((state) => state);
  const [isMovieList, setMovieList] = useState();
  const [watchMovie, setWatchMovie] = useState(false);
  const [isAddClipOpen, setAddClipOpen] = useState(false);
  const [isEpisodeDetails, setIsEpisodeDetails] = useState(false);
  const [isEpisodeList, setEpisodeList] = useState();
  const [isTrailerList, setTrailerList] = useState();
  const [isEpisodeType, setEpisodeType] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState(true);

  useEffect(() => {
    if(watchMovie){
      if (user && user.role === "admin") {
        setSubscriber(true);
      }else{
        setSubscriber(false);
      }
    }
  }, [user, watchMovie]);

  const onEpisodeSubmit = (episodes) => {
    setLoading(true);
    addEpisode(
      movieId,
      { clips: episodes.clips, isType: isEpisodeType },
      user.token
    )
      .then((res) => {
        console.log(res.data);
        setAddClipOpen(false);
        loadEpisodes();
        loadTrailerClips();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (episodeId) {
      loadRelatedEpisodes();
      loadRelatedTrailers();
      loadEpisodeDetails(episodeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId, movieId]);

  const loadRelatedEpisodes = () => {
    setLoading(true);
    getRelatedEpisode(movieId, episodeId, { isType: "episode" }).then((res) => {
      console.log("res.data", res.data);
      setEpisodeList(res.data);
      setLoading(false);
    });
  };

  const loadRelatedTrailers = () => {
    setLoading(true);
    getRelatedEpisode(movieId, episodeId).then((res) => {
      console.log("res.data", res.data);
      setTrailerList(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadEpisodes();
    loadTrailerClips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId, movieId]);

  const loadEpisodeDetails = (id) => {
    getEpisodeDetails(id, { isType: isEpisodeType })
      .then((res) => {
        console.log(res.data);
        setIsEpisodeDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadEpisodes = () => {
    setLoading(true);
    getEpisode(movieId, { isType: "episode" })
      .then((res) => {
        console.log(res.data);
        setEpisodeList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTrailerClips = () => {
    setLoading(true);
    getEpisode(movieId, { isType: "trailer" })
      .then((res) => {
        console.log("trailes,trailes", res);
        setTrailerList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("traileserr,traileserr", err);
      });
  };

  useEffect(() => {
    if (movieId) {
      loadMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const loadMovie = () => {
    setLoading(true);
    getMovie(movieId)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <i
        className={`${styles.sliderIcon} ${styles.sliderRight} fas fa-chevron-right`}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <i
        className={`${styles.sliderIcon} ${styles.sliderLeft} fas fa-chevron-left`}
        onClick={onClick}
      />
    );
  };

  const openLogin = () => {
    setLoginModal(true)
  }

  const settings = {
    className: `center ${styles.sliderContainer}`,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    setLoading(true);
    if (isMovie && isMovie._id) {
      getMovieByCategory(isMovie._id, {type:isMovie.movieType})
        .then((res) => {
          setMovieList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isMovie]);

  const addClipsEpisodeModal = (type) => {
    setEpisodeType(type);
    setAddClipOpen(!isAddClipOpen);
  };

  const playVideo = (id, type) => {
    console.log("playVideo", id);
    setEpisodeType(type);
    if (id) {
      history.push(`/movie-details/${movieId}/${id}`);
    }
    setWatchMovie(true);
    window.scrollTo(0, 0);
  };

  return !subscriber ? (
    <Subscribe movie={isMovie} setLoginModal={openLogin}/>
  ) : (
    <>
      {loading ? (
        <Container fluid className="px-5">
          <SkeletonTheme color="#182235" highlightColor="#26324e">
            <Skeleton count={1} height={400} />
          </SkeletonTheme>
        </Container>
      ) : (
        <>
          {watchMovie ? (
            <>
              {isMovie.movieType === "movie" && !episodeId ? (
                <VideoPlayerContainer clips={isMovie} />
              ) : (
                isEpisodeDetails && (
                  <VideoPlayerContainer clips={isEpisodeDetails} />
                )
              )}
            </>
          ) : (
            <Container fluid>
              {isMovie && (
                <div
                  key={isMovie._id}
                  className={`${styles.mastheadCard} mx-1 mx-md-3 w-auto position-relative d-flex align-items-center justify-content-between`}
                >
                  <div className={`${styles.mastheadData}`}>
                    <div className="slider-caption non-subs-caption">
                      <Container>
                        <div className="content-holder pl-0 pl-md-5">
                          <h3 className="title ellipsize text-white d-none d-md-block">
                            {isMovie.title}
                          </h3>
                          <div className="toptitle my-3 text-primary d-none d-md-block">
                            {isMovie.category &&
                              isMovie.category.length !== 0 &&
                              isMovie.category.map((category) => {
                                return (
                                  <span
                                    key={category._id}
                                    className="meta-data"
                                  >
                                    {category.name}
                                  </span>
                                );
                              })}
                          </div>
                          <p className="description d-none d-md-block">{isMovie.description}</p>
                          {get(isMovie, "videoFiles", []).length !== 0 ||
                          (isEpisodeList && isEpisodeList.length !== 0) ? (
                            <div
                              className="d-flex align-items-center mt-5 cursor-pointer"
                              onClick={() =>
                                playVideo(
                                  isMovie.movieType !== "movie"
                                    ? isEpisodeList[0]._id
                                    : "",
                                  isMovie.movieType !== "movie" ? "episode" : ""
                                )
                              }
                            >
                              <i className="fas fa-play mr-3 font-size-24" />
                              <h4 className="mb-0">Watch Movie</h4>
                            </div>
                          ) : null}
                        </div>
                      </Container>
                    </div>
                  </div>
                  <div className={`${styles.imageHolder} position-relative`}>
                    <div className={`${styles.imageGradient}`}></div>
                    <div className="imageloader loaded">
                      <img
                        src={isMovie.imageSliderPoster}
                        alt={isMovie.slug}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              )}
            </Container>
          )}
        </>
      )}
      {isMovie.movieType !== "movie" && (
        <>
          {isEpisodeList && !loading ? (
            <ClipsSlider
              movie={isEpisodeList}
              setEpisodeType={() => setEpisodeType("episode")}
              addClipsEpisodeModal={() => addClipsEpisodeModal("episode")}
              label="Episodes"
              episodes
              movieId={movieId}
              setWatchMovie={setWatchMovie}
              playVideo={playVideo}
            />
          ) : (
            <Container fluid className="px-5 my-5">
              <SkeletonTheme color="#182235" highlightColor="#26324e">
                <Skeleton count={1} height={128} />
              </SkeletonTheme>
            </Container>
          )}
        </>
      )}
      {isEpisodeList && !loading ? (
        <ClipsSlider
          movie={isTrailerList}
          setEpisodeType={() => setEpisodeType("")}
          addClipsEpisodeModal={() => addClipsEpisodeModal("")}
          label="Trailers & Extras"
          movieId={movieId}
          setWatchMovie={setWatchMovie}
          playVideo={playVideo}
        />
      ) : (
        <Container fluid className="px-5 my-5">
          <SkeletonTheme color="#182235" highlightColor="#26324e">
            <Skeleton count={1} height={128} />
          </SkeletonTheme>
        </Container>
      )}
      {isMovieList && isMovieList.length !== 0 && !loading ? (
        <ListingSlider isMovieList={isMovieList} />
      ) : (
        <Container fluid className="px-5 mt-5">
          <SkeletonTheme color="#182235" highlightColor="#26324e">
            <Skeleton count={1} height={228} />
          </SkeletonTheme>
        </Container>
      )}
      {isAddClipOpen && (
        <AddVideo
          show={isAddClipOpen}
          token={user.token}
          onSubmit={onEpisodeSubmit}
          close={() => setAddClipOpen(!isAddClipOpen)}
        />
      )}
    </>
  );
};

export default MovieDetails;
