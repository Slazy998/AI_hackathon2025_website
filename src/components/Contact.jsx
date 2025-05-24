import { useState } from "react";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

// Simple AnimatedTitle component (since it's not defined)
const AnimatedTitle = ({ title, className }) => (
  <div className={className}>
    <h1 dangerouslySetInnerHTML={{ __html: title }} />
  </div>
);

// Simple Button component (since it's not defined)
const Button = ({ title, containerClass, ...props }) => (
  <button className={containerClass} {...props}>
    {title}
  </button>
);

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="decoration" />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    leadName: "",
    email: "",
    phone: "",
    teamSize: "",
    experience: "",
    skills: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Google Apps Script URLs
  const SCRIPTS = [
    {
      url: "https://script.google.com/macros/s/AKfycbzh6CI81wQntNR6snBZxiYjcQTgr98ENMo-vzByupGCPgAM61UjHEadHTTv179Xae1z/exec",
      name: "Primary System"
    },
    {
      url: "https://script.google.com/macros/s/AKfycbxLojDwvH4ixRCixPJJwRJqhhR7EYbECFI7NJSlzN6pLSxkvWNWZNZ6_Em1hc7VoIW1/exec",
      name: "Backup System"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      // Validation
      const requiredFields = ["teamName", "leadName", "email", "phone", "teamSize", "experience"];
      const missingFields = requiredFields.filter(field => !formData[field]?.trim());
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error("Invalid email format");
      }

      // Submission handler with retries
      const submitToScript = async (script) => {
        try {
          // Try POST first
          const postResponse = await fetch(script.url, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData),
            mode: 'cors'
          });

          if (!postResponse.ok) throw new Error(`POST failed (${postResponse.status})`);
          return { ...script, status: "success", method: "POST" };
        } catch (postError) {
          console.log(`POST failed for ${script.name}, trying GET...`);
          
          // Fallback to GET
          try {
            const params = new URLSearchParams(formData);
            const getResponse = await fetch(`${script.url}?${params.toString()}`, {
              method: "GET",
              mode: 'cors'
            });
            
            if (!getResponse.ok) throw new Error(`GET failed (${getResponse.status})`);
            return { ...script, status: "success", method: "GET" };
          } catch (getError) {
            throw new Error(`${script.name} failed: ${getError.message}`);
          }
        }
      };

      // Submit to all scripts
      const results = await Promise.allSettled(
        SCRIPTS.map(script => submitToScript(script))
      );

      // Process results
      const successful = results.filter(r => r.status === "fulfilled");
      const failed = results.filter(r => r.status === "rejected");

      // Update message
      if (successful.length > 0) {
        setMessageType("success");
        setMessage(`✅ Received by ${successful.length} system(s)`);
        setFormData({
          teamName: "",
          leadName: "",
          email: "",
          phone: "",
          teamSize: "",
          experience: "",
          skills: "",
        });
      }

      if (failed.length > 0) {
        const errorDetails = failed.map(f => f.reason.message).join(", ");
        console.error("Failed submissions:", errorDetails);
        setMessageType(prev => prev ? "warning" : "error");
        setMessage(prev => `${prev} ⚠️ ${failed.length} system(s) failed`);
      }

    } catch (error) {
      console.error("Submission error:", error);
      setMessage("❌ Temporary issue. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="register" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-gradient-to-br from-slate-900 to-blue-900 py-24 text-blue-50 sm:overflow-hidden">
        {/* Background Images */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="img/contact-1.png"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="img/contact-2.png"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="img/swordman.jpg"
            clipClass="sword-man-clip-path md:scale-125 opacity-70"
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-6 font-general text-[10px] uppercase text-cyan-400 tracking-wider">
            Register Now
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> future of <br /> <b>A</b>I t<b>o</b>gether."
            className="special-font md:text-6xl w-full font-bold text-5xl leading-tight mb-10"
          />

          {/* Registration Form */}
          <div className="w-full max-w-2xl mx-auto bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
              Team Registration
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter your team name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Team Lead Name *
                  </label>
                  <input
                    type="text"
                    name="leadName"
                    value={formData.leadName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter team lead name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Team Size *
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="">Select team size</option>
                    <option value="1">Solo (1 member)</option>
                    <option value="2">2 members</option>
                    <option value="3">3 members</option>
                    <option value="4">4 members</option>
                    <option value="5">5 members</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">
                      Intermediate (1-3 years)
                    </option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Technical Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="e.g., Python, Machine Learning, React, TensorFlow..."
                />
              </div>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg text-center ${
                    messageType === "success"
                      ? "bg-green-900/50 text-green-300 border border-green-400/30"
                      : messageType === "warning"
                      ? "bg-yellow-900/50 text-yellow-300 border border-yellow-400/30"
                      : "bg-red-900/50 text-red-300 border border-red-400/30"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  title={isSubmitting ? "Registering..." : "Register Team"}
                  disabled={isSubmitting}
                  containerClass={`mt-6 cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <p className="text-cyan-400 mb-4 text-lg font-semibold">
              Need Help? Contact Us
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {/* Instagram Section */}
              <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-lg shadow-md">
                <span className="mb-2"><FaInstagram size={24} color="purple"/></span>
                <p className="text-cyan-500 font-medium">Instagram</p>
                <span className="text-center">@dr.sindhutaisapkal.maai</span>
                <span className="text-center">@themotherglobalfoundation</span>
              </div>

              {/* YouTube Section */}
              <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-lg shadow-md">
                <span className="mb-2"><FaYoutube size={24} color="red"/></span>
                <p className="text-purple-500 font-medium">YouTube</p>
                <span className="text-center">@themotherglobalfoundation</span>
              </div>

              {/* LinkedIn Section */}
              <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-lg shadow-md">
                <span className="mb-2"><FaLinkedin size={24} color="darkblue"/></span>
                <p className="text-orange-500 font-medium">LinkedIn</p>
                <span className="text-center">The Mother Global Foundation on LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
