// DetailPage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function DetailPage() {
  const { name } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <ClipLoader size={60} color={"#e60012"} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        포켓몬 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="grid justify-center min-w-screen">
      <div className="border-2 border-red-500 rounded-xl shadow-lg p-5 w-80">
        <div className="flex justify-center border-2 border-black-500 rounded-full bg-gray-50 w-30 h-30 m-auto">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>

        <h1 className="font-yg text-center text-2xl uppercase font-black m-2">
          {pokemon.name}
        </h1>

        <div className="flex justify-center">
          {pokemon.types.map((t) => (
            <span
              className="font-yg bg-black text-white rounded-3xl p-1.5 mr-1"
              key={t.type.name}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <ul className="font-yg uppercase border-t-2 border-red-500 mt-3 font-bold">
          {pokemon.stats.map((stat) => (
            <li
              className="flex justify-between border-b-1 border-red-500"
              key={stat.stat.name}
            >
              <span>{stat.stat.name.toUpperCase()}</span>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;
