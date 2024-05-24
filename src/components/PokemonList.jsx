import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/PokemonList.module.css";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(POKEAPI_URL);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(currentPageUrl);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);

        const pokemonUrls = res.data.results.map(poke => poke.url);
        const promises = pokemonUrls.map(url => axios.get(url));
        const responses = await Promise.all(promises);

        const detailedPokemonData = responses.map(response => ({
          id: response.data.id,
          name: response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1),
          sprite: response.data.sprites.front_default,
          type: response.data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
        }));

        setPokemon(detailedPokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [currentPageUrl]);

  function nextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function prevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <div className={styles.gridContainer}>
      {!loading ? (
        <>
          <div className={styles.pokemonGrid}>
            {pokemon.map(p => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                type={p.type}
                sprite={p.sprite}
              />
            ))}
          </div>
          <Pagination
            nextPage={nextPageUrl ? nextPage : null}
            prevPage={prevPageUrl ? prevPage : null}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
