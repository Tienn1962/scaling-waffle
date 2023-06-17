# frozen_string_literal: true

# don't seed anything if any data exists
if Recipe.exists?
  puts 'nothing to seed'
  return
end

source = File.read(File.join(Rails.root, 'db', 'recipes-en.json'))
json = JSON.parse(source, symbolize_names: true)

inserted_ingredients = {}

recipe_id = 1

# Fly.io really doesn't give much memory and PG runs out of memory
# when bulk inserting everything in one go
json.each_slice(1000) do |batch|
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
    inserted_ingredients.merge!(
      Ingredient
        .insert_all(ingredients, returning: %i[title id])
        .to_h { |ingredient| [ingredient['title'], ingredient['id']] }
    )

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
end
