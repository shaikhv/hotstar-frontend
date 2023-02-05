import React, { memo } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { useHistory } from "react-router-dom";
import styles from "./Slider.module.scss";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <i
      className={`${styles.sliderIcon} ${styles.sliderRight} fas fa-chevron-right d-flex align-items-center justify-content-end p-3`}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <i
      className={`${styles.sliderIcon} ${styles.sliderLeft} fas fa-chevron-left d-flex align-items-center p-3`}
      onClick={onClick}
    />
  );
};

function ListingSlider({ isMovieList = [], title }) {
  const history = useHistory();

  const settings = {
    className: `center ${styles.sliderContainer} ${styles.sliderListing}`,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 7,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const redirectToDetails = (id) => {
    window.scrollTo(0, 0);
    history.push(`/movie-details/${id}`);
  };

  return (
    <Container fluid className="my-4 px-3 px-md-5">
      <h2 className="text-white mb-2" style={{ fontSize: "1.3rem" }}>
        {title}
      </h2>
      <Slider {...settings}>
        {isMovieList.map((movie) => {
          return (
            <div
              key={movie._id}
              className="vertical p-2"
              onClick={() => redirectToDetails(movie._id)}
            >
              <article
                className={`${styles.listingArticle} ripple movie-card vertical`}
              >
                <div className="thumbnail-container">
                  <div className="card-img-container">
                    <img
                      src={movie.imagePoster}
                      className="img-loader lazy-img-loader loaded w-100 rounded-lg"
                      loading="lazy"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={`${styles.overlapDetails} details d-flex align-items-end text-white p-3 d-none d-md-block`}
                >
                  <div>
                    <div className="content-play">
                      <span className="content-title ellipsise mb-2">
                        {movie.title}
                      </span>
                    </div>
                    <div className="sub-info" style={{ fontSize: ".7rem" }}>
                      <div className="dur show-gradient d-inline-block">
                        6 min
                      </div>
                      ,
                      <span className="subtitle">
                        {movie.category.map((category) => category.name)}
                      </span>
                    </div>
                    <div
                      className="description ellipsize mb-2"
                      style={{ fontSize: "12px" }}
                    >
                      {movie.description.length > 35
                        ? `${movie.description.substring(0, 35)}...`
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
                        <i className="fas fa-plus mr-2" /> Add to Watchlist
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </Slider>
    </Container>
  );
}

export default memo(ListingSlider);
