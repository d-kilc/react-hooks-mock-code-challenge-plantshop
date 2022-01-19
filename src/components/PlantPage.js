import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const API_URL = 'http://localhost:6001/plants'

  //plants is used to render PlantCard components on screen and changes when POST occurs or search input is entered
  //allPlants is used to filter against and does not change unless a POST occurs
  const [plants, setPlants] = useState([])
  const [allPlants, setAllPlants] = useState([])
  const [searchText, setSearchText] = useState('')

  //initial fetch on page load
  useEffect(() => {
    handleGetPlants()
  }, [])

  //used to fetch all plants (on pageload, on post).
  //populates the list of visible plants (plants) and the master
  //list (allPlants), which is used to filter against
  function handleGetPlants() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setPlants(data)
      setAllPlants(data)
    })
  }

  //handle post to backend
  function handleAddPlant(e) {
    e.preventDefault()

    const newName = e.target[0].value
    const newImage = e.target[1].value
    const newPrice = e.target[2].value

    fetch(API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        name: newName,
        inStock: true,
        image: newImage,
        price: parseInt(newPrice)
      })
    })
    .then(res => console.log(res))
    .then(handleGetPlants)

    e.target.reset()
  }

  //handle search and filter results
  function handleSearch(e) {
    const input = e.target.value
    setSearchText(input)

    //want to filter from the MASTER list (allPlants)
    //and use the results to set the VISIBLE list (plants)
    //is there another way to do this...?
    const filteredPlants = [...allPlants].filter((plant) => {
      return plant.name.toUpperCase().includes(input.toUpperCase())
    })
    //set plants state to the filtered list so only those render
    setPlants(filteredPlants)
  }

  function handleUpdatePlant(id,keyToUpdate,value) {
    //used to edit characteristics of a plant
    //handles different scenarios
    //re-fetches at end
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        [keyToUpdate]: keyToUpdate === 'price' ? parseInt(value) : value 
      })
    })
    .then(handleGetPlants)
  }

  //delete plant and re-fetch
  function handleDeletePlant(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(handleGetPlants)
  }

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant}/>
      <Search handleSearch={handleSearch}/>
      <PlantList plants={plants} handleUpdatePlant={handleUpdatePlant} handleDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
