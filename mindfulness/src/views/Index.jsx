/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footers/Footer.jsx";

// Import your images at the top
import mindfulnessImage from "assets/img/mindfulness.jpg";
import toDoListImage from "assets/img/todolistImage.jpg";
import meditationImage from "assets/img/meditation.jpg";
import aiChatbotImage from "assets/img/ai-chatbot.jpg";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap justify-center mt-50">
          {/* Image Column: Uses mindfulness.jpg */}
          <div className="items-center md:w-4/12 px-4 order-1 md:order-2 mt-4 mb-4 md:mb-0">
            <img
              className="w-full max-w-md mx-auto mt-4 md:mr-0 -mt-6 md:mt-4 transform hover:scale-105 transition-transform duration-300"
              src={mindfulnessImage}
              alt="Mindfulness"
            />
          </div>

          {/* Text Content Column */}
          <div className="w-full md:w-8/12 lg:w-6/12 px-4 order-2 md:order-1 md:-mt-4">
            {/* Added text-center to this div to center all text content within it */}
            <div className="pt-8 sm:pt-0 text-center">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Mindfulness : A Place to Take Care of Your Soul!
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Because your brain deserves a break…
                <br />
                Just let the AI do the thinking while you chill.
              </p>
              {/* The buttons for "Recipe Search" and "GitHub Star" would go here,
            and their container should also have `flex justify-center` if not already.
            (Based on previous interactions, this was likely already handled) */}
              <div className="flex justify-center mt-10">
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  rel="noreferrer"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Check it out at Github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Meditation Feature Section (First Container) */}
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto mt-24">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-16">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <img
                  alt="meditation"
                  src={meditationImage}
                  className="align-middle mt-12 rounded-t-lg mx-auto w-[275px] h-[249px] object-cover"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-200 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-blueGray-500">
                    Take a break, meditate!
                  </h4>
                  <p className="text-md font-light mt-2 text-blueGray-500">
                    Planning your daily tasks today ensures clarity and boosts
                    productivity. Stay organized and achieve your goals with our
                    smart To-Do list.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/meditation"
                      className="text-white font-bold px-6 py-3 rounded outline-none focus:outline-none bg-blueGray-700 hover:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg transition-all duration-150"
                    >
                      Meditate
                    </Link>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* To-Do List Feature Section (Second Container) */}
      <section className="pb-40 relative bg-blueGray-100 mt-12">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto mt-24">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-600">
                <img
                  alt="To-Do List"
                  src={toDoListImage}
                  className="align-middle rounded-t-lg mt-12 mx-auto w-[275px] h-[249px] object-cover"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-600 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-blueGray-100">
                    Plan Your Day with Ease!
                  </h4>
                  <p className="text-md font-light mt-2 text-blueGray-100">
                    Planning your daily tasks today ensures clarity and boosts
                    productivity. Stay organized and achieve your goals with our
                    smart To-Do list.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/to-do-list"
                      className="text-white font-bold px-6 py-3 rounded outline-none focus:outline-none bg-blueGray-700 hover:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg transition-all duration-150"
                    >
                      To Do List
                    </Link>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI ChatBot Feature Section (Third Container) */}
      <section className="pb-40 relative bg-blueGray-100 mt-12">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto mt-24">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <img
                  alt="To-Do List"
                  src={aiChatbotImage}
                  className="align-middle rounded-t-lg mt-12 mx-auto w-[275px] h-[249px] object-cover"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-200 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-blueGray-500">
                    Do you need someonone to talk to?
                  </h4>
                  <p className="text-md font-light mt-2 text-blueGray-500">
                    Talk to Mindmellow, your best AI friend! She keeps all your
                    secrets and is always there to listen.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/ai-chatbox"
                      className="text-white font-bold px-6 py-3 rounded outline-none focus:outline-none bg-blueGray-700 hover:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg transition-all duration-150"
                    >
                      Mind Mellow 🌿💛☁️
                    </Link>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  Thanks for scrolling until the end of this page
                </span>
              </p>
              <h3 className="font-semibold text-3xl mt-4">
                Check out my other React Project Here!
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                This is a simple React project that shows users the weather with
                the OpenWeatherMap API. It displays current weather conditions,
                temperature, humidity, and wind speed.
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="https://github.com/Kaipi007/react-weather-app.git"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  rel="noreferrer"
                >
                  Check out the code on GitHub
                </a>
                <a
                  href="https://react-weather-app-aob.pages.dev/"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  rel="noreferrer"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Live Viewing</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
