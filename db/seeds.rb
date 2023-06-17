# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'ffi_yajl'

source = File.open(File.join(Rails.root, 'db', 'recipes-en.json'))
begin
  json = FFI_Yajl::Parser.parse(source, { symbolize_keys: true })
ensure
  source.close
end

ingredients = Set[]
recipes = []
links = []

ActiveRecord::Base.transaction do
  json.each do |recipe|
    recipe[:ingredients].each do |ingredient|
      ingredients << {
        title: ingredient
      }
    end
  end

  puts "importing ~#{ingredients.length} ingredients (duplicates are ignored)"
  inserted_ingredients = Ingredient
                         # insert_all without a bang ignores duplicates
                         .insert_all(ingredients, returning: %i[title id])
                         # groups all ingredients by title => id for faster reads
                         .to_h { |ingredient| [ingredient["title"], ingredient["id"]] }

  puts 'resolving associations'
  recipe_id = 1
  json.each do |recipe|
    recipe[:ingredients].each do |ingredient|
      links << {
        ingredient_id: inserted_ingredients[ingredient],
        recipe_id:
      }
    end

    recipes << {
      id: recipe_id,
      title: recipe[:title],
      cook_time: recipe[:cook_time],
      prep_time: recipe[:prep_time],
      ratings: recipe[:ratings],
      cuisine: recipe[:cusine].blank? ? nil : recipe[:cuisine],
      category: recipe[:category].blank? ? nil : recipe[:category],
      author: recipe[:author].blank? ? nil : recipe[:author],
      image_url: recipe[:image].blank? ? nil : recipe[:image]
    }

    recipe_id += 1
  end

  puts "importing #{recipes.length} recipes"
  Recipe.insert_all!(recipes)

  puts "importing #{links.length} associations"
  IngredientsRecipe.insert_all!(links)
end
