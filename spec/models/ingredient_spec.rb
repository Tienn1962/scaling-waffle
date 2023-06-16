# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  describe 'factories' do
    specify 'the default factory produces a valid instance' do
      expect(build(:ingredient).valid?).to be(true)
    end
  end

  describe 'validates' do
    subject { ingredient.valid? }

    %i[title].each do |field|
      context do
        let(:ingredient) { build(:ingredient, field => nil) }
        it "is invalid when #{field} is empty" do
          expect(subject).to be(false)
        end
      end
    end
  end
end
