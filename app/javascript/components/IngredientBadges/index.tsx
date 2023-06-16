import React from "react";
import { XIcon } from "@heroicons/react/outline";

interface Props {
  badges: string[];
  onClick: (badge: string) => void;
}

export default (props: Props) => {
  const onBadgeClick = (badge) => props.onClick(badge);

  let badges;

  if (props.badges.length > 0) {
    badges = props.badges.map((badge) => (
      <div
        key={badge}
        className="badge badge-info m-2"
      >
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => {
            onBadgeClick(badge);
          }}
        >
          <XIcon className="w-5 h-5" />
        </button>
        {badge}
      </div>
    ));
  } else {
    badges = <div className="badge bg-black">any</div>;
  }

  return (
    <div className="flex flex-row items-center">
      <span className="mr-3">Ingredients :</span>
      {badges}
    </div>
  );
};
