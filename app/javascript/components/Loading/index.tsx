import React from "react";

export default (props: { loading: boolean }) => {
  return (
    props.loading && (
      <div className="bg-neutral bg-opacity-60 min-w-full min-h-screen fixed top-0 flex justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  );
};
