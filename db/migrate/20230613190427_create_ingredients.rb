# frozen_string_literal: true

class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :title, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
