// src/components/DesignEditor.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import EditorElement from "./EditorElement"; // Asegúrate de importar el nuevo componente

function DesignEditor({
  selectedLayout,
  selectedModel,
  caseFrameUrls,
  editorElements,
  activeElement,
  canvasBackgroundColor,
  onAddElement,
  onUpdateElement,
  onDeleteElement,
  onSetActiveElement,
  onSetCanvasBackgroundColor,
  onOpenCropModal,
  onOpenPreviewModal,
  onBack,
}) {
  const [editorMode, setEditorMode] = useState("move"); // 'move', 'resize', 'rotate'
  const [showTextControls, setShowTextControls] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [uploadLoading, setUploadLoading] = useState(false);

  const imageUploadRef = useRef(null);
  const canvasRef = useRef(null); // Referencia al contenedor principal del lienzo

  // Set initial background color when component mounts or layout changes
  useEffect(() => {
    if (canvasRef.current) {
      if (selectedLayout === "single") {
        canvasRef.current.style.backgroundColor = canvasBackgroundColor;
      } else {
        const windows = canvasRef.current.querySelectorAll(".window");
        windows.forEach((window) => {
          window.style.backgroundColor = canvasBackgroundColor;
        });
      }
    }
  }, [canvasBackgroundColor, selectedLayout]);

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadLoading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        onOpenCropModal(event.target.result);
        setUploadLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery image selection
  const handleGalleryImageClick = (src) => {
    onOpenCropModal(src);
  };

  // Handle adding text
  const handleAddText = () => {
    setShowTextControls(true);
  };

  const handleApplyText = () => {
    if (textInput.trim() !== "") {
      // Posición inicial centrada y tamaño predeterminado para texto
      const initialX = 50;
      const initialY = 50;
      const initialWidth = "auto"; // El ancho se ajustará al contenido
      const initialHeight = "auto"; // La altura se ajustará al contenido

      onAddElement({
        type: "text",
        content: textInput,
        fontFamily,
        fontSize,
        color: textColor,
        x: initialX,
        y: initialY,
        width: initialWidth,
        height: initialHeight,
        rotation: 0,
        zIndex: 2, // Z-index bajo para que esté detrás del marco de la funda
      });
      setTextInput("");
      setShowTextControls(false);
    }
  };

  // Toolbar actions
  const handleToolbarAction = (action) => {
    if (["move", "resize", "rotate"].includes(action)) {
      setEditorMode(action);
    } else if (action === "delete") {
      if (activeElement) {
        onDeleteElement(activeElement.id);
      }
    } else if (action === "bring-forward") {
      if (activeElement) {
        onUpdateElement(activeElement.id, {
          zIndex: (activeElement.zIndex || 1) + 1,
        });
      }
    } else if (action === "send-backward") {
      if (activeElement && activeElement.zIndex > 1) {
        onUpdateElement(activeElement.id, { zIndex: activeElement.zIndex - 1 });
      }
    } else if (action === "preview") {
      onOpenPreviewModal();
    }
  };

  // Render elements on canvas
  const renderCanvasContent = () => {
    // Ordena los elementos por zIndex para asegurar el renderizado correcto
    const sortedElements = [...editorElements].sort(
      (a, b) => (a.zIndex || 1) - (b.zIndex || 1)
    );

    const elementsToRender = sortedElements.map((el) => (
      <EditorElement
        key={el.id}
        element={el}
        editorMode={editorMode}
        isActive={activeElement && activeElement.id === el.id}
        onSelect={onSetActiveElement}
        onUpdate={onUpdateElement}
      />
    ));

    // La imagen de la funda siempre debe estar en la parte superior (mayor z-index)
    const caseFrameOverlay =
      selectedModel && caseFrameUrls[selectedModel.id] ? (
        <img
          src={caseFrameUrls[selectedModel.id]}
          alt="Marco de la funda del teléfono"
          className="case-frame-overlay"
          style={{ zIndex: 10 }} // Mayor z-index para que esté siempre encima
        />
      ) : null;

    const renderLayoutContent = () => {
      // Área interior del teléfono (ajustada para quedar dentro del marco)
      const phoneInteriorStyle = {
        position: 'absolute',
        top: '8%',    // Margen superior para evitar la cámara
        left: '6%',   // Margen izquierdo del marco
        right: '6%',  // Margen derecho del marco  
        bottom: '6%', // Margen inferior del marco
        zIndex: 1
      };

      switch (selectedLayout) {
        case "single":
          return (
            <div className="w-full h-full relative">
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "horizontal-2":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full flex flex-col gap-1">
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 1</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 2</span>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "horizontal-3":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full flex flex-col gap-1">
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 1</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 2</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 3</span>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "vertical-2":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full flex gap-1">
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 1</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Sección 2</span>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "grid-2x2":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1">
                  <div className="bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">1</span>
                  </div>
                  <div className="bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">2</span>
                  </div>
                  <div className="bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">3</span>
                  </div>
                  <div className="bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">4</span>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "mixed-left":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full flex gap-1">
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Principal</span>
                  </div>
                  <div className="w-1/3 flex flex-col gap-1">
                    <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                      <span className="text-gray-500 text-xs">1</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                      <span className="text-gray-500 text-xs">2</span>
                    </div>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "mixed-top":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full flex flex-col gap-1">
                  <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-gray-500 text-xs">Principal</span>
                  </div>
                  <div className="h-1/3 flex gap-1">
                    <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                      <span className="text-gray-500 text-xs">1</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70">
                      <span className="text-gray-500 text-xs">2</span>
                    </div>
                  </div>
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        case "grid-3x3":
          return (
            <div className="w-full h-full relative">
              <div style={phoneInteriorStyle}>
                <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1">
                  {[...Array(9)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded border border-gray-300 flex items-center justify-center opacity-70"
                    >
                      <span className="text-gray-500 text-xs">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );

        default:
          return (
            <div className="w-full h-full relative">
              {elementsToRender}
              {caseFrameOverlay}
            </div>
          );
      }
    };

    return (
      <div
        id="canvas-content"
        ref={canvasRef}
        className="w-full h-full relative"
        style={{ backgroundColor: canvasBackgroundColor }}
        onClick={(e) => {
          // Deseleccionar elemento si se hace clic en el fondo del lienzo
          if (e.target === canvasRef.current || e.target.classList.contains("border-gray-300")) {
            onSetActiveElement(null);
          }
        }}
      >
        {renderLayoutContent()}
      </div>
    );
  };

  return (
    <div id="editor-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">
            Personaliza tu diseño
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Izquierdo - Opciones */}
          <div className="bg-gray-50 rounded-lg p-4 order-2 lg:order-1">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Imágenes</h3>
              <div className="mb-4">
                <button
                  id="upload-image-btn"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  onClick={() => imageUploadRef.current.click()}
                >
                  <i className="fas fa-upload mr-2"></i> Subir imagen
                </button>
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  ref={imageUploadRef}
                  onChange={handleImageUpload}
                />
              </div>
              <h4 className="font-medium mb-2">O elige de nuestra galería:</h4>
              <div id="gallery-images" className="grid grid-cols-3 gap-2">
                {[
                  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                  "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",
                  "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg",
                  "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
                  "https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_1280.jpg",
                  "https://cdn.pixabay.com/photo/2015/01/28/23/35/hills-615429_1280.jpg",
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="gallery-image rounded-md w-full h-20 object-cover cursor-pointer transition-transform hover:scale-105"
                    alt={`Galería ${index + 1}`}
                    onClick={() => handleGalleryImageClick(src)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Texto</h3>
              <button
                id="add-text-btn"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors mb-3 flex items-center justify-center"
                onClick={handleAddText}
              >
                <i className="fas fa-font mr-2"></i> Añadir texto
              </button>

              {showTextControls && (
                <div
                  id="text-controls"
                  className="bg-white p-3 rounded-lg border"
                >
                  <input
                    type="text"
                    id="text-input"
                    placeholder="Escribe aquí..."
                    className="w-full p-2 border rounded mb-2"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <select
                      id="font-family"
                      className="p-2 border rounded"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                    </select>

                    <input
                      type="number"
                      id="font-size"
                      min="8"
                      max="72"
                      value={fontSize}
                      className="p-2 border rounded"
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="color"
                      id="text-color"
                      value={textColor}
                      className="w-full h-10"
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                    <button
                      id="apply-text-btn"
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                      onClick={handleApplyText}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Fondo</h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  "#FFFFFF",
                  "#000000",
                  "#EF4444",
                  "#3B82F6",
                  "#10B981",
                  "#F59E0B",
                  "#8B5CF6",
                  "#EC4899",
                ].map((color, index) => (
                  <div
                    key={index}
                    className="w-full h-10 border rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => onSetCanvasBackgroundColor(color)}
                  ></div>
                ))}
              </div>
              <input
                type="color"
                id="custom-bg-color"
                className="w-full h-10 mb-3"
                value={canvasBackgroundColor}
                onChange={(e) => onSetCanvasBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          {/* Panel Central - Canvas */}
          <div className="col-span-2 order-1 lg:order-2">
            <div className="editor-toolbar bg-gray-100 p-3 rounded-t-lg border-x border-t flex flex-wrap gap-2">
              <button
                id="btn-move"
                className={`p-2 bg-white rounded border hover:bg-gray-50 ${
                  editorMode === "move" ? "active bg-blue-600 text-white" : ""
                }`}
                title="Mover"
                onClick={() => handleToolbarAction("move")}
              >
                <i className="fas fa-arrows-alt"></i>
              </button>
              <button
                id="btn-resize"
                className={`p-2 bg-white rounded border hover:bg-gray-50 ${
                  editorMode === "resize" ? "active bg-blue-600 text-white" : ""
                }`}
                title="Redimensionar"
                onClick={() => handleToolbarAction("resize")}
              >
                <i className="fas fa-expand-arrows-alt"></i>
              </button>
              <button
                id="btn-rotate"
                className={`p-2 bg-white rounded border hover:bg-gray-50 ${
                  editorMode === "rotate" ? "active bg-blue-600 text-white" : ""
                }`}
                title="Rotar"
                onClick={() => handleToolbarAction("rotate")}
              >
                <i className="fas fa-sync-alt"></i>
              </button>
              <button
                id="btn-bring-forward"
                className="p-2 bg-white rounded border hover:bg-gray-50"
                title="Traer adelante"
                onClick={() => handleToolbarAction("bring-forward")}
              >
                <i className="fas fa-level-up-alt"></i>
              </button>
              <button
                id="btn-send-backward"
                className="p-2 bg-white rounded border hover:bg-gray-50"
                title="Enviar atrás"
                onClick={() => handleToolbarAction("send-backward")}
              >
                <i className="fas fa-level-down-alt"></i>
              </button>
              <button
                id="btn-delete"
                className="p-2 bg-white rounded border hover:bg-gray-50 text-red-500"
                title="Eliminar"
                onClick={() => handleToolbarAction("delete")}
              >
                <i className="fas fa-trash"></i>
              </button>
              <div className="ml-auto">
                <button
                  id="btn-preview"
                  className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  onClick={() => handleToolbarAction("preview")}
                >
                  <i className="fas fa-eye mr-1"></i> Vista previa
                </button>
              </div>
            </div>

            <div
              id="phone-canvas-container"
              className="canvas-container bg-white border-x border-b rounded-b-lg"
            >
              {renderCanvasContent()}

              {/* Overlay de carga */}
              {uploadLoading && (
                <div
                  id="upload-loader"
                  className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p>Cargando imagen...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                id="next-to-checkout"
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center"
                onClick={onOpenPreviewModal}
              >
                Finalizar diseño <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignEditor;
