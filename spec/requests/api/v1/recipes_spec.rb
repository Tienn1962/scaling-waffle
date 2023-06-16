# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Recipes', type: :request do
  describe 'GET /index' do
    before(:all) { create_list(:recipe, 51) }

    it 'returns http success' do
      get '/api/v1/recipes'
      expect(response).to have_http_status(:success)
    end

    it 'returns 50 recipes' do
      get '/api/v1/recipes'
      expect(JSON.parse(response.body)['recipes'].length).to be(50)
    end

    it 'returns the correct ingredients per page' do
      get '/api/v1/recipes', params: { page: 1 }
      expect(JSON.parse(response.body)['recipes'].length).to be(1)
    end
  end
end
