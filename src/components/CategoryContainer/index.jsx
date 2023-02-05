import React, { memo } from "react";
import { Col } from "reactstrap";
import styles from "./CategoryContainer.module.scss";

const CategoryContainer = ({ categories, deleteCat, isEditable, editCat }) => {
  return (
    <>
      {categories ? (
        categories.map((cat, i) => {
          return (
            <Col
              md={isEditable ? 4 : 2}
              className={`${styles.categoryContainer} ${i % 3 === 0 ? styles.firstOfRow :i % 2 === 0 ? styles.lastOfRow : ''} my-3 px-2`}
              key={cat._id}
            >
              <div className="position-relative">
                <img
                  alt={cat.name}
                  src={cat.image}
                  className="w-100 rounded-lg"
                />
                <div
                  className={`${styles.overlapContainer} d-flex flex-column justify-content-center`}
                >
                  <label className={`${isEditable ? '':styles.onlyView} text-white mb-0 text-center w-100`}>
                    {cat.name}
                  </label>
                  {isEditable && (
                    <div className={styles.actionBtn}>
                      <button
                        type="button"
                        className="btn btn-outline-light mr-2"
                        onClick={() => deleteCat(cat._id)}
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-light"
                        onClick={() => editCat(cat)}
                      >
                        <i className="far fa-edit" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          );
        })
      ) : (
        <h5>No Categories at the moment</h5>
      )}
    </>
  );
};

export default memo(CategoryContainer);
