'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PokemonBox() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchPokemon() {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) return <p className="text-center py-4">جاري التحميل...</p>;
  if (!pokemon) return <p className="text-center py-4">لم يتم العثور على بيانات.</p>;

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow rounded-lg text-center">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-40 h-40 mx-auto"
      />
      <h2 className="text-2xl font-bold capitalize mt-2">{pokemon.name}</h2>
      <p className="text-gray-500">رقم: #{pokemon.id}</p>
      <div className="mt-2 flex justify-center gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 rounded-full text-white text-sm"
            style={{ backgroundColor: getTypeColor(type.type.name) }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function getTypeColor(type) {
  const colors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    poison: "#A040A0",
    normal: "#A8A878",
    flying: "#A890F0",
    bug: "#A8B820",
    ground: "#E0C068",
    psychic: "#F85888",
    rock: "#B8A038",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return colors[type] || "#999";
}
