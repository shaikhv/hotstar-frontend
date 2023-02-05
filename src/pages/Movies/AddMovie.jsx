import React, { useState, useEffect } from "react";
import Select from "react-select";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import { useSelector } from "react-redux";
import { addMovie, getCategories, getMovies } from "../../constants/urls";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router";
import styles from "./Movie.module.scss";

const defaultValues = {
  title: "",
  description: "",
  category: [],
  imagePoster: "",
  imageSliderPoster: "",
  movieType: "movie",
  videoFiles: [],
  ratings: "",
};

function AddMovie() {
  const history = useHistory();
  const [allListSlide, setAllListSlide] = useState([]);
  const [initialState, setInitialState] = useState(defaultValues);
  const [categories, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadingState, setLoadingState] = useState("");
  const { user } = useSelector((state) => state);
  const [ isAdmin, setAdmin ] = useState(false)

  useEffect(() => {
    if(user && user.role === 'admin'){
      setAdmin(true)
    }
  },[user])

  useEffect(() => {
    loadCategories();
    loadMovie();
  }, []);

  const loadMovie = () => {
    getMovies()
      .then((res) => {
        setAllListSlide(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = initialState;
    selectedCategories.map((c) => data.category.push(c));
    addMovie({ details: data }, user.token)
      .then((res) => {
        loadCategories();
        console.log(res);
        history.push(`/movie-details/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const files = e.target.files;
    let resizedImages = {};
    setLoadingState(e.target.name);
    if (files) {
      if (files[0].type === "image/jpeg") {
        Resizer.imageFileResizer(
          files[0],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                resizedImages = res.data;
                setInitialState((prevState) => {
                  return { ...prevState, [e.target.name]: resizedImages.url };
                });
                setLoadingState("");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          axios
            .post(
              `${process.env.REACT_APP_API}/upload-video`,
              { video: reader.result },
              {
                headers: {
                  authtoken: user ? user.token : "",
                },
              }
            )
            .then((res) => {
              resizedImages = res.data;
              setInitialState((prevState) => {
                return { ...prevState, [e.target.name]: res.data.url };
              });
              setLoadingState("");
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
    } else {
      const name = e.target.value;
      setInitialState((prevState) => {
        return { ...prevState, [e.target.name]: name };
      });
    }
  };

  const handleCategoryChange = (options) => {
    setSelectedCategories(options);
  };

  const redirectToDetails = (id) => {
    history.push(`/movie-details/${id}`);
  };

  return (
    <>
      <Container fluid className="my-4 px-3 px-md-5">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={isAdmin ? 8 : 12}>
              <h2 className="text-white mb-0" style={{ fontSize: "1.3rem" }}>
                Movies
              </h2>
              <Row>
                {allListSlide.map((movie) => {
                  const { _id, title, imagePoster, category, description } = movie;
                  return (
                    <Col
                      md={isAdmin ? 3 : 2}
                      key={_id}
                      className="vertical p-3"
                      onClick={() => redirectToDetails(_id)}
                    >
                      <article
                        className={`${styles.listingArticle} ripple movie-card vertical`}
                      >
                        <div className="thumbnail-container">
                          <div className="card-img-container">
                            <img
                              src={imagePoster}
                              className="img-loader lazy-img-loader loaded w-100 rounded-lg"
                              loading="lazy"
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          className={`${styles.overlapDetails} details d-flex align-items-end text-white p-3`}
                        >
                          <div>
                            <div className="content-play">
                              <span className="content-title ellipsise mb-2">
                                {title}
                              </span>
                            </div>
                            <div
                              className="sub-info"
                              style={{ fontSize: ".7rem" }}
                            >
                              <div className="dur show-gradient d-inline-block">
                                6 min
                              </div>
                              ,
                              <span className="subtitle">
                                {category.map(
                                  (category) => category.name
                                )}
                              </span>
                            </div>
                            <div
                              className="description ellipsize mb-2"
                              style={{ fontSize: "12px" }}
                            >
                              {description.length > 35
                                ? `${description.substring(0, 35)}...`
                                : ""}
                            </div>
                            <div
                              className={`${styles.actionBtn} action play-action px-2 py-1`}
                              style={{ fontSize: "0.7rem" }}
                              role="none"
                            >
                              <div className="title">
                                <i className="fas fa-play mr-2" /> Watch movie
                              </div>
                            </div>
                            <div
                              className={`${styles.actionBtn} action watchlist-action px-2 py-1`}
                              style={{ fontSize: "0.7rem" }}
                            >
                              <div className="title">
                                <i className="fas fa-plus mr-2" /> Add to
                                Watchlist
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Col>
                  );
                })}
              </Row>
            </Col>
            {isAdmin && (
            <Col md={4}>
              <Row>
                <Col md={12}>
                  <div className="form-group mb-4 border-bottom-0">
                    <label className="text-white d-block">Movie Type</label>
                    <Button
                      active={initialState.movieType === "movie"}
                      onClick={() =>
                        setInitialState({ ...initialState, movieType: "movie" })
                      }
                      color="primary"
                      outline
                      className="py-4 px-5 mr-3 text-white"
                    >
                      <i className="fas fa-film mr-2" />
                      Movie
                    </Button>
                    <Button
                      active={initialState.movieType !== "movie"}
                      className="py-4 px-5 text-white"
                      outline
                      color="primary"
                      onClick={() =>
                        setInitialState({
                          ...initialState,
                          movieType: "episode",
                        })
                      }
                    >
                      <i className="fas fa-tv mr-2" />
                      Tv Series
                    </Button>
                  </div>
                </Col>
                {initialState.movieType === "movie" && (
                  <Col md={12}>
                    <div className="form-group border-bottom-0">
                      <label className="text-white">Upload</label>
                      {loadingState === "videoFiles" ? (
                        <SkeletonTheme color="#182235" highlightColor="#26324e">
                          <Skeleton count={1} height={150} />
                        </SkeletonTheme>
                      ) : initialState.videoFiles.length !== 0 ? (
                        <video
                          width="100%"
                          height="240"
                          style={{ background: "#000" }}
                          controls
                          src={initialState.videoFiles}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <label className="btn btn-outline-primary text-white w-100 p-4">
                          Select Video
                          <input
                            name="videoFiles"
                            type="file"
                            hidden
                            accept="images/*"
                            onChange={(e) => handleChange(e)}
                          />
                        </label>
                      )}
                    </div>
                  </Col>
                )}
                <Col md={12}>
                  <div className="form-group mb-4">
                    <label className="text-white">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={initialState.title}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="form-group mb-4">
                    <label className="text-white">Catgories</label>
                    <Select
                      name="category"
                      onChange={handleCategoryChange}
                      options={categories}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.slug}
                      isMulti
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="form-group mb-4">
                    <label className="text-white">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={initialState.description}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group mb-4">
                    <label className="text-white"> Select Poster</label>
                    {loadingState === "imagePoster" ? (
                      <SkeletonTheme color="#182235" highlightColor="#26324e">
                        <Skeleton count={1} height={150} />
                      </SkeletonTheme>
                    ) : (
                      <>
                        {initialState.imagePoster ? (
                          <div className="category-container position-relative">
                            <img
                              alt="Category Images"
                              src={initialState.imagePoster}
                              className="w-100 rounded-lg"
                              style={{ height: "150px", objectFit: "contain" }}
                            />
                            <div className="overlap-container d-flex flex-column justify-content-center">
                              <div className="action-btn">
                                <button
                                  type="button"
                                  className="btn btn-outline-light mr-2"
                                  onClick={() =>
                                    setInitialState({
                                      ...initialState,
                                      imagePoster: "",
                                    })
                                  }
                                >
                                  <i className="far fa-trash-alt" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <label className="btn btn-outline-primary text-white w-100 p-4">
                            Select Image
                            <input
                              name="imagePoster"
                              type="file"
                              hidden
                              accept="images/*"
                              onChange={(e) => handleChange(e)}
                            />
                          </label>
                        )}
                      </>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group mb-4">
                    <label className="text-white">Select Slider Poster</label>
                    {loadingState === "imageSliderPoster" ? (
                      <SkeletonTheme color="#182235" highlightColor="#26324e">
                        <Skeleton count={1} height={150} />
                      </SkeletonTheme>
                    ) : (
                      <>
                        {initialState.imageSliderPoster ? (
                          <div className="category-container position-relative">
                            <img
                              alt="Category Images"
                              src={initialState.imageSliderPoster}
                              className="w-100 rounded-lg"
                              style={{ height: "150px", objectFit: "contain" }}
                            />
                            <div className="overlap-container d-flex flex-column justify-content-center">
                              <div className="action-btn">
                                <button
                                  type="button"
                                  className="btn btn-outline-light"
                                  onClick={() =>
                                    setInitialState({
                                      ...initialState,
                                      imageSliderPoster: "",
                                    })
                                  }
                                >
                                  <i className="far fa-trash-alt" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <label className="btn btn-outline-primary text-white w-100 p-4">
                            Select Image
                            <input
                              name="imageSliderPoster"
                              type="file"
                              hidden
                              accept="images/*"
                              onChange={(e) => handleChange(e)}
                            />
                          </label>
                        )}
                      </>
                    )}
                  </div>
                </Col>
                <Col>
                  <button
                    type="submit"
                    className="btn btn-primary custom-primary"
                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </Col>
            )}
          </Row>
        </form>
      </Container>
    </>
  );
}

export default AddMovie;
