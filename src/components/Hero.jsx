import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
          {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="animate-bounce"> 
        </div>
        <FiChevronDown className="text-black/100 text-1xl animate-bounce" style={{ animationDelay: '0.5s' }} />
        <FiChevronDown className="text-black/100 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }} />
        <p className="text-black/100 text-xs mt-2 font-general uppercase tracking-wider animate-pulse">
          <b>S</b>
          <b>C</b>
          <b>R</b>
          <b>O</b>
          <b>L</b>
          <b>L</b>
          <b> </b>
          <b>D</b>
          <b>O</b>
          <b>W</b>
          <b>N</b>  


        </p>
      </div>

        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mobile-optimized video preview - smaller and positioned to avoid button overlap */}
          <div
            className="mask-clip-path absolute z-50 cursor-pointer overflow-hidden 
                          size-40 top-1/2 right-8 -translate-y-1/2 rounded-full
                          sm:size-48 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-lg
                          md:size-64"
          >
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-full origin-center scale-150 object-cover object-center rounded-full sm:rounded-lg"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          <b>2</b>
          <b>0</b>
          <b>2</b>
          <b>5</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              H<b>a</b>C<b>a</b>TH<b>O</b>N
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the AI Arena <br /> Unleash Social Impact
            </p>

            <a href="#register" className="inline-block relative z-50">
              <Button
                id="register-now"
                title="Register Now"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </a>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>A</b>I
      </h1>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="animate-bounce"></div>
        <FiChevronDown
          className="text-black/100 text-1xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
        <FiChevronDown
          className="text-black/100 text-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
        <p className="text-white/100 text-xs mt-2 font-general uppercase tracking-wider animate-pulse">
          <b>S</b>
          <b>C</b>
          <b>R</b>
          <b>O</b>
          <b>L</b>
          <b>L</b>
          <b> </b>
          <b>D</b>
          <b>O</b>
          <b>W</b>
          <b>N</b>
        </p>
      </div>
    </div>
  );
};

export default Hero;
