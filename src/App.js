
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
      const results = response.data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonRecord = await axios.get(pokemon.url);
          return pokemonRecord.data;
        })
      );

      setPokemons(pokemonData);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
