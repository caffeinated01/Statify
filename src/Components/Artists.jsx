import { useContext } from "react";
import LoginContext from "../LoginContext";

function Artists(){
    const loginContext = useContext(LoginContext);
    const token = loginContext.token;

    return(
        <>
            <h1>Artists</h1>
        </>
    );
}
export default Artists;