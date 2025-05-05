import Image from "next/image";
import PokemonBox from "./PokemonBox/page";
import PokemonListBox from "./PokemonListBox/page";
import PokemonSearchBox from "./PokemonSearchBox/page";
import PokemonTypeFilter from "./PokemonTypeFilter/page";
import Navbar from "./_componant/Navbar/page";



export default function Home() {
  return (
<>
<Navbar/>
<div className="">
  <PokemonSearchBox/>
</div>
<PokemonListBox/>
</>
  );
}
