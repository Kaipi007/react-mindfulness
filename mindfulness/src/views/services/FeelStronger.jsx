import { useState, useEffect, useRef } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import affirmAudio from "assets/audio/FreeMindfulnessMountainMeditation.mp3"; // or another calming audio file
import 'assets/styles/feel-stronger.css'; // Ensure this is the correct CSS file

const FeelStronger = () => {
  const affirmations = [
    "I am resilient and capable of overcoming any challenge.",
    "My mind and body are strong, calm, and capable of handling stress.",
    "I choose peace and strength over fear and anxiety.",
    "I release stress and embrace my inner strength.",
    "With every breath, I feel more empowered and at ease.",
    "I trust in my ability to overcome difficult moments with grace.",
    "I am grounded, calm, and confident in myself.",
    "Each day, I grow stronger, more resilient, and more peaceful.",
  ];

  const [affirmation, setAffirmation] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getRandomAffirmation();

    // Change quotes every 5 seconds
    const interval = setInterval(() => {
      getRandomAffirmation();
    }, 5000);

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

      <div className="feel-stronger-ripple-effect h-screen flex flex-col items-center justify-center text-white text-center p-6 feel-stronger-moving-bg">
        <h1 className="text-4xl font-bold mb-6">💪 I am Enough 💪</h1>
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

export default FeelStronger;
