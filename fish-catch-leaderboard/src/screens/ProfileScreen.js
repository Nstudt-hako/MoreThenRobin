import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { getUserAchievements } from "../api/firebase";
import Avatar from "../components/Avatar";

const ProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getUserAchievements(user.email)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: theme.text }}>
        <h1 style={{ color: theme.primary }}>Profile</h1>
        <p>Please log in.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        color: theme.text,
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "clamp(1rem, 2vw, 2rem)",
        paddingBottom: "calc(2.75rem + env(safe-area-inset-bottom))",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Avatar name={user.email} size={72} />
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              color: theme.primary,
              margin: 0,
              fontSize: "1.9rem",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {user.email}
          </h1>
          <p
            style={{
              margin: "0.3rem 0 0",
              opacity: 0.75,
              fontSize: ".8rem",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            Role: {user.role}
          </p>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {data && (
        <>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: "1rem",
              marginBottom: "2.4rem",
            }}
          >
            <div
              className="glass"
              style={{ padding: "1rem 1.2rem", borderRadius: "14px" }}
            >
              <p
                style={{
                  fontSize: ".65rem",
                  letterSpacing: ".5px",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                TOTAL CATCHES
              </p>
              <h2 style={{ margin: "0.4rem 0 0", fontSize: "1.4rem" }}>
                {data.stats.total}
              </h2>
            </div>
            <div
              className="glass"
              style={{ padding: "1rem 1.2rem", borderRadius: "14px" }}
            >
              <p
                style={{
                  fontSize: ".65rem",
                  letterSpacing: ".5px",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                VERIFIED
              </p>
              <h2 style={{ margin: "0.4rem 0 0", fontSize: "1.4rem" }}>
                {data.stats.verified}
              </h2>
            </div>
            <div
              className="glass"
              style={{ padding: "1rem 1.2rem", borderRadius: "14px" }}
            >
              <p
                style={{
                  fontSize: ".65rem",
                  letterSpacing: ".5px",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                SPECIES
              </p>
              <h2 style={{ margin: "0.4rem 0 0", fontSize: "1.4rem" }}>
                {data.stats.species}
              </h2>
            </div>
            <div
              className="glass"
              style={{ padding: "1rem 1.2rem", borderRadius: "14px" }}
            >
              <p
                style={{
                  fontSize: ".65rem",
                  letterSpacing: ".5px",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                BEST SIZE (cm)
              </p>
              <h2 style={{ margin: "0.4rem 0 0", fontSize: "1.4rem" }}>
                {data.stats.bestSize}
              </h2>
            </div>
          </section>
          <section>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.2rem" }}>
              Achievements
            </h2>
            {data.achievements.achievements?.length === 0 && (
              <p style={{ opacity: 0.6, fontSize: ".8rem" }}>
                No achievements yet. Keep fishing! 🎣
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
              {data.achievements.achievements?.map((a) => (
                <span
                  key={a.code}
                  className={`badge badge-${
                    a.level === "bronze"
                      ? "warning"
                      : a.level === "silver"
                      ? "success"
                      : a.level === "gold"
                      ? "danger"
                      : "success"
                  }`}
                  style={{ fontSize: ".55rem" }}
                >
                  {a.label}
                </span>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
