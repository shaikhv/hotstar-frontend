import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import {
  createCategories,
  getCategories,
  deleteCategory,
} from "../../constants/urls";
import CategoryContainer from "../../components/CategoryContainer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const initialValues = {
  name: "",
  image: "",
};

function CreateCategory() {
  const [initialCategoryState, setinitialCategoryState] =
    useState(initialValues);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useSelector((state) => state);
  const [isLoading, setLoading] = useState(false);
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      setEditable(!isEditable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    createCategories(
      { name: initialCategoryState.name, image: initialCategoryState.image },
      user.token
    )
      .then((res) => {
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCat = (name) => {
    deleteCategory(name, user.token)
      .then((res) => {
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCat = (category) => {
    setinitialCategoryState({name:category.name, image:category.image})
  };

  const handleChange = (e) => {
    const files = e.target.files;
    let resizedImages = {};
    if (files) {
      setLoading(true);
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
              setinitialCategoryState((prevState) => {
                return { ...prevState, image: resizedImages.url };
              });
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        "base64"
      );
    } else {
      const name = e.target.value;
      setinitialCategoryState((prevState) => {
        return { ...prevState, [e.target.name]: name };
      });
    }
  };

  return (
    <Container fluid className="my-4 px-3 px-md-5">
      <Row>
        <Col md={isEditable ? 8 : 12}>
          <h2 className="text-white mb-0" style={{ fontSize: "1.3rem" }}>
            Genres
          </h2>
          <Row>
            <CategoryContainer
              categories={categoryList}
              deleteCat={deleteCat}
              isEditable={isEditable}
              editCat={editCat}
            />
          </Row>
        </Col>
        {isEditable && (
          <Col md={4}>
            <form onSubmit={handleSubmit} className="px-4">
              <div className="form-group mb-4">
                <label className="text-white">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={initialCategoryState.name}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />
              </div>
              <div className="form-group border-0 mb-4">
                <label className="text-white">Category Image</label>
                {!isLoading ? (
                  <>
                  {initialCategoryState.image ? (
                    <div className="category-container position-relative">
                    <img
                      alt="Category Images"
                      src={initialCategoryState.image}
                      className="w-100 rounded-lg"
                    />
                    <div
                      className="overlap-container d-flex flex-column justify-content-center"
                    >
                      {isEditable && (
                        <div className="action-btn">
                          <button
                            type="button"
                            className="btn btn-outline-light mr-2"
                            onClick={() => setinitialCategoryState({...initialCategoryState, image:''})}
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  ) : (
                    <label className="btn btn-outline-primary text-white w-100 p-4">
                      Select Image
                      <input
                        name="image"
                        type="file"
                        hidden
                        accept="images/*"
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                  )}
                </>
                ):(
                  <SkeletonTheme color="#182235" highlightColor="#26324e">
                    <Skeleton count={1} height={258} />
                  </SkeletonTheme>
                )}  
              </div>
              <button type="submit" className="btn btn-primary custom-primary">
                Submit
              </button>
            </form>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CreateCategory;
