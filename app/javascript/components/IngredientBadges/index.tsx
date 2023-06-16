import React from "react";

export default (props: { badges: string[] }) => {
  let badges = ["any"];

  if (props.badges.length > 0) {
    badges = props.badges;
  }

  return (
    <div className="flex flex-row items-center">
      <span>Ingredients :</span>
      {badges.map((badge) => (
        <div
          key={badge}
          className="badge bg-black"
        >
          {badge}
        </div>
      ))}
    </div>
  );
};
