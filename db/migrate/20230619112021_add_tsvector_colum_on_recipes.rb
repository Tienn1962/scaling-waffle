# frozen_string_literal: true

class AddTsvectorColumOnRecipes < ActiveRecord::Migration[7.0]
  def up
    execute <<~SQL
      ALTER TABLE recipes
      ADD COLUMN searchable tsvector;
    SQL

    # add the current ingredients into the tsvector column
    execute <<~SQL
      UPDATE recipes
      SET searchable = to_tsvector('english', coalesce(array_to_string(aggregated.ingredient_array, ' '), ''))
      FROM (
        SELECT id, t.ingredient_array
        FROM   recipes r
        JOIN  (
          SELECT ir.recipe_id AS id, array_agg(i.title) AS ingredient_array
          FROM   ingredients_recipes ir
          JOIN   ingredients i ON i.id = ir.ingredient_id
          GROUP  BY ir.recipe_id
        ) t USING (id)

      ) aggregated
      where aggregated.id = recipes.id
    SQL

    add_index :recipes, :searchable, using: :gin
  end

  def down
    remove_column :recipes, :searchable
  end
end
