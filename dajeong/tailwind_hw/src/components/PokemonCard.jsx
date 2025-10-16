// PokemonCard.jsx
import { Link } from "react-router-dom";

function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function PokemonCard({ pokemon }) {
  const id = getIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="flex justify-center bg-gray-50 border-2 border-gray-200 rounded-md w-38 h-32 shadow-md">
      <Link to={`/pokemon/${pokemon.name}`}>
        <img className="" src={imageUrl} alt={pokemon.name} />
        <div className="font-yg text-center text-black">{pokemon.name}</div>
      </Link>
    </div>
  );
}

export default PokemonCard;
