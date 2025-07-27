import React from "react";

function MaterialSelection({ onSelectMaterial, selectedMaterial, onBack }) {
  const materials = [
    {
      id: "silicone",
      name: "Silicona",
      img: "https://cdn.pixabay.com/photo/2014/07/31/23/38/simple-407196_1280.jpg",
      description: "Material suave y flexible con buena absorción de impactos",
      priceDisplay: "$15.99",
      rating: "★★★★☆",
    },
    {
      id: "hardplastic",
      name: "Plástico Duro",
      img: "https://cdn.pixabay.com/photo/2012/04/13/12/38/plastic-32404_1280.jpg",
      description: "Resistente y duradero con diseño delgado",
      priceDisplay: "$12.99",
      rating: "★★★★★",
    },
    {
      id: "leather",
      name: "Cuero",
      img: "https://cdn.pixabay.com/photo/2017/08/07/09/00/background-2601569_1280.jpg",
      description: "Elegante y sofisticado con tacto premium",
      priceDisplay: "$24.99",
      rating: "★★★★☆",
    },
  ];

  return (
    <div id="material-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">
            Selecciona el material
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className={`material-card p-5 border rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
                ${
                  selectedMaterial === material.id
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : ""
                }`}
              onClick={() => onSelectMaterial(material.id)}
            >
              <img
                src={material.img}
                alt={material.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
              <p className="text-gray-600 mb-3">{material.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-blue-600">
                  {material.priceDisplay}
                </span>
                <span className="text-sm text-gray-500">{material.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaterialSelection;
