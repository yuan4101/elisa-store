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
        color="#d0e8f2"
        snowflakeCount={50}
        speed={[1, 2]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
          filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.15))",
        }}
      />
      {children}
    </>
  );
}
