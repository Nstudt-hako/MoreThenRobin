import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPersonalBests } from "../api/firebase";
import CatchItem from "../components/CatchItem";

const PersonalBestsScreen = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setData(await getPersonalBests(user.email));
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user]);

  if (!user)
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "var(--color-primary)" }}>Personal Bests</h1>
        <p>Please log in.</p>
      </div>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "var(--color-primary)" }}>Personal Bests</h1>
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No verified catches yet.</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {data.map((item) => (
          <div key={item.id} style={{ position: "relative" }}>
            <CatchItem catchData={item} />
            <div
              style={{ fontSize: "0.7rem", opacity: 0.7, marginTop: "0.25rem" }}
            >
              Species Rank: #{item.rank}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBestsScreen;
