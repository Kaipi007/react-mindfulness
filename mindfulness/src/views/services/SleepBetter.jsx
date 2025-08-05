import { useState, useEffect, useRef } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import affirmAudio from "assets/audio/45MinuteJustBells.mp3";
import 'assets/styles/sleep-better.css'; // Ensure this is the correct CSS file

const SleepBetter = () => {
  const affirmations = [
    "I am ready to drift into a peaceful and restful sleep.",
    "My body and mind are calm, and I embrace the comfort of sleep.",
    "I release all tension and welcome peaceful rest.",
    "Every breath I take brings me closer to deep relaxation.",
    "I am grateful for this moment of calm and tranquility.",
    "Sleep comes easily and peacefully to me tonight.",
    "I trust my body to rejuvenate as I sleep.",
    "My mind is quiet, and I welcome restful sleep.",
    "I am surrounded by peaceful energy, and sleep embraces me.",
    "With each breath, I feel more relaxed and ready to rest."
  ];

  const [affirmation, setAffirmation] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getRandomAffirmation();

    // Change quotes every 10 seconds
    const interval = setInterval(() => {
      getRandomAffirmation();
    }, 10000);

    const handleUserActivity = () => {
      setShowNavbar(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowNavbar(false), 10000);
    };

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
    };
  }, []);

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {showNavbar && <IndexNavbar />}

      <div className="sleep-better-ripple-effect h-screen flex flex-col items-center justify-center text-white text-center p-6 sleep-better-moving-bg">
        <h1 className="text-4xl font-bold mb-6">🌙✨ Good Night, you are loved!🌙✨</h1>
        <p className="text-2xl italic max-w-lg">{affirmation}</p>

        <div className="mt-6 flex flex-row space">
          <button
            onClick={getRandomAffirmation}
            className="mr-3 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition"
          >
            New Affirmation
          </button>

          <button
            onClick={toggleAudio}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition"
          >
            {isPlaying ? "Pause Audio" : "Play Audio"}
          </button>
        </div>

        {/* Hidden Audio Player */}
        <audio ref={audioRef} src={affirmAudio} />
      </div>
    </>
  );
};

export default SleepBetter;
