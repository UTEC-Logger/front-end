import { useEffect } from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
    useEffect(() => {
        navigate("/logger", { replace: true });
    }, []);

    return null;
};

export default IndexPage;
