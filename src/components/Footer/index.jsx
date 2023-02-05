import React, { memo } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div className="footer">
      <Container fluid className="mt-4 px-3 px-md-5 py-md-5 pb-5">
        <Row>
          <Col md={7} className="footer-left">
            <ul className="list-unstyled">
              <li className="mr-3 d-inline-block">
                <Link to="">About Disney+ Hotstar</Link>
              </li>
              <li className="mr-3 d-inline-block">
                <Link to="">Terms of Use</Link>
              </li>
              <li className="mr-3 d-inline-block">
                <Link to="">Privacy Policy</Link>
              </li>
              <li className="mr-3 d-inline-block">
                <Link to="">FAQ</Link>
              </li>
              <li className="mr-3 d-inline-block">
                <Link to="">Feedback</Link>
              </li>
              <li className="mr-3">
                <Link to="">Careers</Link>
              </li>
            </ul>
            <p className="copyright">
              © 2021 STAR. All Rights Reserved. HBO, Home Box Office and all
              related channel and programming logos are service marks of, and
              all related programming visuals and elements are the property of,
              Home Box Office, Inc. All rights reserved.
            </p>
          </Col>
          <Col md={5}>
            <Row className="align-items-center">
              <Col md={4} className="social-unit">
                <div className="my-3 my-0">
                  <p>Connect with us</p>
                  <a
                    className="fb"
                    href="https://www.facebook.com/DisneyPlusHotstar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp;
                  </a>
                  <a
                    className="tw"
                    href="https://twitter.com/DisneyPlusHS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp;
                  </a>
                </div>
              </Col>
              <Col md={8} className="app-unit d-flex align-items-center justify-content-md-end">
                <div className="store-wrapper my-3 my-0">
                  <p>Disney+ Hotstar App</p>
                  <a
                    className="playstore"
                    href="https://play.google.com/store/apps/details?id=in.startv.hotstar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp;
                  </a>
                  <a
                    className="appstore"
                    href="https://itunes.apple.com/in/app/hotstar/id934459219?mt=8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp;
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(Footer);
