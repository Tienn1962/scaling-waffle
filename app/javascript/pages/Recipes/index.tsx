import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import PaginatedList from "../../components/PaginatedList";
import Loading from "../../components/Loading";

export default () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);

  const fetchRecipes = async (page: number) => {
    setLoading(true);

    const data = await (await fetch(`/api/v1/recipes?page=${page}`)).json();

    setRecipes(data.recipes);
    setCount(data.pagination.count);
    setLimit(data.pagination.limit);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  return (
    <main className="m-50 flex flex-col items-center justify-center">
      <PaginatedList
        data={recipes}
        count={count}
        limit={limit}
        onPageChange={fetchRecipes}
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
