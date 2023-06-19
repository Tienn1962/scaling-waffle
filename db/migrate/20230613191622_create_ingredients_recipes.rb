# frozen_string_literal: true

class CreateIngredientsRecipes < ActiveRecord::Migration[7.0]
  def change
    create_join_table :ingredients, :recipes, column_options: { index: true, foreign_key: true } do |t|
      t.primary_key :id
    end
  end
end
