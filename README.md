# React Mindfulness App

## Live Demo

🚀 **View Live Demo:** [https://react-mindfulness.pages.dev/](https://react-mindfulness.pages.dev/)

*Deployed on CloudFlare*

## Screenshots

### Web Version
![React Mindfulness App - Web Version](https://raw.githubusercontent.com/Kaipi007/react-mindfulness/master/web_version.png)

### Mobile Version
![React Mindfulness App - Mobile Version](https://raw.githubusercontent.com/Kaipi007/react-mindfulness/master/mobile_version.png)

*This application is designed to be fully responsive and works seamlessly on both mobile and web browsers.*

## Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [API Keys and Environment Variables](#api-keys-and-environment-variables)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## About the Project

This project is a modern, single-page application built with React to provide a calming and focused experience through various mindfulness tools. It is designed to be a peaceful digital space where users can engage in guided meditations, interactive breathing exercises, and set timers for focused work or study sessions. The application also includes features for user authentication, an AI chatbot, and a survey to gather user feedback. The application is built with a minimalist and distraction-free user interface to enhance the user's concentration and well-being.

## Features

* **Guided Meditations:** A library of guided sessions, including a `QuickMeditation` and a `SleepBetter` module, to help users relax and de-stress.
* **Breathing Exercises:** Interactive and visually guided breathing exercises to help users regulate their breath and calm their minds.
* **Daily Affirmations:** A section for daily affirmations to promote positive thinking.
* **To-Do List:** A simple to-do list to help users stay organized.
* **AI Chatbot:** An AI chatbot (`AIchatbot.jsx`) to provide interactive support and assistance.
* **Chatbot Survey:** A survey (`chatbot_Survey.jsx`) to gather user feedback on the chatbot's performance. (not implemented, can be further enhanced)
* **Self-Improvement Modules:** Features like `FeelStronger` to help users build mental resilience.
* **User Authentication:** An authentication system (`auth` folder) to manage user sessions.
* **Minimalist UI:** A clean and intuitive design optimized for a distraction-free user experience.
* **Responsive Design:** The application is accessible and user-friendly on both desktop and mobile devices.

## Technologies Used

* **Frontend:**
  * [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
  * JavaScript (ES6+)
  * HTML5
  * CSS3
* **Package Manager:**
  * [npm](https://www.npmjs.com/)
* **API:**
  * [OpenAI](https://openai.com/)
  * [Google Gemini API](https://ai.google.dev/)
  * [Spoonacular API](https://spoonacular.com/food-api)
  * [Edamame API](https://developer.edamam.com/)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```
   git clone [https://github.com/Kaipi007/react-mindfulness.git](https://github.com/Kaipi007/react-mindfulness.git)
   ```
2. **Navigate into the project directory:**
   ```
   cd react-mindfulness
   ```
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Start the development server:**
   ```
   npm start
   ```
   The application will typically open in your browser at `http://localhost:3000`.

### API Keys and Environment Variables
This project uses several APIs that require authentication. To protect your API keys and ensure the application runs correctly, you need to create a `.env` file in the root of your project.

1.  **Create a `.env` file** in the root directory of the project.
2.  **Add your API keys** to the file using the following format:
    ```
    VITE_EDAMAM_APP_ID=your_edamame_app_id
    VITE_EDAMAM_APP_KEY=your_edamame_app_key
    VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
    VITE_OPENAI_API_KEY=your_openai_api_key
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
    VITE_OPENROUTER_API_KEY=your_openrouter_api_key
    ```
    **Note:** Replace the placeholder values with your actual API keys.
3.  Ensure your `.gitignore` file includes `.env` to prevent your keys from being accidentally committed to version control.

## Project Structure
This project follows a standard React application structure, organized for modularity and maintainability.

```
react-mindfulness/
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   ├── Cards/
│   │   ├── Dropdowns/
│   │   ├── Footers/
│   │   ├── Headers/
│   │   ├── Maps/
│   │   ├── Navbars/
│   │   ├── Sidebar/
│   │   └── ...
│   ├── views/
│   │   ├── services/
│   │   │   ├── DailyAffirmation.jsx
│   │   │   ├── FeelStronger.jsx
│   │   │   ├── Meditation.jsx
│   │   │   ├── QuickMeditation.jsx
│   │   │   ├── SleepBetter.jsx
│   │   │   └── ToDoList.jsx
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── Edamame/
│   │   ├── AIchatbot.jsx
│   │   ├── chatbot_Survey.jsx
│   │   ├── exercise.jsx
│   │   └── Index.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Contributing
Contributions are welcome! If you find a bug, have a feature request, or want to improve the code, please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature/your-feature-name` or `bugfix/issue-description`
3. **Make your changes.**
4. **Commit your changes:** `git commit -m 'feat: Add new feature' ` or `fix: Resolve bug`
5. **Push to your branch:** `git push origin feature/your-feature-name`
6. **Open a Pull Request** against the `master` branch of this repository.

Please ensure your code adheres to the project's coding style and includes relevant tests if applicable.

## License
This project is licensed under the **MIT License**.

**MIT License**

Copyright (c) 2025 Kaipi007

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements
* [React Documentation](https://reactjs.org/docs)
* [The Open Source Community](https://opensource.guide/)

## Contact
* **GitHub:** [Kaipi007](https://github.com/Kaipi007)
* **Project Link:** [https://github.com/Kaipi007/react-mindfulness](https://github.com/Kaipi007/react-mindfulness)
