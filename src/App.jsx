import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonApp = () => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState(1);

  useEffect(() => {
    fetchPokemon(search);
  }, [search]);

  const fetchPokemon = async (query) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon data", error);
      setPokemon(null);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleNext = () => {
    setSearch((prev) => Math.min(898, Number(prev) + 1));
  };

  const handlePrevious = () => {
    setSearch((prev) => Math.max(1, Number(prev) - 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="p-6 w-full max-w-2xl bg-gray-100 shadow-lg rounded-xl text-center border border-gray-300 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Pokémon Info</h1>
        <input
          type="text"
          placeholder="Enter Pokémon Name or ID"
          value={search}
          onChange={handleChange}
          className="border p-3 rounded w-96 max-w-full mb-6 text-lg"
        />
        {pokemon ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{pokemon?.name?.toUpperCase() || "Unknown"}</h2>
            {pokemon.sprites?.front_default && (
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="my-4 w-100 h-100 mx-auto border-4 border-gray-500 rounded-lg" />
            )}
            <p className="text-lg text-gray-700"><strong>Type:</strong> {pokemon.types?.map(t => t.type.name).join(", ") || "Unknown"}</p>
            <p className="text-lg font-semibold mt-4">Base Stats:</p>
            <ul className="list-none text-gray-700 border border-gray-400 rounded-lg p-4">
              {pokemon.stats?.map((stat) => (
                <li key={stat.stat.name} className="text-md border-b last:border-none py-2 font-bold">
                  <span className="text-gray-600 uppercase">{stat.stat.name}:</span> <span className="text-black">{stat.base_stat}</span>
                </li>
              )) || <li>No stats available</li>}
            </ul>
            <div className="mt-6 flex justify-center w-full space-x-8">
              <button onClick={handlePrevious} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-mono text-lg">Previous</button>
              <button onClick={handleNext} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-serif text-lg">Next</button>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-lg font-semibold">Pokémon not found</p>
        )}
      </div>
    </div>
  );
};

export default PokemonApp;