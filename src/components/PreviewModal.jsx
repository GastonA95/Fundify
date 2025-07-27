// src/components/PreviewModal.jsx
import React, { useEffect, useRef } from "react";

function PreviewModal({
  isOpen,
  designElements,
  selectedLayout,
  canvasBackgroundColor,
  selectedModel,
  caseFrameUrls,
  onClose,
  onContinue,
}) {
  const previewContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && previewContainerRef.current) {
      previewContainerRef.current.innerHTML = ""; // Limpia el contenido anterior

      const tempCanvas = document.createElement("div");
      tempCanvas.className = "w-full h-full relative";
      tempCanvas.style.backgroundColor = canvasBackgroundColor;

      // Establece dimensiones fijas para la vista previa para asegurar una apariencia consistente
      tempCanvas.style.width = "280px";
      tempCanvas.style.height = "500px";
      tempCanvas.style.overflow = "hidden"; // Asegura que los elementos no se desborden

      // Añade el overlay del marco si está disponible
      if (selectedModel && caseFrameUrls[selectedModel.id]) {
        const frameUrl = caseFrameUrls[selectedModel.id];
        const frameImg = document.createElement("img");
        frameImg.className = "case-frame-overlay";
        frameImg.src = frameUrl;
        frameImg.alt = "Marco de la funda del teléfono";
        tempCanvas.appendChild(frameImg);
      }

      if (selectedLayout === "single") {
        // Clona y añade elementos
        designElements.forEach((el) => {
          const clonedEl = document.createElement("div");
          clonedEl.className = "editor-element";
          clonedEl.style.position = "absolute";
          clonedEl.style.left = `${el.x}px`;
          clonedEl.style.top = `${el.y}px`;
          clonedEl.style.width = el.width === "auto" ? "auto" : `${el.width}px`;
          clonedEl.style.height =
            el.height === "auto" ? "auto" : `${el.height}px`;
          clonedEl.style.transform = `rotate(${el.rotation}deg)`;
          clonedEl.style.zIndex = el.zIndex;
          clonedEl.style.outline = "none"; // Elimina el contorno activo para la vista previa

          if (el.type === "image") {
            const img = document.createElement("img");
            img.src = el.src;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            clonedEl.appendChild(img);
          } else if (el.type === "text") {
            const span = document.createElement("span");
            span.textContent = el.content;
            span.style.fontFamily = el.fontFamily;
            span.style.fontSize = `${el.fontSize}px`;
            span.style.color = el.color;
            clonedEl.appendChild(span);
          }
          tempCanvas.appendChild(clonedEl);
        });
      } else {
        tempCanvas.className =
          "w-full h-full grid grid-cols-2 grid-rows-2 gap-2 p-2";
        for (let i = 0; i < 4; i++) {
          const windowDiv = document.createElement("div");
          windowDiv.className = "window bg-gray-50 rounded-lg relative";
          windowDiv.style.backgroundColor = canvasBackgroundColor;
          if (i === 0) {
            // Solo añade elementos a la primera ventana por ahora, como en DesignEditor
            designElements.forEach((el) => {
              const clonedEl = document.createElement("div");
              clonedEl.className = "editor-element";
              clonedEl.style.position = "absolute";
              clonedEl.style.left = `${el.x}px`;
              clonedEl.style.top = `${el.y}px`;
              clonedEl.style.width =
                el.width === "auto" ? "auto" : `${el.width}px`;
              clonedEl.style.height =
                el.height === "auto" ? "auto" : `${el.height}px`;
              clonedEl.style.transform = `rotate(${el.rotation}deg)`;
              clonedEl.style.zIndex = el.zIndex;
              clonedEl.style.outline = "none"; // Elimina el contorno activo para la vista previa

              if (el.type === "image") {
                const img = document.createElement("img");
                img.src = el.src;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "contain";
                clonedEl.appendChild(img);
              } else if (el.type === "text") {
                const span = document.createElement("span");
                span.textContent = el.content;
                span.style.fontFamily = el.fontFamily;
                span.style.fontSize = `${el.fontSize}px`;
                span.style.color = el.color;
                clonedEl.appendChild(span);
              }
              windowDiv.appendChild(clonedEl);
            });
          }
          tempCanvas.appendChild(windowDiv);
        }
      }

      previewContainerRef.current.appendChild(tempCanvas);
    }
  }, [
    isOpen,
    designElements,
    selectedLayout,
    canvasBackgroundColor,
    selectedModel,
    caseFrameUrls,
  ]);

  if (!isOpen) return null;

  return (
    <div
      id="preview-modal"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Vista previa</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="flex justify-center p-4 bg-gray-100 rounded-lg mb-4">
          <div
            id="preview-container"
            ref={previewContainerRef}
            className="relative w-48 h-80 bg-gray-100 overflow-hidden"
          >
            {/* Aquí irá la vista previa del diseño */}
          </div>
        </div>
        <div className="text-center">
          <p className="mb-4">
            ¿Todo se ve bien? Puedes continuar o volver a editar.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
            >
              Seguir editando
            </button>
            <button
              onClick={onContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
