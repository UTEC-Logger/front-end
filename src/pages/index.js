import { useEffect } from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
    useEffect(() => {
        navigate("/page", { replace: true });
    }, []);

    return null;
};

export default IndexPage;
