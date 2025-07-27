// src/components/ModelSelection.jsx
import React, { useState, useEffect } from "react";

function ModelSelection({ selectedBrand, phoneModels, onSelectModel, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);

  useEffect(() => {
    // Agregamos un console.log para depurar los valores de las props
    console.log("ModelSelection - selectedBrand:", selectedBrand);
    console.log("ModelSelection - phoneModels:", phoneModels);
    console.log(
      "ModelSelection - phoneModels[selectedBrand]:",
      phoneModels[selectedBrand]
    );

    if (selectedBrand && phoneModels[selectedBrand]) {
      const models = phoneModels[selectedBrand];
      setFilteredModels(
        models.filter((model) =>
          model.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredModels([]);
    }
  }, [selectedBrand, searchTerm, phoneModels]);

  const brandTitle = selectedBrand
    ? selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)
    : "";

  return (
    <div id="model-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2
            className="text-2xl font-bold text-center flex-grow"
            id="model-step-title"
          >
            Selecciona el modelo de {brandTitle}
          </h2>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="model-search"
            placeholder="Buscar modelo..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          id="model-list"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <div
                key={model.id}
                className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all duration-200"
                onClick={() => onSelectModel(model)}
              >
                <div className="flex items-center">
                  {/* Muestra la imagen de la parte trasera del modelo si está disponible */}
                  {model.backViewImg ? (
                    <img
                      src={model.backViewImg}
                      alt={model.name}
                      className="w-12 h-16 object-contain rounded-lg mr-3"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                      <i className="fas fa-mobile-alt text-gray-400"></i>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{model.name}</h3>
                    <p className="text-blue-600 font-medium">
                      ${model.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron modelos para "{searchTerm}" en {brandTitle}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModelSelection;
