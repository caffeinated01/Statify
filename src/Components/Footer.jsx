import { Github } from "lucide-react";

function Footer() {
  return (
    <div className="flex justify-center items-center text-center py-10 px-5 mt-auto border-t-[1px] border-[#ffffff1a]">
      <h1>Made with ❤️ by caffeinated01</h1>
      <a href="https://github.com/caffeinated01/statify" target="_blank">
        <Github
          className="bg-white rounded-full p-1 text-black ml-2"
          size={24}
        />
      </a>
    </div>
  );
}

export default Footer;
