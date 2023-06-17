# frozen_string_literal: true

# Fly.io really doesn't give much memory so we use data streaming with YAJL for bulk inserts

require 'json/streamer'
require 'yajl/ffi'

# don't see if data exists
if Recipe.exists?
  puts "nothing to seed"
  return
end

batch = []
inserted_ingredients = {}
recipe_id = 1

source = File.open(File.join(Rails.root, 'db', 'recipes-en.json'))

streamer = Json::Streamer.parser(
  file_io: source,
  event_generator: Yajl::FFI::Parser.new
)

streamer.get(nesting_level: 1, symbolize_keys: true) do |recipe|
  batch << recipe

  if batch.length == 500
    ingredients = Set[]
    recipes = []
    links = []

    ActiveRecord::Base.transaction do
      batch.each do |recipe|
        recipe[:ingredients].each do |ingredient|
          ingredients << {
            title: ingredient
          }
        end
      end

      puts "importing #{ingredients.length} ingredients"
      inserted_ingredient = Ingredient
                            # insert_all without a bang ignores duplicates
                            .insert_all(ingredients, returning: %i[title id])
                            # groups all ingredients by title => id for faster reads
                            .to_h { |ingredient| [ingredient['title'], ingredient['id']] }

      inserted_ingredients.merge!(inserted_ingredient)

      puts 'resolving associations'
      batch.each do |recipe|
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

    batch = []
  end
end
