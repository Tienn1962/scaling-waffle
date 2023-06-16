import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import RecipeCard from "../../components/RecipeCard";
import PaginatedList from "../../components/PaginatedList";
import Loading from "../../components/Loading";
import IngredientBadges from "../../components/IngredientBadges";
import axios from "axios";

export default () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFilters, setSearchFilters] = useState<string[]>([]);

  const fetchRecipes = async () => {
    setLoading(true);

    const response = await axios.get("/api/v1/recipes", {
      params: { page: currentPage, ingredients: searchFilters },
    });

    setRecipes(response.data.recipes);
    setCount(response.data.pagination.count);
    setLimit(response.data.pagination.limit);
    setLoading(false);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addFilter = (e) => {
    e.preventDefault();

    if (!!searchValue && !searchFilters.includes(searchValue)) {
      setSearchFilters((current) => [...current, searchValue]);
      // reset to the first page
      setCurrentPage(0);
    }
    setSearchValue("");
  };

  const removeFilter = (filter: string) => {
    setSearchFilters((current) => [...current.filter((f) => f !== filter)]);
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentPage, searchFilters]);

  return (
    <main className="m-60 flex flex-col items-center justify-center">
      <h1 className="mb-5 text-4xl">Recipes</h1>
      <form
        className="join"
        onSubmit={addFilter}
      >
        <input
          type="text"
          className="input join-item bg-black"
          placeholder="Search a recipe by ingredient"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          className="btn btn-success no-animation join-item"
          type="submit"
        >
          <PlusCircleIcon className="w-6 h-6" />
        </button>
      </form>
      <div className="m-10">
        <IngredientBadges
          badges={searchFilters}
          onClick={removeFilter}
        />
      </div>

      <PaginatedList
        data={recipes}
        count={count}
        limit={limit}
        onPageChange={onPageChange}
        item={(data) => (
          <RecipeCard
            key={data.id}
            title={data.title}
            image_url={data.image_url}
            author={data.author}
            ratings={data.ratings}
            prepTime={data.prep_time}
            cookTime={data.cook_time}
            ingredients={data.ingredients}
          ></RecipeCard>
        )}
      ></PaginatedList>

      <Loading loading={loading} />
    </main>
  );
};
