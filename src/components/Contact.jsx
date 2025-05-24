import { useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
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
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Google Apps Script web app URLs - Both sheets
  const SCRIPT_URL_1 =
    "https://script.google.com/macros/s/AKfycbzh6CI81wQntNR6snBZxiYjcQTgr98ENMo-vzByupGCPgAM61UjHEadHTTv179Xae1z/exec";
  
  const SCRIPT_URL_2 =
    "https://script.google.com/macros/s/AKfycbw2l3aJ7sO6DckEDBQCwiCffIUFG19VqpqkiXZ294V7OY2wl2ZxW0-eS9j9yshhU-vs/exec";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to submit to a single script URL
  const submitToScript = async (scriptUrl, scriptName) => {
    try {
      console.log(`Submitting to ${scriptName}:`, formData);

      // Try POST request first
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(`${scriptName} POST completed`);
      return { success: true, method: 'POST' };
    } catch (error) {
      console.error(`${scriptName} POST failed:`, error);

      // If POST fails, try GET method as fallback
      try {
        console.log(`${scriptName} trying GET method...`);

        const params = new URLSearchParams({
          teamName: formData.teamName,
          leadName: formData.leadName,
          email: formData.email,
          phone: formData.phone || "",
          teamSize: formData.teamSize,
          experience: formData.experience || "",
          skills: formData.skills || "",
        });

        const getResponse = await fetch(`${scriptUrl}?${params.toString()}`, {
          method: "GET",
          mode: "no-cors",
        });

        console.log(`${scriptName} GET completed`);
        return { success: true, method: 'GET' };
      } catch (fallbackError) {
        console.error(`${scriptName} both POST and GET failed:`, fallbackError);
        return { success: false, error: fallbackError };
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      // Validate required fields
      const requiredFields = [
        "teamName",
        "leadName",
        "email",
        "phone",
        "teamSize",
        "experience",
      ];
      const missingFields = requiredFields.filter(
        (field) => !formData[field]?.trim()
      );

      if (missingFields.length > 0) {
        throw new Error(`Please fill in: ${missingFields.join(", ")}`);
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Submit to both scripts simultaneously
      const [result1, result2] = await Promise.allSettled([
        submitToScript(SCRIPT_URL_1, "Sheet 1"),
        submitToScript(SCRIPT_URL_2, "Sheet 2")
      ]);

      // Check results
      const sheet1Success = result1.status === 'fulfilled' && result1.value.success;
      const sheet2Success = result2.status === 'fulfilled' && result2.value.success;

      if (sheet1Success && sheet2Success) {
        setMessage("✅ Team registered");
        setMessageType("success");
        
        // Reset form on success
        setFormData({
          teamName: "",
          leadName: "",
          email: "",
          phone: "",
          teamSize: "",
          experience: "",
          skills: "",
        });
      } else if (sheet1Success || sheet2Success) {
        // Partial success
        const successCount = (sheet1Success ? 1 : 0) + (sheet2Success ? 1 : 0);
        setMessage(`⚠️ Team registered.`);
        setMessageType("error");
      } else {
        // Both failed
        setMessage("❌ Registration failed. Please check your internet connection and try again.");
        setMessageType("error");
      }

    } catch (error) {
      console.error("Validation error:", error);
      setMessage(`❌ ${error.message}`);
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
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] mb-10"
          />

          {/* Registration Form */}
          <div className="w-full max-w-2xl mx-auto bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
              Team Registration
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                      : "bg-red-900/50 text-red-300 border border-red-400/30"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  title={isSubmitting ? "Registering..." : "Register Team"}
                  containerClass={`mt-6 cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <p className="text-cyan-400 mb-4 text-lg font-semibold">
              Need Help? Contact Us
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {/* Instagram Section */}
              <div className="flex flex-col items-center bg-grey-50 p-4 rounded-lg shadow-md">
                <span ><FaInstagram color="purple"/></span>
                <p className="text-cyan-500 font-medium">Instagram</p>
                <span>@dr.sindhutaisapkal.maai</span>
                <span>@themotherglobalfoundation</span>
              </div>

              {/* YouTube Section */}
              <div className="flex flex-col items-center bg-grey-50 p-4 rounded-lg shadow-md">
                <span ><FaYoutube color="red"/></span>
                <p className="text-purple-500 font-medium">YouTube</p>
                <span>@themotherglobalfoundation</span>
              </div>

              {/* LinkedIn Section */}
              <div className="flex flex-col items-center bg-hrey-50 p-4 rounded-lg shadow-md">
                <span ><FaLinkedin color="darkblue"/></span>
                <p className="text-orange-500 font-medium">LinkedIn</p>
                <span>The Mother Global Foundation on LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
