import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginContext from "../LoginContext";
import { ExternalLink, ChevronDown } from "lucide-react";

function Artists(){
    const loginContext = useContext(LoginContext);
    const token = localStorage.getItem("token");
    const [artistsJSON, setArtistsJson] = useState([])
    const [timeRange, setTimeRange] = useState("short_term")

    useEffect(()=>{
        async function fetchTopArtists(){ 
            const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                        time_range: timeRange, // TODO: Make this changeable with a dropdown menu or smt (short_term, medium_term, long_term)
                        limit: 30,
                        offset: 0
                }
            });
            setArtistsJson(data.items)
        };
        fetchTopArtists();
    }, [timeRange]);

    function handleTimeRangeChange(e){
        setTimeRange(e.target.value);
    }

    // TODO: Add dropdown menu to change time range
    
    return(
        <>
            <div className="flex flex-col items-center justify-center gap-10 py-10">
                <h1 className="text-2xl">Top Artists</h1>
                <select onChange={handleTimeRangeChange} className="h-10 px-3 text-white bg-bg-secondary rounded-md border-[1px] border-[#ffffff1a] appearance-none">
                    <option value="short_term">Last 4 weeks </option>
                    <option value="medium_term">Last 6 months</option>
                    <option value="long_term">All time</option>
                </select>
                <div className="flex flex-wrap items-center justify-center">
                    {artistsJSON.map((artist, index) => (
                        <div key={index} className="mx-4 my-4 bg-bg-secondary relative flex flex-col items-center justify-center gap-2 rounded-md border-[1px] border-[#ffffff1a] px-5 py-5 shadow-2xl">
                            <div>
                                <div className="flex justify-between">
                                    <h1 className="py-1">{index+1}. {artist.name}</h1>
                                    <div className="hover:bg-slate-200 hover:text-black w-[23px] h-[23px] rounded-md pl-0.5 pt-[1px]">
                                        <a href={artist.external_urls["spotify"]} target="_blank"><ExternalLink size={20} /></a>
                                    </div>
                                </div>
                                
                                <img className="w-[400px] h-[400px] object-cover rounded-sm" src={artist.images[0]["url"]}></img>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    );
}
export default Artists;
