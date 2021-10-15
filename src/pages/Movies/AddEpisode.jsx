import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./Movie.module.scss";

function AddEpisode({ role, movieList, redirect }) {
  const [selectedVideo, setSelectedVideo] = useState(1);

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

  const episodeSettings = {
    className: `${styles.sliderContainer} ${styles.sliderListing}`,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="movie-slider w-100">
          <Slider {...episodeSettings}>
            {movieList && movieList.length !== 0 ? (
              movieList.map((video, i) => {
                return (
                  <article
                    key={video}
                    className={`${styles.listingArticle} cursor-pointer position-relative w-100`}
                    onClick={() => redirect(video._id)}
                  >
                    <img
                      alt="Category Images"
                      src={video.thumbnail}
                      className="w-100 rounded-lg"
                      style={{
                        height: "128px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="meta-desc hide-on-expand">
                      <div className="play-icon"></div>
                      <div className="meta-wrapper">
                        <div className="title ellipsize">
                          <span className="d-flex align-items-center" style={{ fontSize: "13px" }}>
                            <i
                              className="fas fa-play mr-2"
                              onClick={() => setSelectedVideo(i)}
                            />
                            {video.title}
                          </span>
                          {video.title.length < 40 && (
                            <>
                              <span className="dot-divider position-relative mx-2">
                                -
                              </span>
                              <span className="subtitle">
                                {new Date(video.createdAt).toDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.overlapDetails} details d-flex align-items-end text-white px-3 pt-3 pb-2`}
                    >
                      <div>
                        <div className="content-play">
                          <span
                            className="content-title ellipsise mb-1 d-flex align-items-center"
                            style={{ fontSize: "12px" }}
                          >
                            <i
                              className="fas fa-play mr-2"
                              onClick={() => setSelectedVideo(i)}
                              style={{ fontSize: "12px" }}
                            />
                            {video.title}
                          </span>
                        </div>
                        <div
                          className="description ellipsize mb-2"
                          style={{ fontSize: "12px" }}
                        >
                          {/* {video.description} */}
                          {video.description.length > 35
                            ? `${video.description.substring(0, 35)}...`
                            : ""}
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
                );
              })
            ) : (
              <p className="text-white mb-0 border p-4 text-center w-100">
                No Clips Availble
              </p>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default AddEpisode;
