# frozen_string_literal: true

class Recipe < ApplicationRecord
  has_many :ingredients_recipes
  has_many :ingredients, through: :ingredients_recipes

  validates_presence_of :title, :cook_time, :prep_time, :ratings
end
