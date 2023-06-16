# frozen_string_literal: true

class Api::V1::RecipesController < ApplicationController
  def index
    limit = 50
    query = Recipe.all.includes(:ingredients).order(:id)

    if permitted_params[:ingredients]&.length&.positive?
      query = query.by_ingredient(permitted_params[:ingredients])
    end

    count = query.count
    recipes = query.limit(limit).offset(permitted_params[:page].to_i * limit)

    render json: {
      recipes: recipes.map do |recipe|
        recipe.serializable_hash(include: { ingredients: { only: :title } })
      end,
      pagination: { count:, limit: }
    }
  end

  private

  def permitted_params
    params.permit(:page, ingredients: [])
  end
end
