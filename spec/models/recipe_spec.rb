# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Recipe, type: :model do
  describe 'factories' do
    specify 'the default factory produces a valid instance' do
      expect(build(:recipe).valid?).to be(true)
    end
  end

  describe 'validates' do
    subject { recipe.valid? }

    %i[title cook_time prep_time ratings].each do |field|
      context do
        let(:recipe) { build(:recipe, field => nil) }
        it "is invalid when #{field} is empty" do
          expect(subject).to be(false)
        end
      end
    end
  end
end
