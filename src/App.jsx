import { useState } from 'react'
import { PokemonCad } from './Components/PokemonCard'
import "../src/Components/pokemon.css"
import { CreatePokemonCard } from './Components/CreatePokemonCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PokemonCad/>
    </>
  )
}

export default App
