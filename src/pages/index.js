import React, { useEffect } from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
    useEffect(() => {
        navigate("/sqlite-data", { replace: true });
    }, []);

    return null;
};

export default IndexPage;
