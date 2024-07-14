import { useEffect, useState } from "react";
import Header from "./components/Header";
import PlanetsCard from "./components/PlanetsCard";
import PopUp from "./components/PopUp";
import Footer from "./components/Footer";

export interface Planet {
  id: number;
  name: string;
  diameter: number;
  mass: number;
  numberOfSatellites: number;
  distanceFromSun: number;
}

export default function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [editPlanet, setEditPlanet] = useState<Partial<Planet>>({
    id: 0,
    name: "",
    diameter: 0,
    mass: 0,
    numberOfSatellites: 0,
    distanceFromSun: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Planet>("name");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/planets")
      .then((response) => response.json())
      .then((planets) => setPlanets(planets));
  }, []);

  function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this planet?")) {
      fetch(`http://localhost:8080/api/planets/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setPlanets(planets.filter((planet) => planet.id !== id));
            setAlertMessage("Planet successfully deleted!");
          } else {
            setAlertMessage("Failed to delete planet.");
          }
        })
        .catch((error) => {
          console.error("Error deleting planet:", error);
          setAlertMessage("Failed to delete planet.");
        });
    }
  }

  function handleSave() {
    if (editPlanet.id) {
      handleEdit();
    } else {
      handleAdd();
    }
  }

  function handleEdit() {
    fetch(`http://localhost:8080/api/planets`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editPlanet),
    })
      .then((response) => {
        if (response.ok) {
          const updatedPlanets = planets.map((planet) =>
            planet.id === editPlanet.id ? editPlanet as Planet : planet
          );
          setPlanets(updatedPlanets);
          setIsModalOpen(false);
          setAlertMessage("Planet successfully updated!");
        } else {
          setAlertMessage("Failed to update planet.");
        }
      })
      .catch((error) => {
        console.error("Error updating planet:", error);
        setAlertMessage("Failed to update planet.");
      });
  }

  function handleAdd() {
    fetch("http://localhost:8080/api/planets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPlanet),
    })
      .then((response) => response.json())
      .then((newPlanet) => {
        setPlanets([...planets, newPlanet]);
        setIsModalOpen(false);
        setAlertMessage("New planet added successfully!");
      })
      .catch((error) => {
        console.error("Error adding new planet:", error);
        setAlertMessage("Failed to add new planet.");
      });
  }

  function filteredAndSortedPlanets() {
    const filteredPlanets = planets.filter((planet) =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredPlanets.sort((a, b) =>
      a[sortKey] > b[sortKey] ? 1 : -1
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto p-4">
        {alertMessage && (
          <div className="bg-green-200 text-green-800 border border-green-600 px-4 py-2 mb-4 rounded">
            {alertMessage}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setEditPlanet({
                id: 0,
                name: "",
                diameter: 0,
                mass: 0,
                numberOfSatellites: 0,
                distanceFromSun: 0,
              });
              setIsModalOpen(true);
            }}
          >
            Add Planet
          </button>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as keyof Planet)}
            className="p-2 border rounded"
          >
            <option value="name">Name</option>
            <option value="diameter">Diameter</option>
            <option value="mass">Mass</option>
            <option value="numberOfSatellites">Number of Satellites</option>
            <option value="distanceFromSun">Distance from Sun</option>
          </select>
        </div>
        <div>
          {filteredAndSortedPlanets().map((planet) => (
            <PlanetsCard
              key={planet.id}
              planet={planet}
              handleDelete={handleDelete}
              setEditPlanet={setEditPlanet}
              openModal={() => setIsModalOpen(true)}
            />
          ))}
        </div>
        <PopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <h2 className="text-lg font-bold mb-4">
              {editPlanet.id ? "Edit Planet" : "Add New Planet"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={editPlanet.name}
                onChange={(e) =>
                  setEditPlanet({ ...editPlanet, name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Diameter (km)
              </label>
              <input
                type="number"
                value={editPlanet.diameter}
                onChange={(e) =>
                  setEditPlanet({
                    ...editPlanet,
                    diameter: parseFloat(e.target.value),
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mass (kg)
              </label>
              <input
                type="number"
                value={editPlanet.mass}
                onChange={(e) =>
                  setEditPlanet({
                    ...editPlanet,
                    mass: parseFloat(e.target.value),
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Satellites
              </label>
              <input
                type="number"
                value={editPlanet.numberOfSatellites}
                onChange={(e) =>
                  setEditPlanet({
                    ...editPlanet,
                    numberOfSatellites: parseInt(e.target.value, 10),
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Distance from Sun (km)
              </label>
              <input
                type="number"
                value={editPlanet.distanceFromSun}
                onChange={(e) =>
                  setEditPlanet({
                    ...editPlanet,
                    distanceFromSun: parseFloat(e.target.value),
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </PopUp>
      </div>
      <Footer />
    </div>
  );
}
