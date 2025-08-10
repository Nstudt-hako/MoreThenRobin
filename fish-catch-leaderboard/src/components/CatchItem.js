import React from "react";
import Avatar from "./Avatar";

const CatchItem = ({ catchData }) => {
  const {
    species,
    size,
    location,
    angler,
    timestamp,
    photo,
    verified,
    flagged,
  } = catchData;

  return (
    <div className="catch-item">
      <div style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
        <Avatar name={angler || "Anonymous"} size={46} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".55rem",
              flexWrap: "wrap",
            }}
          >
            <h3 className="catch-species" style={{ margin: 0 }}>
              {species || "Unknown Species"}
            </h3>
            {verified ? (
              <span className="badge badge-success">Verified</span>
            ) : (
              <span className="badge badge-warning">Pending</span>
            )}
            {flagged && <span className="badge badge-danger">Flagged</span>}
          </div>
          <div className="catch-details" style={{ marginTop: ".4rem" }}>
            <p>
              <strong>Size:</strong> {size} cm
            </p>
            <p>
              <strong>Angler:</strong> {angler || "Anonymous"}
            </p>
            {location && (
              <p>
                <strong>Location:</strong> {location}
              </p>
            )}
            <p>
              <strong>Caught:</strong>{" "}
              {new Date(
                timestamp?.toDate ? timestamp.toDate() : timestamp
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
        {photo && (
          <div
            style={{
              width: 90,
              aspectRatio: "3/2",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 10px -2px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={photo}
              alt={`${species} catch`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchItem;
