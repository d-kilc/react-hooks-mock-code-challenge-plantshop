import React, { useState } from "react";

function PlantCard({plant, handleUpdatePlant, handleDeletePlant}) {
  const [price, setPrice] = useState(plant.price)
  
  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <span>Price: <input type="text" value={price} onChange={(e) => {
        setPrice( () => {
          handleUpdatePlant(plant.id,"price",price)
          return e.target.value
        })
      }}/></span>
      <button>Save Price</button>
      <br/>
      {plant.inStock ? (
        <button onClick={() => {
          handleUpdatePlant(plant.id,"inStock",!plant.inStock)
        }} className="primary">In Stock</button>
      ) : (
        <button onClick={() => {
          handleUpdatePlant(plant.id,"inStock",!plant.inStock)
        }}>Out of Stock</button>
      )}
      <button onClick={() => handleDeletePlant(plant.id)} className="danger">Delete</button>
    </li>
  );
}

export default PlantCard;
