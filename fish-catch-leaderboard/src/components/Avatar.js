import React from "react";

const hashColor = (seed = "") => {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 65% 55%)`;
};

const Avatar = ({ name = "", size = 36 }) => {
  const initials =
    name
      .split(/\s|@/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "?";
  return (
    <div
      style={{
        width: size,
        height: size,
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.max(10, size * 0.42),
        lineHeight: 1,
        fontWeight: 600,
        background: hashColor(name),
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        overflow: "hidden",
        flexShrink: 0,
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
