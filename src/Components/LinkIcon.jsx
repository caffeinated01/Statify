import { ExternalLink } from "lucide-react";

function LinkIcon(props) {
  return (
    <div className="h-[23px] w-[23px] rounded-md pl-0.5 pt-[1px] duration-150 ease-in hover:bg-slate-200 hover:text-black">
      <a href={props.link} target="_blank">
        <ExternalLink size={20} />
      </a>
    </div>
  );
}

export default LinkIcon;
