import React, { useEffect } from "react";
import ReactGA from "react-ga4";

export default function withPageViewTracking(Component) {
  return (props) => {
    useEffect(() => {
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search + window.location.hash,
      });
    }, []);
    return (<Component {...props} />);
  };
}
