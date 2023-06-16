# frozen_string_literal: true

FactoryBot.define do
  factory :recipe do
    title { Faker::Food.dish }
    cook_time { Faker::Number.between(from: 10, to: 30) }
    prep_time { Faker::Number.between(from: 10, to: 30) }
    ratings { Faker::Number.between(from: 0.0, to: 5.0) }

    ingredients { build_list :ingredient, [*1..10].sample }
  end
end
