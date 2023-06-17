# Scaling Waffle

## Installation

Everything is set up with Docker, you should be able to simply run :

```sh
docker compose up

# set up the database
docker compose exec api sh -c 'rails db:setup'
```

The application will then be available at `localhost:3000`.

## Testing

To run tests, a specific docker compose service exists :

```sh
docker compose run --rm tests
```

## Improvements

- It would probably be a good idea to add a tsvector column to recipes
  to drastically improve the performance of the search feature

- A Next application would be more flexible to expand further, while
  also getting some bonus benefits (SSR, etc)

- Using a store would allow to keep ingredient filters as well as the current page
  when clicking a recipe and going back to the list

- Additionnally, adding the filters and current page in the URL would allow
  to reuse them when reloading the list
