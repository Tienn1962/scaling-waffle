# frozen_string_literal: true

class Ingredient < ApplicationRecord
  include ActiveModel::Serialization

  has_many :ingredients_recipes
  has_many :recipes, through: :ingredients_recipes

  validates :title, presence: true, uniqueness: true
end
