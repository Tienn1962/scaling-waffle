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
