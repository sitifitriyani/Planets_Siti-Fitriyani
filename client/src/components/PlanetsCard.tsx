import React from 'react';

interface Planet {
  id: number;
  name: string;
  diameter: number;
  mass: number;
  numberOfSatellites: number;
  distanceFromSun: number;
}

interface PlanetCardProps {
  planet: Planet;
  handleDelete: (id: number) => void;
  setEditPlanet: React.Dispatch<React.SetStateAction<Partial<Planet>>>;
  openModal: () => void;
}

export default function PlanetsCard ({ planet, handleDelete, setEditPlanet, openModal }: PlanetCardProps) {
  return (
    <div className=" bg-white shadow-md rounded p-4 mb-4 border">
      <h2 className="text-lg font-bold">{planet.name}</h2>
      <p>Diameter: {planet.diameter} km</p>
      <p>Mass: {planet.mass} kg</p>
      <p>Number of Satellites: {planet.numberOfSatellites}</p>
      <p>Distance from Sun: {planet.distanceFromSun} km</p>
      <div className="flex mt-2">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setEditPlanet(planet);
            openModal();
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(planet.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
