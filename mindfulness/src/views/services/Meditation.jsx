import React from "react";
import { Link } from "react-router-dom";
import affirmationImage from "assets/img/affirmation.png";
import meditateImage from "assets/img/harmony.png";
import sleepImage from "assets/img/sleeping.png";
import stressImage from "assets/img/stress-management.png";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";

const cards = [
  {
    title: "Daily Affirmation",
    color: "bg-purple-200",
    image: affirmationImage,
    link: "/daily-affirmation",
    description: "Start your day with empowering positive statements 🌟",
  },
  {
    title: "Quick Meditations",
    color: "bg-lightBlue-200",
    image: meditateImage,
    link: "/quick-meditation",
    description: "Find calm in chaos with 5 minutes break 🧘",
  },
  {
    title: "Sleep Better",
    color: "bg-blueGray-200",
    image: sleepImage,
    link: "/sleep-better",
    description: "Fall asleep faster with guided wind-down routines 🌙",
  },
  {
    title: "Feel Stronger",
    color: "bg-orange-200",
    image: stressImage,
    link: "/feel-stronger",
    description: "Immediate relief techniques for tough moments 🌤️",
  },
];

const Meditations = () => {
  return (
    <>
      <IndexNavbar fixed />

      {/* 💡 Force 2-column layout on small screens and above */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 pt-24">
        {cards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className={`min-h-[150px] p-4 ${card.color} border border-gray-200 mb-2 rounded-lg 
              shadow-sm hover:brightness-95 dark:border-gray-700 
              flex items-center transition-all duration-200`}
          >
            <div
              className={` flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-lg`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>

            <div className="ml-4 flex-1 flex flex-col justify-center">
              <h3 className="text-xl md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-base md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Meditations;
