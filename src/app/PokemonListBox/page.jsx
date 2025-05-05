'use client';

import axios from 'axios';
import { Link } from 'lucide-react';
import React, { useEffect, useState } from 'react';



export default function PokemonListBox() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchPokemons() {
        setLoading(true);
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
            const results = response.data.results;

            // تحميل تفاصيل كل بوكيمون
            const detailedData = await Promise.all(
                results.map(async (p) => {
                    const res = await axios.get(p.url);
                    return res.data;
                })
            );

            setPokemonList(detailedData);
        } catch (error) {
            console.error("خطأ في تحميل البوكيمونات:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    if (loading) return <p className="text-center py-4">جاري تحميل البوكيمونات...</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />

            ))}
        </div>
    );
}

// كمبوننت داخلي لعرض كل بوكيمون
function PokemonCard({ pokemon }) {
    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow text-center">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="w-24 h-24 mx-auto transition-transform duration-600 transform hover:scale-150"
                />

                <h3 className="text-lg font-bold text-black capitalize mt-2">{pokemon.name}</h3>
                <p className="text-gray-500 text-sm">{pokemon.id}</p>

                <div className="flex justify-center gap-1 mt-2">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className="px-2 py-0.5 rounded-full text-white text-xs capitalize"
                            style={{ backgroundColor: getTypeColor(type.type.name) }}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>

                <a
                    href={`/PokemonDetailsCard/${pokemon.id}`}
                    className="mt-4 inline-block text-blue-600  hover:underline hover:text-blue-800 transition">
                    View Details →
                </a>
            </div>

        </>

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
