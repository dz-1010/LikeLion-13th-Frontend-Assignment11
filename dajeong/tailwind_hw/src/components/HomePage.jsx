// HomePage.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    data: pokemonList = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
      return response.data.results;
    },
  });

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid justify-center min-w-screen gap-4">
      <h1 className="font-yg text-center mt-5">포켓몬 도감</h1>

      <input
        className="font-yg m-auto border-2 border-gray-200 rounded-md w-60 p-1"
        type="text"
        placeholder="포켓몬 이름 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading || isFetching ? (
        <div>
          <ClipLoader size={60} color="#3b4cca" />
        </div>
      ) : (
        <ul className="grid grid-cols-8 gap-4 mt-10">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
