// src/components/EditorElement.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";

function EditorElement({ element, isActive, editorMode, onSelect, onUpdate }) {
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 }); // Posición inicial del ratón/toque
  const [startDim, setStartDim] = useState({ width: 0, height: 0 }); // Dimensiones iniciales del elemento
  const [startAngle, setStartAngle] = useState(0); // Ángulo inicial para rotación

  // Efecto para aplicar las propiedades del elemento desde las props
  useEffect(() => {
    if (elementRef.current) {
      // Asegurarse de que las propiedades se apliquen correctamente
      elementRef.current.style.left = `${element.x}px`;
      elementRef.current.style.top = `${element.y}px`;
      elementRef.current.style.width =
        element.width === "auto" ? "auto" : `${element.width}px`;
      elementRef.current.style.height =
        element.height === "auto" ? "auto" : `${element.height}px`;
      elementRef.current.style.transform = `rotate(${
        element.rotation || 0
      }deg)`;
      elementRef.current.style.zIndex = element.zIndex || 1;

      // Aplicar estilos específicos para texto
      if (element.type === "text") {
        elementRef.current.style.fontFamily = element.fontFamily;
        elementRef.current.style.fontSize = `${element.fontSize}px`;
        elementRef.current.style.color = element.color;
      }
    }
  }, [element]);

  // Manejar la selección del elemento
  const handleMouseDown = useCallback(
    (e) => {
      e.stopPropagation(); // Evitar que el clic se propague al fondo del lienzo
      onSelect(element); // Seleccionar este elemento

      if (editorMode === "move") {
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
      }
    },
    [element, onSelect, editorMode]
  );

  const handleTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      onSelect(element);

      if (editorMode === "move") {
        setIsDragging(true);
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    },
    [element, onSelect, editorMode]
  );

  // Manejar el inicio del redimensionamiento
  const handleResizeMouseDown = useCallback((e, position) => {
    e.stopPropagation();
    e.preventDefault(); // Prevenir el comportamiento por defecto del navegador (ej. arrastrar imagen)
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    if (elementRef.current) {
      setStartDim({
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
      });
    }
    elementRef.current.dataset.resizePosition = position; // Almacenar la posición del handle para el movimiento
  }, []);

  const handleResizeTouchStart = useCallback((e, position) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    if (elementRef.current) {
      setStartDim({
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
      });
    }
    elementRef.current.dataset.resizePosition = position;
  }, []);

  // Manejar el inicio de la rotación
  const handleRotateMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);
      setStartPos({ x: e.clientX, y: e.clientY });

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      setStartAngle(angle - (element.rotation || 0)); // Calcular el ángulo inicial relativo al elemento
    },
    [element.rotation]
  );

  const handleRotateTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle =
        Math.atan2(
          e.touches[0].clientY - centerY,
          e.touches[0].clientX - centerX
        ) *
        (180 / Math.PI);
      setStartAngle(angle - (element.rotation || 0));
    },
    [element.rotation]
  );

  // Manejar el movimiento del ratón/toque (arrastre, redimensionamiento, rotación)
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging && elementRef.current) {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        onUpdate(element.id, {
          x: element.x + dx,
          y: element.y + dy,
        });
        setStartPos({ x: e.clientX, y: e.clientY }); // Actualizar posición inicial para el siguiente movimiento
      } else if (isResizing && elementRef.current) {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        const position = elementRef.current.dataset.resizePosition;

        let newWidth = startDim.width;
        let newHeight = startDim.height;
        let newX = element.x;
        let newY = element.y;

        // Lógica de redimensionamiento basada en la posición del handle
        if (position.includes("right")) {
          newWidth = startDim.width + dx;
        } else if (position.includes("left")) {
          newWidth = startDim.width - dx;
          newX = element.x + dx;
        }

        if (position.includes("bottom")) {
          newHeight = startDim.height + dy;
        } else if (position.includes("top")) {
          newHeight = startDim.height - dy;
          newY = element.y + dy;
        }

        // Asegurarse de que las dimensiones no sean negativas
        newWidth = Math.max(10, newWidth);
        newHeight = Math.max(10, newHeight);

        onUpdate(element.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      } else if (isRotating && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentAngle =
          Math.atan2(e.clientY - centerY, e.clientX - centerX) *
          (180 / Math.PI);
        const newRotation = currentAngle - startAngle;

        onUpdate(element.id, { rotation: newRotation });
      }
    },
    [
      isDragging,
      isResizing,
      isRotating,
      element,
      onUpdate,
      startPos,
      startDim,
      startAngle,
    ]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging && elementRef.current) {
        const dx = e.touches[0].clientX - startPos.x;
        const dy = e.touches[0].clientY - startPos.y;
        onUpdate(element.id, {
          x: element.x + dx,
          y: element.y + dy,
        });
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if (isResizing && elementRef.current) {
        const dx = e.touches[0].clientX - startPos.x;
        const dy = e.touches[0].clientY - startPos.y;
        const position = elementRef.current.dataset.resizePosition;

        let newWidth = startDim.width;
        let newHeight = startDim.height;
        let newX = element.x;
        let newY = element.y;

        if (position.includes("right")) {
          newWidth = startDim.width + dx;
        } else if (position.includes("left")) {
          newWidth = startDim.width - dx;
          newX = element.x + dx;
        }

        if (position.includes("bottom")) {
          newHeight = startDim.height + dy;
        } else if (position.includes("top")) {
          newHeight = startDim.height - dy;
          newY = element.y + dy;
        }

        newWidth = Math.max(10, newWidth);
        newHeight = Math.max(10, newHeight);

        onUpdate(element.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      } else if (isRotating && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentAngle =
          Math.atan2(
            e.touches[0].clientY - centerY,
            e.touches[0].clientX - centerX
          ) *
          (180 / Math.PI);
        const newRotation = currentAngle - startAngle;

        onUpdate(element.id, { rotation: newRotation });
      }
    },
    [
      isDragging,
      isResizing,
      isRotating,
      element,
      onUpdate,
      startPos,
      startDim,
      startAngle,
    ]
  );

  // Manejar el fin del arrastre/redimensionamiento/rotación
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
  }, []);

  // Añadir/eliminar listeners de eventos globalmente
  useEffect(() => {
    if (isDragging || isResizing || isRotating) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    isResizing,
    isRotating,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div
      ref={elementRef}
      className={`editor-element ${isActive ? "active" : ""}`}
      style={{
        position: "absolute",
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation || 0}deg)`,
        zIndex: element.zIndex,
        cursor: editorMode === "move" ? "grab" : "default", // Cambiar cursor según el modo
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {element.type === "image" && (
        <img
          src={element.src}
          alt="Diseño"
          className="w-full h-full object-contain"
          style={{ pointerEvents: "none" }}
        />
      )}
      {element.type === "text" && (
        <span
          style={{
            fontFamily: element.fontFamily,
            fontSize: `${element.fontSize}px`,
            color: element.color,
            whiteSpace: "nowrap", // Evitar que el texto se rompa
            pointerEvents: "none",
          }}
        >
          {element.content}
        </span>
      )}

      {/* Handles de redimensionamiento y rotación (solo si está activo y en modo correcto) */}
      {isActive && editorMode !== "move" && (
        <>
          {/* Handles de redimensionamiento */}
          <div
            className="resize-handle top-left"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
            onTouchStart={(e) => handleResizeTouchStart(e, "top-left")}
          />
          <div
            className="resize-handle top-right"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
            onTouchStart={(e) => handleResizeTouchStart(e, "top-right")}
          />
          <div
            className="resize-handle bottom-left"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
            onTouchStart={(e) => handleResizeTouchStart(e, "bottom-left")}
          />
          <div
            className="resize-handle bottom-right"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
            onTouchStart={(e) => handleResizeTouchStart(e, "bottom-right")}
          />
        </>
      )}
      {isActive && editorMode === "rotate" && (
        <div
          className="rotate-handle"
          onMouseDown={handleRotateMouseDown}
          onTouchStart={handleRotateTouchStart}
        >
          <i className="fas fa-sync-alt text-xs"></i>
        </div>
      )}
    </div>
  );
}

export default EditorElement;
