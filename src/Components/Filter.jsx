import { useState } from "react";
export const Filter=({handleFilterCompo,setIsFilter})=> {
  const [openDropdown,setOpenDropdown]=useState(false)
  const arr=["Water","Fire","Poison","Normal"]

  const handleFilter=(value)=>{
    handleFilterCompo(value)
  }
  return (
    <>
    <div className="dropdown">
  <button onClick={()=> {setOpenDropdown((prev)=>!prev)
    setIsFilter(false)
  }
  } className="dropbtn">Filter</button>
  { 
  (openDropdown &&
  <div id="myDropdown" className="dropdown-content">
  {arr.map((link,i)=> <p onClick={(e)=>{
    handleFilter(e.target.innerText)
    setIsFilter(true)}
    } key={i}>{link}</p>)}
  </div>
  )
}
</div>

    </>
  );
}