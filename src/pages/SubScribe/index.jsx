import React, { useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import ImagePoster from "../../assets/images/poster.jpg";
import Login from "../../components/Auth/Login";

const plans = [
  {
    name: "Watch on TV or Laptop",
    super: <i className="fas fa-check" />,
    premium: <i className="fas fa-check" />,
  },
  {
    name: "Ads free movies and shows (except sports)",
    super: <i className="fas fa-check" />,
    premium: <i className="fas fa-times" />,
  },
  {
    name: "Number of devices that can be logged in",
    super: 2,
    premium: 4,
  },
];

const Subscibe = ({ movie }) => {
  const [isPricingPlan, setPricingPlan] = useState(1);
  const [isPlanList] = useState(plans);
  const [loginModal, setLoginModal] = useState();

  return (
      <>
    <Container fluid className="px-5 pt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="text-center mb-3">
            <img
              src={movie.imagePoster}
              alt=""
              height="150px"
              className="border rounded"
            />
          </div>
          <h2
            className="text-white mb-4 text-center"
            style={{ fontSize: "1.3rem" }}
          >
            Subscribe to watch
          </h2>
          <div className="dark-container">
            <Table className="mb-4">
            <thead>
                <tr>
                    <th/>
                    <th className={`text-center ${isPricingPlan === 1 ? 'active':''}`}>Super</th>
                    <th className={`text-center ${isPricingPlan === 2 ? 'active':''}`}>Premium</th>
                </tr>
            </thead>
              <tbody className="text-white">
                {isPlanList.map((plan) => {
                  return <tr>
                    <td>{plan.name}</td>
                    <td width="150px" className={`text-center ${isPricingPlan === 1 ? 'active':''}`}>
                      {plan.super}
                    </td>
                    <td width="150px" className={`text-center ${isPricingPlan === 2 ? 'active':''}`}>
                      {plan.premium}
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
            <div className="button-group mb-4">
              <Row>
                <Col md={6}>
                  <button
                    type="submit"
                    onClick={() => setPricingPlan(1)}
                    className={`${isPricingPlan === 1 ? 'active':''} btn btn-primary custom-primary text-white text-left w-100`}
                  >
                    <span className="pack-title">Super</span>
                    <span className="pack-pricing">
                      <sup>₹</sup>
                      899
                    </span>
                    <span class="pack-duration">/Year</span>
                  </button>
                </Col>
                <Col md={6}>
                  <button
                    type="submit"
                    onClick={() => setPricingPlan(2)}
                    className={`${isPricingPlan === 2 ? 'active':''} btn btn-primary custom-primary text-white text-left w-100`}
                  >
                    <span className="pack-title">Premium</span>
                    <span className="pack-pricing">
                      <sup>₹</sup>
                      1499
                    </span>
                    <span class="pack-duration">/Year</span>
                  </button>
                </Col>
              </Row>
            </div>
            <button type="submit" onClick={() => setLoginModal(!loginModal)} className="btn btn-primary p-3 w-100">
              Continue with Premium
            </button>
          </div>
        </Col>
      </Row>
    </Container>
    <Login show={loginModal} close={() => setLoginModal(!loginModal)} />
    </>
  );
};

export default Subscibe;
