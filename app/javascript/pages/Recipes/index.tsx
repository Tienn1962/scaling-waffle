import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import RecipeCard from "../../components/RecipeCard";
import PaginatedList from "../../components/PaginatedList";
import Loading from "../../components/Loading";
import IngredientBadges from "../../components/IngredientBadges";
import axios from "axios";
import { Link } from "react-router-dom";
import Show from "../../components/Show";
import search, { SearchState } from "../../stores/search";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const filters = useSelector((state: SearchState) => state.filters);
  const page = useSelector((state: SearchState) => state.page);
  const dispatch = useDispatch();

  const fetchRecipes = async () => {
    setLoading(true);

    const response = await axios.get("/api/v1/recipes", {
      params: {
        page: page,
        ingredients: filters,
      },
    });

    setRecipes(response.data.recipes);
    setCount(response.data.pagination.count);
    setLimit(response.data.pagination.limit);
    setLoading(false);
  };

  const onPageChange = (page: number) => {
    dispatch(search.actions.setPage(page));
  };

  const addFilter = (e) => {
    e.preventDefault();

    if (!!searchValue) {
      dispatch(search.actions.addFilter(searchValue));
    }
    setSearchValue("");
  };

  const removeFilter = (filter: string) => {
    dispatch(search.actions.removeFilter(filter));
  };

  useEffect(() => {
    fetchRecipes();
  }, [filters, page]);

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
            // prevent user from entering numbers
            setSearchValue(e.target.value.replace(/[^a-z]/gi, ""));
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
          badges={filters}
          onClick={removeFilter}
        />
      </div>

      <PaginatedList
        data={recipes}
        count={count}
        limit={limit}
        page={page}
        onPageChange={onPageChange}
        item={(data) => (
          <Link
            key={data.id}
            to={`/recipes/${data.id}`}
            className="m-5"
          >
            <RecipeCard
              title={data.title}
              image_url={data.image_url}
              author={data.author}
              ratings={data.ratings}
              prepTime={data.prep_time}
              cookTime={data.cook_time}
              ingredients={data.ingredients}
            ></RecipeCard>
          </Link>
        )}
      ></PaginatedList>

      <Show if={loading}>
        <Loading />
      </Show>
    </main>
  );
};
