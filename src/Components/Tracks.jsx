import { useContext } from "react";
import LoginContext from "../LoginContext";

function Tracks(){
    const loginContext = useContext(LoginContext);
    const token = loginContext.token;

    return(
        <>
            <h1>Tracks</h1>
        </>
    );
}
export default Tracks;