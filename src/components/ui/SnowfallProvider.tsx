"use client";

import Snowfall from "react-snowfall";

export default function SnowfallProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Snowfall
        color="#e6f2ff"
        snowflakeCount={50}
        speed={[1, 2]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      {children}
    </>
  );
}
