import { FaSpotify } from "react-icons/fa";

function LinkIcon({ link }) {
  if (!link) return null;

  return (
    <div className="h-[23px] w-[23px] rounded-md pl-0.5 pt-[1px] duration-150 ease-in hover:bg-slate-200 hover:text-black">
      <a href={link} target="_blank" rel="noreferrer">
        <FaSpotify size={20} className="text-green-600" />
      </a>
    </div>
  );
}

export default LinkIcon;
