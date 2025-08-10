import React from "react";
import CatchItem from "./CatchItem";

/**
 * Presentational component rendering an ordered list of catches.
 * Expects data to be pre-sorted (e.g. by size desc) by caller.
 */
const LeaderboardList = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="empty-state">
        <p>No catches recorded yet. Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-list">
      {data.map((catchData, index) => (
        <div key={catchData.id} className="leaderboard-item">
          <div className="rank-badge">#{index + 1}</div>
          <CatchItem catchData={catchData} />
        </div>
      ))}
    </div>
  );
};

export default LeaderboardList;
