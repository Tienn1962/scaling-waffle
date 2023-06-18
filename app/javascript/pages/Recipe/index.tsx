import {
  ArrowLeftIcon,
  ClockIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Show from "../../components/Show";
import Loading from "../../components/Loading";

export default () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchRecipe = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/recipes/${id}`);

      setRecipe(response.data.recipe);
    } catch (e) {
      if (e.isAxiosError) {
        setError(`${e.response.status} ${e.response.statusText}`);
      } else {
        throw e;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <main className="flex flex-col justify-center">
      <Show
        if={!loading}
        fallback={<Loading />}
      >
        <div className="hero min-h-screen">
          <div className="hero-content rounded-lg bg-neutral">
            <div className="join join-vertical">
              <Link
                className="join-item flex btn bg-black no-animation"
                to="/recipes"
              >
                <ArrowLeftIcon className="w-6 h-6" />
                Back
              </Link>
              <img
                src={recipe.image_url}
                className="join-item max-w-sm rounded-lg shadow-2xl"
              />
            </div>

            <Show
              if={!error}
              fallback={<p>{error}</p>}
            >
              <div>
                <h1 className="text-4xl">{recipe.title}</h1>
                <Show if={!!recipe.author}>
                  <div className="flex">
                    <UserIcon className="h-6 w-6" />
                    <span className="pl-2">{recipe.author}</span>
                  </div>
                </Show>
                <div className="flex">
                  <ClockIcon className="h-6 w-6" />
                  <span className="pl-2">
                    {recipe.prep_time}m | {recipe.cook_time}m
                  </span>
                </div>
                <div className="flex">
                  <StarIcon className="h-6 w-6" />
                  <span className="pl-2">{recipe.ratings}/5</span>
                </div>
                <div className="flex">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="pl-2">Ingredients :</span>
                </div>

                <ul className="m-5 flex flex-col list-disc">
                  {recipe.ingredients?.map((ingredient) => (
                    <li key={ingredient.title}>{ingredient.title}</li>
                  ))}
                </ul>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </main>
  );
};
