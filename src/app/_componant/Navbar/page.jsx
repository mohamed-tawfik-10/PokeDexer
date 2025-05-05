'use client';
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-800 to-black dark:from-gray-900 dark:to-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-3xl font-bold text-white dark:text-gray-200">
                PokeDex Explorer
              </a>
            </div>

            {/* Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/" className="text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition duration-300">Home 🏠</a>
              <a href="/PokemonTypeFilter" className="text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition duration-300">Pokemon Types ⚡</a>
              {/* Abilities Link */}
              <a href="/PokemonAbilities" className="flex items-center gap-2 text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition duration-300">
                Abilities 
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? 'Close Menu' : 'Open Menu'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-gray-800 to-black dark:from-gray-900 dark:to-black px-2 pt-2 pb-4 space-y-2 transition-all duration-300">
            <a href="/" className="block text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition">Home 🏠</a>
            <a href="/PokemonTypeFilter" className="block text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition">Pokemon Types ⚡</a>
            {/* Mobile Abilities Link */}
            <a href="/PokemonAbilities" className="block text-white dark:text-gray-200 hover:text-gray-400 dark:hover:text-gray-300 transition">Abilities </a>
          </div>
        )}
      </nav>
    </>
  );
}
