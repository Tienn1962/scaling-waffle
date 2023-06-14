FROM ruby:3.1.4-alpine3.18 as alpine-ruby

ENV HOME=/home/rails

RUN apk --update add postgresql14-client postgresql-dev build-base tzdata

RUN addgroup -S -g 1001 rails && adduser -u 1000 -S -G rails rails

WORKDIR ${HOME}
COPY --chown=rails:rails . .

VOLUME [ "${GEM_HOME}" ]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

FROM alpine-ruby as dev-api

USER rails

RUN bundle install
