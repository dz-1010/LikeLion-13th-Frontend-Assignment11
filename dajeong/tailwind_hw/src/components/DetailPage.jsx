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
      <div>
        <ClipLoader size={60} color={"#e60012"} />
      </div>
    );
  }

  if (isError) {
    return <div>포켓몬 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div>
      <div>
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>

        <h1 className="font-yg">{pokemon.name}</h1>

        <div className="font-yg">
          {pokemon.types.map((t) => (
            <span key={t.type.name}>{t.type.name}</span>
          ))}
        </div>

        <ul className="font-yg">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
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
