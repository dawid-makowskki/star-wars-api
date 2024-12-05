# Star-wars swapi app

Simple application written in TypeScript using NestJS framework.

## How to run
Make sure you have Docker and Docker Compose installed on your machine.

Run
```bash
# build docker
$ docker-compose build

# run docker image
$ docker-compose up
```

## Development
Make sure you have pnpm installed
```bash
# install dependencies
$ pnpm install

# run project in development mode
$ pnpm start:dev 
```

## API Documentation

### Available collection endpoints
`/api/films`
`/api/vehicles`
`/api/species`
`/api/starships`
`/api/planets`

Collection endpoints return `PaginatedResource<T>` type:
```ts
type PaginatedResource<T> = {
	page: number;
	pages: number;
	data: Array<T>;
}
```
where `page` is current page, `pages` is total number of pages for given resource and `data` is list of items


Each collection endpoint can be filtered using query params e.g.
`/api/films?director=Lucas&producer=Gary`

Each collection endpoint can be paginated using `page` query param e.g.
`/api/films?page=2`, where page contains at most 2 items.

When `page` query param is not provided, `page` in response will equal `0`

### Available single resource endpoint
`/api/films/:id`
`/api/vehicles/:id`
`/api/species/:id`
`/api/starships/:id`
`/api/planets/:id`

Single resource endpoints return single item of type `T`

### Counting endpoints
`/api/unique-words-count`

Returns array of pairs of unique words from all films openings.
```ts
type UniqueWordsCountResponse = Array<[string, number]>
```

`/api/most-frequent-character-name`

Returns most used character name across all films openings, if multiple character names are used the same amount of time, return array of names.

```ts
type MostFrequentCharacterNameResponse = string | Array<string>
```

## Some design decisions explained

1. Usage of NestJS
NestJS was mentioned as prefered framework of choise for this tasks and I have the most experience working with backends written in it.
2. Using in-memory cache for caching
Although it is mentioned that for chaching I should use SQL or noSQL database, I made decision to stick with in-memory cache (which we can consider to be noSQL in-memory database) because it will have the best response times and the amount of data in `swapi` API is small enought to not be worried about used memory.
3. Single controller for whole API
I decided to create single controller class for entire API as the amount of endpoint is very small and endpoints are similar to each other. 
4. `swapi` API in its own service
This decision was made because the API is very slow and sometimes throws timeouts in busy hours. That makes tests unreliable and unpredictable. Extracting external API calls to separate service make it easier to mock it in testing.
5. `WordFinderService`
It may seems that there is no that much logic in this service but extracting it to its own service made it very easy to test just the business logic and not unnecessary API calls.
6. Usage of `ofetch`
NestJS provice `http-module` but it uses `Axios` under the hood which is quite old and still use `XMLHttpRequest`. I decided to use `ofetch` library which works in both browser and Node environments. It is well tested and is used as a building block of `Nuxt` framework.
7. Documentation in README
Considering the scale of the project, I decided that external website/swagger won't provide additional value but will be another part of the app to maintain. 
