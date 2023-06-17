# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Recipes', type: :request do
  describe 'GET /index' do
    subject { JSON.parse(response.body)['recipes'] }

    context 'without search params' do
      before(:each) { create_list(:recipe, 26) }

      it 'returns http success' do
        get '/api/v1/recipes'
        expect(response).to have_http_status(:success)
      end

      it 'returns 50 recipes' do
        get '/api/v1/recipes'
        expect(subject.length).to be(25)
      end

      it 'returns the correct ingredients per page' do
        get '/api/v1/recipes', params: { page: 1 }
        expect(subject.length).to be(1)
      end
    end

    context 'with search params' do
      let(:onion) { create(:ingredient, title: '1 onion') }
      let(:potato) { create(:ingredient, title: '1 potato') }
      let(:chicken) { create(:ingredient, title: 'chicken') }
      let(:recipe_with_chicken) { create(:recipe, ingredients: [chicken, onion]) }
      let(:recipe_with_potatoes) { create(:recipe, ingredients: [onion, potato]) }

      before(:each) do
        recipe_with_chicken
        recipe_with_potatoes
      end

      it 'only returns the recipe with chicken' do
        get '/api/v1/recipes', params: { ingredients: %w[chicken onion] }

        expect(subject.length).to be(1)
        expect(subject.first['id']).to be(recipe_with_chicken.id)
      end

      it 'returns both recipes' do
        get '/api/v1/recipes', params: { ingredients: %w[onion] }

        expect(subject.length).to be(2)
        expect(subject.first['id']).to be(recipe_with_chicken.id)
        expect(subject.last['id']).to be(recipe_with_potatoes.id)
      end
    end
  end

  describe 'GET /show' do
    subject { JSON.parse(response.body)['recipe'] }

    let(:chicken) { create(:ingredient, title: 'chicken breast') }
    let(:potato) { create(:ingredient, title: '1 potato') }
    let(:recipe_with_chicken) { create(:recipe, id: 1, ingredients: [chicken]) }
    let(:recipe_with_potatoes) { create(:recipe, id: 2, ingredients: [potato]) }

    before(:each) do
      recipe_with_chicken
      recipe_with_potatoes
    end

    it 'returns http success' do
      get '/api/v1/recipes/1'
      expect(response).to have_http_status(:success)
    end

    it 'returns recipe_with_chicken' do
      get '/api/v1/recipes/1'
      expect(subject).to eq(
        JSON.parse(recipe_with_chicken.serializable_hash(include: { ingredients: { only: :title } }).to_json)
      )
    end

    it 'returns recipe_with_potatoes' do
      get '/api/v1/recipes/2'
      expect(subject).to eq(
        JSON.parse(recipe_with_potatoes.serializable_hash(include: { ingredients: { only: :title } }).to_json)
      )
    end
  end
end
