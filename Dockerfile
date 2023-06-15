FROM ruby:3.1.4-alpine3.18 as alpine-ruby

ENV HOME=/home/rails

RUN apk --update add postgresql14-client postgresql-dev build-base tzdata npm
RUN npm install --global yarn

RUN addgroup -S -g 1001 rails && adduser -u 1000 -S -G rails rails

WORKDIR ${HOME}
COPY --chown=rails:rails . .

VOLUME [ "${GEM_HOME}" ]

EXPOSE 3000

FROM alpine-ruby as dev-api

USER rails

RUN bin/bundle lock --add-platform x86_64-linux
RUN bundle
RUN yarn
