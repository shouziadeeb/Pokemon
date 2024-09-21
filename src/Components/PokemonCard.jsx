import { useEffect, useState } from "react";
import { CreatePokemonCard } from "./CreatePokemonCard";
import { Filter } from "./Filter";

export const PokemonCad=()=>{
    const [pokemon,setPokemon]=useState([])
    const [loading,setLoading]=useState(true)
    const [err,setErr]=useState(null)
    const [search,setSearch]=useState("")
    const [filData,setFilData]=useState([])
    const [isFilter,setIsFilter]=useState(false)

    const limit=10
    const [Offset,setOffset]=useState(0)

     const callPokemonApi=async()=>{
       try{ const res=await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${Offset}/limit=${limit}`)
        const data =await res.json()
        // console.log(data)
       const pokemonUrlData= data.results.map(async(curData)=>{
           const respon=await fetch(curData.url)
           const newData=await respon.json()
             return newData
        })
         const UpdatedPokemonUrlData=await Promise.all(pokemonUrlData)
         console.log(UpdatedPokemonUrlData)
         setPokemon(UpdatedPokemonUrlData)
         setLoading(false)
    }     
        catch(error){
           console.log(error)
           setErr(error)
           setLoading(false)
        }
     }



    useEffect(()=>{
        callPokemonApi()
    },[])

    const callPokemonApiMore=async()=>{
        setOffset(Offset + 10)
        try{ const res=await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${Offset}/limit=${limit}`)
         const data =await res.json()
         // console.log(data)
        const pokemonUrlData= data.results.map(async(curData)=>{
            const respon=await fetch(curData.url)
            const newData=await respon.json()
              return newData
         })
          const MoreData=await Promise.all(pokemonUrlData)
         // console.log(UpdatedPokemonUrlData)
         setPokemon((prevdata)=>[pokemon,...MoreData])
          setLoading(false)
     }     
         catch(error){
            console.log(error)
            setErr(error)
            setLoading(false)
         }
      }

    const searchData=pokemon.filter((curSearch)=>curSearch.name.toLowerCase().includes(search.toLowerCase()))
    
    const handleFilterCompo=(value)=>{
        console.log(value)
        const filterData=searchData.filter((itemValue)=>itemValue.types.map((curElm)=>curElm.type.name.toLowerCase()).includes(value.toLowerCase()))
        console.log(filterData)
        setFilData(filterData)
    }

    if(loading){
        return <div><h1>Loading...</h1></div>
    }
    if(err){
        return <div><h4>{err.message}</h4></div>
    }
    return(<section className="main">
        <header>
            <h1>Pokemon card</h1>
        </header>
        <div>
            <input type="text" placeholder="Search pokemon..." value={search} onChange={(e)=>{setSearch(e.target.value)}}/>

            <Filter handleFilterCompo={handleFilterCompo} setIsFilter={setIsFilter}/>
        </div>
        <div className="gridCardBox">
            { (isFilter?filData.map((curPokemon)=>{
                  return  <CreatePokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
                }):searchData.map((curPokemon)=>{
                    return  <CreatePokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
                  }))
            

                // searchData.map((curPokemon)=>{
                //   return  <CreatePokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
                // })
               
        }
        </div>
    </section>)
}
