#!/bin/sh

bundle
yarn

echo "running migrations"
rails db:migrate

echo "running Rspec"
bundle exec rspec

echo "running Jest"
yarn jest
