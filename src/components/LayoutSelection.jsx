import React from "react";

function LayoutSelection({ onSelectLayout, selectedLayout, onBack }) {
  const layouts = [
    {
      id: "single",
      name: "Ventana Única",
      description: "Una sola imagen que ocupa todo el espacio disponible",
      preview: (
        <div className="w-3/4 h-3/4 bg-white border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-image text-5xl text-gray-400"></i>
        </div>
      ),
    },
    {
      id: "multiple",
      name: "Ventanas Múltiples",
      description: "Varias imágenes en diseño tipo collage",
      preview: (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
          <div className="bg-white border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-image text-3xl text-gray-400"></i>
          </div>
          <div className="bg-white border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-image text-3xl text-gray-400"></i>
          </div>
          <div className="bg-white border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-image text-3xl text-gray-400"></i>
          </div>
          <div className="bg-white border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-image text-3xl text-gray-400"></i>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="layout-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">
            Selecciona el diseño de ventanas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className={`layout-option p-5 border rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
                ${
                  selectedLayout === layout.id
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : ""
                }`}
              onClick={() => onSelectLayout(layout.id)}
            >
              <div className="bg-gray-100 aspect-[9/16] rounded-lg flex items-center justify-center mb-4">
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
