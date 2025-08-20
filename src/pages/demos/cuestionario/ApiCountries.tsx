
export interface Country {
  name: string; // name.common
  official: string; // name.official
  capital: string; // [0]
  continent: string; // [0]
  fifa: string;
  region: string;
  subregion: string;
  language: string; // [0]
  area: string;
  population: string;
  flag: string;
  currency: string; //name+' '+symbol
  gmap: string // maps
}

export interface CountryData {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  continents: string[];
  fifa: string;
  region: string;
  subregion: string;
  area: string;
  population: string;
  languages: { [key: string]: string;};
  flags: {
    png: string;
    svg: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  maps: { 
    googleMaps: string, 
    openMaps: string };
}

export default async function getCountries(limit: number = 0): Promise<Country[]> 
{
  const url = "https://restcountries.com/v3.1/independent?status=true&fields=name,capital,continents,fifa,region,subregion,languages,area,population,flags,currencies,maps";
  // https://restcountries.com/v3.1/all?limit=10 => LIMIT

  try {
    // Realiza la petición fetch
    const response = await fetch(url);

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parsea la respuesta como JSON y la tipa como un array de CountryData
    const data: CountryData[] = await response.json();

    // Transformamos los datos de la API a un array plano más fácil de manejar
    const countries = data.map(country => {
      return {
        name: country.name.common,
        official: country.name.official,
        capital: country.capital[0],
        continent: country.continents[0],
        fifa: country.fifa,
        region: country.region,
        subregion: country.subregion,
        language: Object.values(country.languages)[0]+' ('+Object.keys(country.languages)[0].toLocaleUpperCase()+')',
        flag: country.flags.svg,
        area: country.area+' km²',
        population: country.population+' humans',
        gmap: country.maps.googleMaps,
        currency: Object.values(country.currencies)[0].symbol+' '+Object.keys(country.currencies)[0]
      };
    });

    // Retorna el array aleatorio de algunos países
    return arrayShuffle(countries);
  }
  catch (error) {
    // Maneja cualquier error de la petición y retorna un array vacío
    console.error("API Error fetching data:", error);

    return [];
  }
}

/**
 * Usamos el algoritmo de Fisher-Yates para mezclar y devolver una copia del array
 * @param {T[]} elements El array del que se seleccionarán y mezclarán los elementos
 * @returns {T[]} Un nuevo array con los elementos aleatorios.
 */
export function arrayShuffle<T>(elements: T[]): T[] {
  
  const shuffled = [...elements];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
