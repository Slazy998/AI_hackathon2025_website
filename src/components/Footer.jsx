import { useState } from "react";
import { FaLinkedin, FaYoutube, FaChevronDown, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const socialLinks = [
    { 
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/darshan-patil-6844a2232/", 
      icon: <FaLinkedin className="w-5 h-5" />,
      color: "hover:text-blue-600"
    },
    { 
      name: "YouTube",
      href: "https://www.youtube.com/@Dzheen", 
      icon: <FaYoutube className="w-5 h-5" />,
      color: "hover:text-red-600"
    },
  ];

  const toggleSocialLinks = () => {
    setShowSocialLinks(!showSocialLinks);
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
      <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          Hackathon2025 &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        
        {/* Organization Social Links */}
        <div className="flex justify-center gap-4">
          <a
            href="https://www.instagram.com/dr.sindhutaisapkal.maai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-colors duration-300"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@themotherglobalfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-colors duration-300"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/themotherglobalfoundation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-white transition-colors duration-300"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
        
        {/* Developer Credit with Interactive Social Links */}
        <div className="relative text-center md:text-right">
          <button
            onClick={toggleSocialLinks}
            className="text-sm font-light text-black hover:text-white transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-1 group"
          >
            Developed by 
            <span className="font-medium relative">
              <span className="group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:via-red-500 group-hover:via-yellow-500 group-hover:via-green-500 group-hover:via-blue-500 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent group-hover:animate-gradient-x bg-[length:200%_100%] transition-all duration-300">
                Darshan Patil
              </span>
            </span>
            <FaChevronDown 
              className={`w-3 h-3 transition-transform duration-300 ${
                showSocialLinks ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          
          {/* Social Links Dropdown */}
          {showSocialLinks && (
            <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[160px] z-10">
              <div className="flex flex-col gap-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 ${link.color} transition-colors duration-200 hover:bg-gray-50`}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          )}
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
