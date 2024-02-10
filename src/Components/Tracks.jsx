import { useContext } from "react";
import LoginContext from "../LoginContext";

function Tracks(){
    const loginContext = useContext(LoginContext);
    const token = loginContext.token;

    // TODO: Finish the top tracks component
    // TODO: Add generate playlist functionality

    return(
        <>
            <h1>Tracks</h1>
        </>
    );
}
export default Tracks;
