# frozen_string_literal: true

class IngredientsRecipe < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
end
