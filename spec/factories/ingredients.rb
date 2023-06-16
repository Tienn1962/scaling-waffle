# frozen_string_literal: true

FactoryBot.define do
  factory :ingredient do
    # since we need unique ingredient title, use lorem instead of food
    # otherwise we could hit the retry limit
    title { Faker::Lorem.unique.words(number: 3) }
  end
end
