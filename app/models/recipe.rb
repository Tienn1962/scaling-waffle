# frozen_string_literal: true

class Recipe < ApplicationRecord
  include ActiveModel::Serialization
  include PgSearch::Model

  pg_search_scope :by_ingredient, associated_against: { ingredients: :title }

  has_many :ingredients_recipes
  has_many :ingredients, through: :ingredients_recipes

  validates_presence_of :title, :cook_time, :prep_time, :ratings
end
