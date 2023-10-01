import React, { useEffect } from "react";
import ReactGA from "react-ga";

export default function withPageViewTracking(Component) {
    return (props) => {
        useEffect(() => {
            ReactGA.pageview(window.location.pathname + window.location.search + window.location.hash);
        }, []);
        return (<Component {...props} />);
    };
}
