import React from "react";

export default (props: {
  if: boolean;
  children: React.ReactElement;
  fallback?: React.ReactElement;
}) => {
  if (props.if) {
    return <>{props.children}</>;
  } else {
    return <>{props.fallback}</>;
  }
};
