import React, { memo } from "react";
import { Container } from "reactstrap";
import styles from "./VideoPlayerContainer.module.scss";
import ReactPlayer from "react-player";

const VideoPlayerContainer = ({ clips }) => {
  
  return (
    <>
        <ReactPlayer
        width="100%"
        height="600px"
        url={clips.video ? clips.video : clips.videoFiles[0]}
        style={{ background: "#000" }}
        controls
        playing
      />
        <Container fluid className="my-4 px-3 px-md-5">
          <div
            className={`${styles.mastheadCard} mx-0 border-bottom border-primary rounded-0`}
          >
            <div className={`${styles.mastheadData} meta-wrap desktop w-100`}>
              <h3 className="title ellipsize text-white mb-2">
                {clips.title}
              </h3>
              <h5 className="title ellipsize mb-2 d-flex align-items-center" style={{ fontSize:'18px', color:'rgba(255, 255, 255, 0.6)' }}>
                {clips.title}<span className="mx-3 align-middle">|</span>{new Date(clips.createdAt).toDateString()}
              </h5>
              <div className="toptitle mb-2">
                {clips.category &&
                  clips.category.length !== 0 &&
                  clips.category.map((category) => {
                    return (
                      <span
                        key={category._id}
                        className="meta-data text-primary"
                      >
                        {category.name}
                      </span>
                    );
                  })}
                <span className="meta-data">2018</span>
                <span className="meta-data">U/A 13+</span>
              </div>
              <p className="description text-white mb-4" style={{ fontSize:'15px' }}>
                {clips.description}
              </p>
            </div>
          </div>
        </Container>
    </>
  );
};

export default memo(VideoPlayerContainer);
