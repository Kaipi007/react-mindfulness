import { useState } from "react";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";

const RecipeCard = ({ recipe }) => (
  <div className="w-full h-full mb-4 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={recipe.image || '/fallback-food-image.jpg'}
        alt={`recipe for ${recipe.title}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback-food-image.png';
        }}
      />
    </a>

    <div className="p-5 text-center">
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {recipe.title}
        </h5>
      </a>

      <div className="mb-4">
        {recipe.readyInMinutes && (
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
            ⏱ {recipe.readyInMinutes} mins
          </span>
        )}
        {recipe.servings && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            🍴 Serves {recipe.servings}
          </span>
        )}
      </div>

      <button
        onClick={() => window.open(recipe.sourceUrl, '_blank')}
        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
      >
        View Recipe
      </button>
    </div>
  </div>
);

function RecipeSearch() {
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const fetchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=99&addRecipeInformation=true`;
      const response = await axios.get(url);
      setRecipes(response.data.results);
      setCurrentPage(1);
    } catch (err) {
      setError("Error fetching recipes. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IndexNavbar fixed />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Discover Delicious Recipes</h2>

        <div className="mb-8">
          <form onSubmit={fetchRecipes} className="flex gap-4 justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes..."
              className="w-64 mt-8 px-6 py-3 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-64 mt-8 px-6 py-3 bg-blueGray-600 border border-gray-300 text-white font-semibold rounded-lg shadow-sm hover:bg-blueGray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 px-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-lg mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-xl italic">
                  "The secret ingredient is always curiosity. Start searching! 🧑🍳"
                </p>
              </div>
            )
          )}
        </div>

        {/* pagination */}
        {recipes.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        )}
      </div>


    </>
  );
}

export default RecipeSearch;
