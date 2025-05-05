'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from "../_componant/Navbar/page";



export default function PokemonTypeFilter() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب الأنواع
  useEffect(() => {
    const fetchTypes = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(res.data.results);
    };
    fetchTypes();
  }, []);

  // عند اختيار نوع
  const handleSelectType = async (typeName) => {
    setSelectedType(typeName);
    setLoading(true);
    setPokemonList([]);

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
      const pokemons = res.data.pokemon.slice(0, 20); // نأخذ فقط أول 20 بوكيمون
      const detailed = await Promise.all(
        pokemons.map(async (p) => {
          const res = await axios.get(p.pokemon.url);
          return res.data;
        })
      );
      setPokemonList(detailed);
    } catch (err) {
      console.error('Error loading type:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <div className="mb-4">
          <select
            className="w-full p-2 border bg-white rounded-md text-black"
            value={selectedType}
            onChange={(e) => handleSelectType(e.target.value)}
          >
            <option value="">اختر نوع البوكيمون</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-center">جاري تحميل البوكيمونات...</p>}

        {!loading && selectedType && pokemonList.length === 0 && (
          <p className="text-center text-gray-500">لا توجد نتائج</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </>

  );
}

// نفس تصميم كرت البوكيمون السابق
function PokemonCard({ pokemon }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-center">
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto transition-transform duration-300 transform hover:scale-150"
      />

      <h3 className="text-lg font-bold text-black capitalize">{pokemon.name}</h3>
      <p className="text-gray-500 text-sm">{pokemon.id}</p>
      <a
        href={`/PokemonDetailsCard/${pokemon.id}`}
        className="mt-4 inline-block text-blue-600  hover:underline hover:text-blue-800 transition">
        View Details →
      </a>
    </div>
  );
}
