import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css"; // นำเข้าไฟล์ CSS สำหรับสไตล์

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);  // สำหรับการเพิ่มข้อมูลทีละ 20 ตัว
  const limit = 20; // จำนวนโปเกมอนที่จะแสดงต่อครั้ง

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const details = await Promise.all(
          response.data.results.map(async (poke) => {
            const res = await axios.get(poke.url);
            return {
              name: res.data.name,
              image: res.data.sprites.front_default,
              type: res.data.types.map((t) => t.type.name).join(", "),
              stats: res.data.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
            };
          })
        );
        setPokemon((prevPokemon) => [...prevPokemon, ...details]); // เพิ่มโปเกมอนที่ดึงมาใหม่
      } catch (error) {
        console.error("Failed to fetch Pokémon", error);
      }
    }

    fetchPokemon();
  }, [offset]);

  const loadMorePokemon = () => {
    setOffset(offset + limit); // เพิ่ม offset เพื่อดึงข้อมูลโปเกมอนเพิ่มเติม
  };

  return (
    <div className="pokemon-list-container">
      <h2 className="pokemon-header">Pokemon List</h2>
      <div className="pokemon-grid">
        {pokemon.map((poke, index) => (
          <div className="pokemon-card" key={index}>
            <img src={poke.image} alt={poke.name} className="pokemon-image" />
            <div className="pokemon-info">
              <p className="pokemon-name">{poke.name}</p>
              <p className="pokemon-type">{poke.type}</p>
              <div className="pokemon-stats">
                {poke.stats.map((stat, statIndex) => (
                  <p key={statIndex} className="pokemon-stat">
                    {stat.name}: {stat.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more-btn" onClick={loadMorePokemon}>
        Load More Pokémon
      </button>
    </div>
  );
}

export default PokemonList;
