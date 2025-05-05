'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FiZap } from 'react-icons/fi';
import Navbar from "../_componant/Navbar/page";



export default function PokemonAbilities() {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedAbility, setExpandedAbility] = useState(null);
  const [comparisonAbilities, setComparisonAbilities] = useState([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);

  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/ability?limit=100');
        setAbilities(res.data.results);
      } catch {
        setError('فشل تحميل القدرات');
      } finally {
        setLoading(false);
      }
    };
    fetchAbilities();
  }, []);

  const toggleComparisonMode = () => {
    setIsComparisonMode(!isComparisonMode);
    setComparisonAbilities([]);
    setExpandedAbility(null);
  };

  const handleAbilityClick = async (ability) => {
    if (isComparisonMode) {
      const exists = comparisonAbilities.find((a) => a.url === ability.url);
      if (exists) {
        setComparisonAbilities((prev) => prev.filter((a) => a.url !== ability.url));
      } else if (comparisonAbilities.length < 2) {
        try {
          const res = await axios.get(ability.url);
          setComparisonAbilities((prev) => [...prev, { url: ability.url, data: res.data }]);
        } catch {
          setError('فشل تحميل البيانات');
        }
      }
    } else {
      if (expandedAbility?.url === ability.url) {
        setExpandedAbility(null); // إغلاق إذا تم النقر مرتين على نفس القدرة
      } else {
        try {
          const res = await axios.get(ability.url);
          setExpandedAbility({ url: ability.url, data: res.data });
        } catch {
          setError('فشل تحميل التفاصيل');
        }
      }
    }
  };

  // إغلاق عند الضغط خارج التفاصيل
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target)
      ) {
        setExpandedAbility(null);
      }
    };

    if (expandedAbility && !isComparisonMode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedAbility, isComparisonMode]);

  return (

    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 قائمة القدرات</h1>

      {loading && <p className="text-center">جاري التحميل...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {abilities.map((ability) => {
          const isSelected = comparisonAbilities.find((a) => a.url === ability.url);
          const isExpanded = expandedAbility?.url === ability.url;

          return (
            <React.Fragment key={ability.url}>
              <div
                onClick={() => handleAbilityClick(ability)}
                className={`border p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-indigo-700 dark:text-yellow-400">
                  <FiZap className="text-xl" />
                  <h3 className="capitalize font-bold">{ability.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">اضغط للعرض</p>
              </div>

              {/* تفاصيل تحت القدرة نفسها */}
              {!isComparisonMode && isExpanded && (
                <div
                  ref={detailsRef}
                  className="col-span-full bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-sm"
                >
                  <h4 className="text-lg font-bold mb-2 capitalize text-indigo-700 dark:text-yellow-400">
                    {expandedAbility.data.name}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {expandedAbility.data.effect_entries.map((entry, i) => (
                      <li key={i}>{entry.effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* زر المقارنة */}
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleComparisonMode}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            isComparisonMode ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isComparisonMode ? 'إلغاء المقارنة ❌' : 'تفعيل المقارنة 🆚'}
        </button>
      </div>

      {/* المقارنة */}
      {isComparisonMode && comparisonAbilities.length === 2 && (
        <div className="mt-10 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">🔍 مقارنة بين القدرتين</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonAbilities.map((a, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h3 className="text-xl font-bold capitalize text-indigo-700 dark:text-yellow-300 mb-2">{a.data.name}</h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                  {a.data.effect_entries.map((entry, index) => (
                    <li key={index}>{entry.effect}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
 
  );
}
