# frozen_string_literal: true

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner[:active_record].strategy = :transaction

    # ensure a clean state
    DatabaseCleaner[:active_record].clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.after(:suite) do
    DatabaseCleaner[:active_record].clean_with(:truncation)
  end
end
