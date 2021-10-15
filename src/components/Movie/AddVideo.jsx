import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactPlayer from "react-player";

const defaultValue = {
  clips: [
    {
      title: "",
      thumbnail: "",
      video: "",
      description: "",
    },
  ],
};

const AddVideo = ({ show, close, token, onSubmit }) => {
  const [initialValue] = useState(defaultValue);
  const [loadingState, setLoadingState] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState("");

  const handleChange = (e, setFieldValue, index) => {
    const files = e.target.files;
    let resizedImages = {};
    if (files) {
      if (files[0].type === "image/jpeg") {
        setLoadingState(`clips[${index}].thumbnail`);
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
                    authtoken: token ? token : "",
                  },
                }
              )
              .then((res) => {
                resizedImages = res.data;
                setFieldValue(`clips[${index}].thumbnail`, resizedImages.url);
                setLoadingState("");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      } else {
        setLoadingState(`clips[${index}].video`);
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          // const config = {
          //   headers: {
          //     authtoken: user ? user.token : "",
          //   },
          //   onUploadProgress: (progressEvent) => {
          //     const { loaded, total } = progressEvent;
          //     const percentCompleted = Math.round(
          //       (loaded * 100) / total
          //     );
          //     setuploadingstate(percentCompleted);
          //   },
          // };
          axios
            .post(
              `${process.env.REACT_APP_API}/upload-video`,
              { video: reader.result },
              {
                headers: {
                  authtoken: token ? token : "",
                },
              }
            )
            .then((res) => {
              resizedImages = res.data;
              console.log(res.data);
              setFieldValue(`clips[${index}].video`, res.data.url);
              setLoadingState("");
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
    }
  };

  return (
    <div>
      <Modal isOpen={show} toggle={close} centered size="lg" zIndex={999999}>
        <ModalHeader toggle={close}>
          <span className="text-white">Add Clip</span>
        </ModalHeader>
        <ModalBody className="pb-0">
          <Formik
            initialValues={initialValue}
            onSubmit={(values) => onSubmit(values)}
            render={({ values, setFieldValue }) => (
              <Form>
                <FieldArray
                  name="clips"
                  render={(arrayHelpers) => (
                    <div>
                      {values.clips && values.clips.length > 0 ? (
                        values.clips.map((clip, index) => (
                          <div key={index}>
                            <div className="form-group">
                              <label class="text-white">Title</label>
                              <Field
                                name={`clips.${index}.title`}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label class="text-white">Description</label>
                              <Field
                                name={`clips.${index}.description`}
                                as="textarea"
                                className="form-control"
                                style={{ height: "80px" }}
                              />
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className="form-group mb-4">
                                  <label className="text-white">
                                    Select Poster
                                  </label>
                                  {loadingState === `clips[${index}].thumbnail` ? (
                                    <SkeletonTheme
                                      color="#182235"
                                      highlightColor="#26324e"
                                    >
                                      <Skeleton count={1} height={150} />
                                    </SkeletonTheme>
                                  ) : clip.thumbnail ? (
                                    <div className="category-container position-relative">
                                      <img
                                        alt="Category Images"
                                        src={clip.thumbnail}
                                        className="w-100 rounded-lg"
                                        style={{
                                          height: "150px",
                                          objectFit: "contain",
                                        }}
                                      />
                                      <div className="overlap-container d-flex flex-column justify-content-center">
                                        <div className="action-btn">
                                          <button
                                            type="button"
                                            className="btn btn-outline-light mr-2"
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
                                        name={`clips[${index}].thumbnail`}
                                        type="file"
                                        hidden
                                        accept="images/*"
                                        onChange={(e) =>
                                          handleChange(e, setFieldValue, index)
                                        }
                                      />
                                    </label>
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="form-group mb-4">
                                  <label className="text-white">
                                    Select Video
                                  </label>
                                  {loadingState === `clips[${index}].video` ? (
                                    <SkeletonTheme
                                      color="#182235"
                                      highlightColor="#26324e"
                                    >
                                      <Skeleton count={1} height={150} />
                                    </SkeletonTheme>
                                  ) : clip.video ? (
                                    <div className="category-container position-relative">
                                      <ReactPlayer
                                        width="100%"
                                        height="150"
                                        url={clip.video}
                                        style={{ background: "#000" }}
                                        playing={playingVideoId === index}
                                        loop
                                      />
                                      <div className="overlap-container d-flex flex-column justify-content-center">
                                        <div className="action-btn">
                                          <button
                                            type="button"
                                            className="btn btn-outline-light mr-2"
                                            onClick={() =>
                                              setFieldValue(`clips[${index}].video`,'')
                                            }
                                          >
                                            <i className="far fa-trash-alt" />
                                          </button>
                                          {playingVideoId !== index ? (
                                            <button
                                              type="button"
                                              className="btn btn-outline-light mr-2"
                                              onClick={() =>
                                                setPlayingVideoId(index)
                                              }
                                            >
                                              <i className="fas fa-play" />
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              className="btn btn-outline-light mr-2"
                                              onClick={() =>
                                                setPlayingVideoId('')
                                              }
                                            >
                                              <i className="fas fa-pause" />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <label className="btn btn-outline-primary text-white w-100 p-4">
                                      Select Image
                                      <input
                                        name={`clips[${index}].video`}
                                        type="file"
                                        hidden
                                        accept="images/*"
                                        onChange={(e) =>
                                          handleChange(e, setFieldValue, index)
                                        }
                                      />
                                    </label>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <div className="text-right">
                              <button
                                type="button"
                                className="btn btn-danger mr-3"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                Remove
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => arrayHelpers.push("")} // insert an empty string at a position
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => arrayHelpers.push("")}
                        >
                          {/* show this when user has removed all friends from the list */}
                          Add a friend
                        </button>
                      )}
                      <Row
                        className="mt-3 position-sticky p-3"
                        style={{ bottom: 0, zIndex: 9, background: "#111826" }}
                      >
                        <button
                          type="submit"
                          className="btn btn-pruimary custom-primary"
                        >
                          Submit
                        </button>
                      </Row>
                    </div>
                  )}
                />
              </Form>
            )}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddVideo;
