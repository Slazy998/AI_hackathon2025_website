import { FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/darshan-patil-6844a2232/", icon: <FaLinkedin /> },
  { href: "https://www.youtube.com/@Dzheen", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          Hackathon2025 &copy; {new Date().getFullYear()} All rights reserved.
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a         
          className="text-center text-sm font-light md:text-right"
        >
          Developed by Darshan Patil
        </a>
      </div>
    </footer>
  );
};

export default Footer;
