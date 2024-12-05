export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  characters: Array<string>;
  planets: Array<string>;
  url: string;
  created: string;
  edited: string;
};

export type Species = {
  name: string;
  classification: string;
  designation: string;
  averege_height: string;
  avarage_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: Array<string>;
  films: Array<string>;
  url: string;
  created: string;
  edited: string;
};

export type Vehicle = {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: Array<string>;
  pilots: Array<string>;
  url: string;
  created: string;
  edited: string;
};

export type Starship = {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: Array<string>;
  pilots: Array<string>;
  url: string;
  created: string;
  edited: string;
};

export type Planet = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: Array<string>;
  films: Array<string>;
  url: Array<string>;
};

export type Person = {
  name: string;
};

export type PaginatedResource<T> = {
  page: number;
  pages: number;
  data: Array<T>;
};

export type SwapiResource<T> = {
  couunt: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};
