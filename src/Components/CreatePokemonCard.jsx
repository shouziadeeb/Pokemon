import { useState } from "react";

export const CreatePokemonCard=({pokemonData})=>{
    return(<>
    <div className="crad">
        <figure className="imgCard">
            <img src={pokemonData.sprites.other.dream_world.front_default}alt={pokemonData.name } />
        </figure>
        <div className="cardText">
        <h2>{pokemonData.name}</h2>
        <p className="power">{pokemonData.types.map((curElm)=>curElm.type.name).join(", ")}</p>
        <div className="qualities">
            <p>Height: <span>{pokemonData.height}</span></p> 
            <p>Weight: <span>{pokemonData.weight}</span></p> 
            <p>Speed: <span>{pokemonData.stats[0].base_stat}</span></p> 
        </div>
        <div className="qualities">
            <p>Experience: <span>{pokemonData.base_experience}</span></p>
            <p>Attack: <span>{pokemonData.stats[1].base_stat}</span></p>
            <p>Abilities: <span>{pokemonData.abilities.map((abilityInfo)=>abilityInfo.ability.name).slice(0,1)}</span></p>
        </div> 
        </div>
    </div>
    </>)
}