import React from "react";

function LayoutSelection({ onSelectLayout, selectedLayout, onBack }) {
  const layouts = [
    {
      id: "single",
      name: "Simple",
      description: "Una sola área sin divisiones",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg flex items-center justify-center">
          <div className="w-full h-full bg-white rounded"></div>
        </div>
      ),
    },
    {
      id: "horizontal-2",
      name: "Horizontal 2",
      description: "Dos secciones horizontales",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1">
          <div className="w-full h-1/2 bg-white mb-1 rounded"></div>
          <div className="w-full h-1/2 bg-white rounded"></div>
        </div>
      ),
    },
    {
      id: "horizontal-3",
      name: "Horizontal 3",
      description: "Tres secciones horizontales",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1">
          <div className="w-full h-1/3 bg-white mb-1 rounded"></div>
          <div className="w-full h-1/3 bg-white mb-1 rounded"></div>
          <div className="w-full h-1/3 bg-white rounded"></div>
        </div>
      ),
    },
    {
      id: "vertical-2",
      name: "Vertical 2",
      description: "Dos secciones verticales",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1 flex">
          <div className="w-1/2 h-full bg-white mr-1 rounded"></div>
          <div className="w-1/2 h-full bg-white rounded"></div>
        </div>
      ),
    },
    {
      id: "grid-2x2",
      name: "Cuadrícula 2x2",
      description: "Cuatro secciones en cuadrícula",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1">
          <div className="flex h-1/2 mb-1">
            <div className="w-1/2 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/2 h-full bg-white rounded"></div>
          </div>
          <div className="flex h-1/2">
            <div className="w-1/2 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/2 h-full bg-white rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: "mixed-left",
      name: "Mixto Izquierda",
      description: "Grande izquierda, dos pequeñas derecha",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1 flex">
          <div className="w-2/3 h-full bg-white mr-1 rounded"></div>
          <div className="w-1/3 h-full flex flex-col">
            <div className="w-full h-1/2 bg-white mb-1 rounded"></div>
            <div className="w-full h-1/2 bg-white rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: "mixed-top",
      name: "Mixto Superior",
      description: "Grande arriba, dos pequeñas abajo",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1">
          <div className="w-full h-2/3 bg-white mb-1 rounded"></div>
          <div className="w-full h-1/3 flex">
            <div className="w-1/2 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/2 h-full bg-white rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: "grid-3x3",
      name: "Cuadrícula 3x3",
      description: "Nueve secciones pequeñas",
      preview: (
        <div className="w-full h-full bg-gray-200 border-2 border-gray-400 rounded-lg p-1">
          <div className="flex h-1/3 mb-1">
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white rounded"></div>
          </div>
          <div className="flex h-1/3 mb-1">
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white rounded"></div>
          </div>
          <div className="flex h-1/3">
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white mr-1 rounded"></div>
            <div className="w-1/3 h-full bg-white rounded"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="layout-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow text-pink-600">
            Elegí la grilla
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className={`layout-option p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  selectedLayout === layout.id
                    ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              onClick={() => onSelectLayout(layout.id)}
            >
              <div className="bg-gray-100 aspect-[3/4] rounded-lg mb-3 p-2">
                {layout.preview}
              </div>
              <h3 className="text-xl font-semibold mb-2">{layout.name}</h3>
              <p className="text-gray-600">{layout.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LayoutSelection;
