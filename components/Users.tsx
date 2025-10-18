"use client"

import React from "react";
import Image from "next/image";
import countriesIcon from "../public/countries-icon.svg";
import avatars from "../public/avatars.png";

const Users = () => {

//  // Just practicing APIs

// type PokemonData = {
//   name:string;
//   sprites: { front_default: string };
// }

//  const [pokemon, setPokemon] = useState<PokemonData | null>(null);


//  useEffect(() => {
//   async function getPokemonData() {
//   try {
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
//     const data = await response.json();
//     setPokemon(data);
//   } catch (error) {
//     console.log("Error:", error);
//   }
//  }

//  getPokemonData()
//  }, []);

//  if (!pokemon) return <p>Loading...</p>;


  return (
    <div className="text-center w-3/4 m-auto mt-20 md:mt-28">
      <h1 className="text-3xl md:text-5xl font-bold">
        <span className="text-[#929297]">Trusted by</span> Thousands of
        Organized Users
      </h1>
      <div className="flex flex-row mt-5 mb-3 md:mb-auto justify-center items-center gap-3 md:gap-8">
        <Image src={countriesIcon} width={80} alt="countries-icon" className="md:w-auto" />

        <h2 className="flex items-center gap-3 md:gap-6 text-[#525252] md:mb-0">
          <span className="text-xl md:text-[64px] font-bold text-[#544DF2]">50000+</span>{" "}
          <span className="text-[14px] md:text-[18px]">Users Worldwide</span>
        </h2>
      </div>

      <Image src={avatars} alt="avatars-stringed-together" className="w-full md:w-2/3 m-auto" />
    </div>
  );
};

export default Users;
