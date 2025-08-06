import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatboxSurvey = () => {
    const navigate = useNavigate();

    // Form state
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [goal, setGoal] = useState("gain muscle"); // Default value
    const [mealFrequency, setMealFrequency] = useState("3"); // Changed to string to match select value types
    const [preference, setPreference] = useState([]);
    const [allergy, setAllergy] = useState("");
    const [doesWorkout, setDoesWorkout] = useState("no");
    const [workoutFrequency, setWorkoutFrequency] = useState("");
    const [workoutDuration, setWorkoutDuration] = useState("");

    // Handle preference selection
    const handlePreferenceChange = (e) => {
        const value = e.target.value;
        setPreference((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Submit function
    const handleSubmit = () => {
        // Basic validation example (you can expand this)
        if (!gender || !age || !goal || !mealFrequency) {
            alert("Please fill in all required fields (Gender, Age, Goal, Meal Frequency).");
            return;
        }
        if (preference.includes("allergic") && !allergy) {
            alert("Please enter your allergens if 'allergic' is selected.");
            return;
        }
        if (doesWorkout === "yes" && (!workoutFrequency || !workoutDuration)) {
            alert("Please enter workout frequency and duration if you work out.");
            return;
        }

        const userData = {
            gender,
            age: Number(age), // Convert age to number
            goal,
            mealFrequency: Number(mealFrequency), // Convert meal frequency to number
            preference,
            allergy: preference.includes("allergic") ? allergy : null,
            workout: doesWorkout,
            workoutDetails: doesWorkout === "yes" ? { frequency: Number(workoutFrequency), duration: Number(workoutDuration) } : null // Convert to numbers
        };

        // Save user data
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to chatbox
        navigate("/ai-chatbox");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900"> {/* Changed background to dark gray */}

            <div className="bg-white w-2/3 max-w-3xl p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl" onClick={() => navigate("/")}>
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tell us about yourself</h2>

                <div className="grid grid-cols-1 gap-y-5">
                    {/* Gender (Radio Buttons) */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Gender:</label>
                        <div className="flex gap-6">
                            {["male", "female"].map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={gender === option}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="form-radio h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" // Accent color changed to emerald
                                    />
                                    <span className="capitalize text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Age Input */}
                    <div>
                        <label htmlFor="age" className="block font-semibold text-gray-700 mb-2">Age:</label>
                        <input
                            id="age"
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" // Accent color changed
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="1"
                            placeholder="Enter your age"
                        />
                    </div>

                    {/* Goal Selection */}
                    <div>
                        <label htmlFor="goal" className="block font-semibold text-gray-700 mb-2">Goal:</label>
                        <select
                            id="goal"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none bg-white pr-8" // Accent color changed
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        >
                            <option value="gain muscle">Gain Muscle</option>
                            <option value="eat healthier">Eat Healthier</option>
                            <option value="lose weight">Lose Weight</option>
                        </select>
                    </div>

                    {/* Meal Frequency Selection */}
                    <div>
                        <label htmlFor="mealFrequency" className="block font-semibold text-gray-700 mb-2">Meal Frequency:</label>
                        <select
                            id="mealFrequency"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none bg-white pr-8" // Accent color changed
                            value={mealFrequency}
                            onChange={(e) => setMealFrequency(e.target.value)}
                        >
                            <option value="2">2 Meals</option>
                            <option value="3">3 Meals</option>
                            <option value="4">4 Meals</option>
                            <option value="5">5 Meals</option>
                        </select>
                    </div>

                    {/* Dietary Preferences */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Dietary Preferences:</label>
                        <div className="flex flex-wrap gap-6">
                            {["gluten-free", "vegan", "allergic"].map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={preference.includes(option)}
                                        onChange={handlePreferenceChange}
                                        className="form-checkbox h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" // Accent color changed
                                    />
                                    <span className="capitalize text-gray-800">{option.replace('-', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Allergy Input (Only if "allergic" is selected) */}
                    {preference.includes("allergic") && (
                        <div>
                            <label htmlFor="allergy" className="block font-semibold text-gray-700 mb-2">Please specify your allergies:</label>
                            <input
                                id="allergy"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" // Accent color changed
                                placeholder="e.g., peanuts, dairy, shellfish"
                                value={allergy}
                                onChange={(e) => setAllergy(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Do You Work Out? (Radio Buttons) */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Do you work out?</label>
                        <div className="flex gap-6">
                            {["yes", "no"].map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="doesWorkout"
                                        value={option}
                                        checked={doesWorkout === option}
                                        onChange={(e) => setDoesWorkout(e.target.value)}
                                        className="form-radio h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" // Accent color changed
                                    />
                                    <span className="capitalize text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Workout Details (Only if "yes" is selected) */}
                    {doesWorkout === "yes" && (
                        <div className="flex flex-col space-y-5">
                            <div>
                                <label htmlFor="workoutFrequency" className="block font-semibold text-gray-700 mb-2">Workout Frequency (per week):</label>
                                <input
                                    id="workoutFrequency"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" // Accent color changed
                                    value={workoutFrequency}
                                    onChange={(e) => setWorkoutFrequency(e.target.value)}
                                    min="1"
                                    placeholder="e.g., 3 (times per week)"
                                />
                            </div>

                            <div>
                                <label htmlFor="workoutDuration" className="block font-semibold text-gray-700 mb-2">Workout Duration (minutes per session):</label>
                                <input
                                    id="workoutDuration"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" // Accent color changed
                                    value={workoutDuration}
                                    onChange={(e) => setWorkoutDuration(e.target.value)}
                                    min="1"
                                    placeholder="e.g., 60 (minutes)"
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        className="bg-blueGray-700 hover:bg-blueGray-400 text-white font-bold py-3 px-4 rounded-md mt-6 w-full transition duration-300 ease-in-out" // Button color changed
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatboxSurvey;