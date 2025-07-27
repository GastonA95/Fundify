// src/components/CropModal.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop"; // ¡IMPORTANTE! Importa Cropper de react-easy-crop
import "../styles/react-easy-crop.css"; // Importa el CSS desde tu ubicación local
import getCroppedImg from "../utils/cropImage"; // Importa la función de utilidad

function CropModal({ isOpen, imageSrc, onClose, onApply }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Callbacks para actualizar el estado de recorte
  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onRotationChange = useCallback((rotation) => {
    setRotation(rotation);
  }, []);

  // Callback que se llama cuando el recorte se completa (se mueve o redimensiona)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Manejador para aplicar el recorte y cerrar el modal
  const handleApplyCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        // Llama a la función de utilidad para obtener la imagen recortada
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );
        onApply(croppedImage); // Pasa la imagen recortada al componente padre
        onClose(); // Cierra el modal
      } catch (e) {
        console.error("Error al recortar la imagen:", e);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      }
    }
  }, [imageSrc, croppedAreaPixels, rotation, onApply, onClose]);

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="crop-modal"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg max-w-xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Recortar imagen</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="relative w-full h-80 bg-gray-100 mb-4">
          {/* Componente Cropper de react-easy-crop */}
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={9 / 16}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropComplete}
            showGrid={true}
            restrictPosition={false}
          />
        </div>
        {/* Controles de Zoom y Rotación */}
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <label
              htmlFor="zoom-range"
              className="block text-sm font-medium text-gray-700"
            >
              Zoom: {Math.round(zoom * 100)}%
            </label>
            <input
              id="zoom-range"
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label
              htmlFor="rotation-range"
              className="block text-sm font-medium text-gray-700"
            >
              Rotación: {Math.round(rotation)}°
            </label>
            <input
              id="rotation-range"
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e) => setRotation(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleApplyCrop}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropModal;
