'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Flame, Bolt, Heart, BarChart, Zap } from "lucide-react";

export default function PokemonDetailsCard({ params }) {
  const { id } = params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchPokemonDetails() {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res?.data);
    } catch (error) {
      console.error("Error loading details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (loading) return <p className="text-center py-4">جاري تحميل التفاصيل...</p>;
  if (!pokemon) return <p className="text-center py-4 text-red-500">لا توجد بيانات</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10  bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6 rounded-lg shadow flex flex-col md:flex-row gap-6">
      {/* صورة البوكيمون */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={pokemon?.sprites?.other['official-artwork'].front_default}
          alt={pokemon?.name}
          className="w-52 h-52 sm:w-64 sm:h-64 object-contain"
        />
      </div>

      {/* معلومات البوكيمون */}
      <div className="w-full md:w-1/2 space-y-4 text-sm  sm:text-base">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold capitalize">{pokemon?.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-1">رقم: {pokemon?.id}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" /> الأنواع:
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {pokemon?.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 text-sm rounded-full text-white"
                style={{ backgroundColor: getTypeColor(t.type.name) }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" /> القدرات:
          </h3>
          <ul className="list-disc list-inside mt-1">
            {pokemon?.abilities.map((ab) => (
              <li key={ab.ability.name} className="capitalize">
                {ab.ability.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart className="w-5 h-5 text-blue-600" /> الإحصائيات:
          </h3>
          <ul className="mt-1 space-y-1">
            {pokemon?.stats.map((s) => (
              <li key={s.stat.name} className="capitalize">
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" /> أشهر الحركات:
          </h3>
          <ul className="flex flex-wrap gap-2 mt-1">
            {pokemon?.moves.slice(0, 6).map((m) => (
              <li
                key={m.move.name}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {m.move.name}
              </li>
            ))}
          </ul>
        </div>
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
