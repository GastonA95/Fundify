import React from "react";

function ProgressBar({ currentStep }) {
  const steps = [
    // Se agregaron las propiedades 'icon' a cada objeto de paso
    { id: 1, name: "Marca", icon: "fas fa-mobile-alt" }, // Icono de móvil para la marca
    { id: 2, name: "Modelo", icon: "fas fa-list" }, // Icono de lista para el modelo
    { id: 3, name: "Material", icon: "fas fa-layer-group" }, // Icono de capas para el material
    { id: 4, name: "Ventanas", icon: "fas fa-th" }, // Icono de cuadrícula para ventanas
    { id: 5, name: "Diseño", icon: "fas fa-paint-brush" }, // Icono de pincel para diseño
  ];

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="flex justify-between items-center w-full max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`relative flex-1 flex flex-col items-center
              ${step.id < currentStep ? "completed" : ""}
              ${step.id === currentStep ? "active" : ""}
            `}
          >
            <div
              className={`
              h-10 w-10 rounded-full border-2 border-gray-300 flex items-center justify-center mb-2
              ${
                step.id < currentStep
                  ? "bg-green-500 text-white border-green-500"
                  : ""
              }
              ${
                step.id === currentStep
                  ? "bg-blue-600 text-white border-blue-600"
                  : ""
              }
            `}
            >
              {/* Aquí se usa la propiedad 'icon' para renderizar el icono */}
              <i className={step.icon}></i>
            </div>
            <span className="text-xs sm:text-sm">{step.name}</span>
            {/* La línea de progreso entre los círculos */}
            {index < steps.length - 1 && (
              <div
                className={`
                absolute top-1/2 right-0 transform -translate-y-1/2 w-full h-0.5 bg-gray-300 -mr-1/2 z-[-1]
                ${step.id < currentStep ? "bg-green-500" : ""}
              `}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
