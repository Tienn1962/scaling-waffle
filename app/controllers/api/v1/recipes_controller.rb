# frozen_string_literal: true

class Api::V1::RecipesController < ApplicationController
  def index
    limit = 25
    query = Recipe.all.includes(:ingredients).order(:id)

    if index_permitted_params[:ingredients]&.length&.positive?
      query = query.by_ingredient(index_permitted_params[:ingredients])

      count = query.count
      query = query.left_joins(:ingredients_recipes)
                   .group(:id, "#{PgSearch::Configuration.alias('recipes')}.rank")
                   .reorder('COUNT(ingredients_recipes.ingredient_id) ASC')
                   .limit(limit).offset(index_permitted_params[:page].to_i * limit)
    else
      count = query.count
    end

    recipes = query.limit(limit).offset(index_permitted_params[:page].to_i * limit)

    render json: {
      recipes: recipes.map do |recipe|
        recipe.serializable_hash(include: { ingredients: { only: :title } })
      end,
      pagination: { count:, limit: }
    }
  end

  def show
    recipe = Recipe.includes(:ingredients).find(show_permitted_params)

    render json: {
      recipe: recipe.serializable_hash(include: { ingredients: { only: :title } })
    }
  end

  private

  def show_permitted_params
    params.require(:id)
  end

  def index_permitted_params
    params.permit(:page, ingredients: [])
  end
end
