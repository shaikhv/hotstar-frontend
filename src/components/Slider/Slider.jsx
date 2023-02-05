import React, { memo } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import styles from "./Slider.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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

const SliderContainer = ({ isMovieList = [] }) => {

  const settings = {
    className: `center ${styles.sliderContainer}`,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          infinite: false,
        }
      }
    ]
  };

  return (
    <>
      {isMovieList.length !== 0 ? (
        <Slider {...settings}>
          {isMovieList.map((movie) => {
            return (
              <div
                key={movie._id}
                className={`${styles.mastheadCard} w-auto position-relative d-flex align-items-center justify-content-between`}
              >
                <div className={`${styles.mastheadData} d-none d-md-block`}>
                  <div className="masthead-badge"> </div>
                  <div className="slider-caption non-subs-caption">
                    <Container>
                      <div className="content-holder pl-5">
                        <h3 className="title ellipsize text-white">
                          {movie.title}
                        </h3>
                        <div className="toptitle my-3">
                          {movie.category.map((category) => {
                            return (
                              <span key={category._id} className="meta-data">
                                {category.name}
                              </span>
                            );
                          })}
                        </div>
                        <p className="description">{movie.description}</p>
                      </div>
                    </Container>
                  </div>
                </div>
                <div className={`${styles.imageHolder} position-relative`}>
                  <div className={`${styles.imageGradient}`}></div>
                  <div className="imageloader loaded">
                    <img
                      src={movie.imageSliderPoster}
                      alt={movie.slug}
                      className=""
                    />
                  </div>
                  <div className="container"></div>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <Container fluid className="px-5">
          <SkeletonTheme color="#182235" highlightColor="#26324e">
            <Skeleton count={1} height={400} />
          </SkeletonTheme>
        </Container>
      )}
    </>
  );
};

export default memo(SliderContainer);
