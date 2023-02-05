import React, { memo } from "react";
import { Container } from "reactstrap";
import AddEpisode from "../../pages/Movies/AddEpisode";
import { useSelector } from "react-redux";

function ClipsSlider({
  movie,
  addClipsEpisodeModal,
  label,
  episodes,
  playVideo
}) {
    const { user } = useSelector((state) => state);

  const redirectToDetails = (id) => {
    playVideo(id, episodes ? 'episode':'')
  };

  return (
    <Container fluid className="my-4 my-md-5 px-4 px-md-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="text-white mb-0" style={{ fontSize: "1.3rem" }}>
            {label}
          </h2>
          {user && user.role && (
            <button
              type="button"
              onClick={() => addClipsEpisodeModal(episodes ? 'episode':'')}
              className="btn btn-primary custom-primary"
            >
              Add Clip
            </button>
          )}
        </div>
        <AddEpisode movieList={movie} role={user && user.role} redirect={redirectToDetails} />
      </Container>
  );
}

export default memo(ClipsSlider);
