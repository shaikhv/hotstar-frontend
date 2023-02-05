import React, { useState, memo } from "react";
import { Container, Row, Col } from "reactstrap";
import videoDisney from "../../assets/video/disney.mp4";
import videoPixar from "../../assets/video/pixar.mp4";
import videoMarvel from "../../assets/video/marvel.mp4";
import videoStarWars from "../../assets/video/star_wars.mp4";
import videoNationalGeography from "../../assets/video/national_Geography.mp4";
import styles from "./Categories.module.scss";

const categoryContent = [
  {
    name: "Disney",
    imgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/6347/746347-h",
    mobImgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/1513/651513-s",
    videoUrl: videoDisney,
  },
  {
    name: "Pixar",
    imgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/6348/746348-h",
    mobImgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/1544/651544-s",
    videoUrl: videoPixar,
  },
  {
    name: "Marvel",
    imgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/6349/746349-h",
    mobImgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/1528/651528-s",
    videoUrl: videoMarvel,
  },
  {
    name: "StartWars",
    imgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/6357/746357-h",
    mobImgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/1558/651558-s",
    videoUrl: videoStarWars,
  },
  {
    name: "National Geographic",
    imgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/6355/746355-h",
    mobImgUrl:
      "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/2629/652629-s",
    videoUrl: videoNationalGeography,
  },
];

const Categories = () => {
  const [categories] = useState(categoryContent);
  const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

  return (
    <Container fluid className="my-4 px-3 px-md-5">
      <Row className="mx-0">
        {categories.map((category, i) => {
          const { name, mobImgUrl, imgUrl, videoUrl } = category;
          return (
            <Col
              key={`category-${name}`}
              className={`${styles.movieCategory} px-0 px-md-3`}>
              <img
                alt=""
                className="w-100 rounded-lg px-1 px-md-3"
                src={isMobile ? mobImgUrl : imgUrl}
              />
              <video
                className="w-100 rounded-lg d-none d-md-block"
                autoPlay
                preload="auto"
                muted
                onMouseOver={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default memo(Categories);
