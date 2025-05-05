'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function PokemonSearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // وظيفة debounce لتأخير البحث حتى يتوقف المستخدم عن الكتابة
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // تأخير 500ms

    return () => clearTimeout(timer); // تنظيف التايمر عند تغييره
  }, [searchTerm]);

  useEffect(() => {
    // إذا كانت الحروف المدخلة أكثر من حرفين، نبدأ في البحث
    if (debouncedSearchTerm.length >= 2) {
      handleSearch();
    } else {
      setPokemon(null);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${debouncedSearchTerm.toLowerCase()}`);
      setPokemon(res.data);
    } catch (err) {
      setError('لم يتم العثور على بوكيمون بهذا الاسم');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ابحث عن بوكيمون (مثل: pikachu)"
          className="flex-1 px-3 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          بحث
        </button>
      </div>

      {loading && <p className="text-center">جاري البحث...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {pokemon && (
        <div className="bg-white shadow rounded-lg text-center p-4">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto"
          />
          <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
          <p className="text-gray-500">رقم: {pokemon.id}</p>
          <div className="mt-2 flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 rounded-full text-white text-sm capitalize"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <a
            href={`/PokemonDetailsCard/${pokemon.id}`}
            className="mt-4 inline-block text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            View Details →
          </a>
        </div>
      )}
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
