// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import BrandSelection from "./components/BrandSelection";
import ModelSelection from "./components/ModelSelection";
import MaterialSelection from "./components/MaterialSelection";
import LayoutSelection from "./components/LayoutSelection";
import DesignEditor from "./components/DesignEditor";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import CropModal from "./components/CropModal";
import PreviewModal from "./components/PreviewModal";
import { phoneModels, caseFrameUrls } from "./data";
import { Helmet } from "react-helmet";

function App() {
  const [appState, setAppState] = useState({
    currentStep: 1,
    selectedBrand: null,
    selectedModel: null,
    selectedMaterial: null,
    selectedLayout: null,
    basePrice: 0,
    finalPrice: 0,
    editorElements: [],
    activeElement: null,
    nextElementZIndex: 1,
    canvasBackgroundColor: "#FFFFFF",
    isCropModalOpen: false,
    imageToCrop: null,
    isPreviewModalOpen: false,
    // Nuevo: imágenes por sección de grilla
    sectionImages: {},
    activeSectionId: null, // Para saber qué sección está siendo editada
  });

  useEffect(() => {
    let currentPrice = appState.selectedModel
      ? appState.selectedModel.price
      : 0;
    if (appState.selectedMaterial === "leather") {
      currentPrice += 9.0;
    } else if (appState.selectedMaterial === "hardplastic") {
      currentPrice -= 3.0;
    }
    setAppState((prevState) => ({
      ...prevState,
      finalPrice: currentPrice,
      basePrice: currentPrice,
    }));
  }, [appState.selectedModel, appState.selectedMaterial]);

  const goToStep = useCallback((step) => {
    setAppState((prevState) => ({ ...prevState, currentStep: step }));
  }, []);

  const handleSelectBrand = useCallback(
    (brand) => {
      setAppState((prevState) => ({
        ...prevState,
        selectedBrand: brand,
        selectedModel: null,
      }));
      goToStep(2);
    },
    [goToStep]
  );

  const handleSelectModel = useCallback(
    (model) => {
      setAppState((prevState) => ({ ...prevState, selectedModel: model }));
      goToStep(3);
    },
    [goToStep]
  );

  const handleSelectMaterial = useCallback(
    (material) => {
      setAppState((prevState) => ({
        ...prevState,
        selectedMaterial: material,
      }));
      goToStep(4);
    },
    [goToStep]
  );

  const handleSelectLayout = useCallback(
    (layout) => {
      setAppState((prevState) => ({
        ...prevState,
        selectedLayout: layout,
        editorElements: [],
        activeElement: null,
        nextElementZIndex: 1,
      }));
      goToStep(5);
    },
    [goToStep]
  );

  const handleAddEditorElement = useCallback((element) => {
    const canvasWidth = 280;
    const canvasHeight = 500;
    const initialWidth = canvasWidth * 0.7;
    const initialHeight = canvasHeight * 0.7;
    const initialX = (canvasWidth - initialWidth) / 2;
    const initialY = (canvasHeight - initialHeight) / 2;

    setAppState((prevState) => ({
      ...prevState,
      editorElements: [
        ...prevState.editorElements,
        {
          ...element,
          id: Date.now(),
          x: element.type === "image" ? initialX : 50,
          y: element.type === "image" ? initialY : 50,
          width: element.type === "image" ? initialWidth : "auto",
          height: element.type === "image" ? initialHeight : "auto",
          rotation: 0,
          zIndex: prevState.nextElementZIndex,
        },
      ],
      nextElementZIndex: prevState.nextElementZIndex + 1,
    }));
  }, []);

  const handleUpdateEditorElement = useCallback((id, updates) => {
    setAppState((prevState) => ({
      ...prevState,
      editorElements: prevState.editorElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  }, []);

  const handleDeleteEditorElement = useCallback((id) => {
    setAppState((prevState) => ({
      ...prevState,
      editorElements: prevState.editorElements.filter((el) => el.id !== id),
      activeElement:
        prevState.activeElement?.id === id ? null : prevState.activeElement,
    }));
  }, []);

  const handleSetActiveElement = useCallback((element) => {
    setAppState((prevState) => ({ ...prevState, activeElement: element }));
  }, []);

  const handleSetCanvasBackgroundColor = useCallback((color) => {
    setAppState((prevState) => ({
      ...prevState,
      canvasBackgroundColor: color,
    }));
  }, []);

  const handleOpenCropModal = useCallback((imageSrc, sectionId = null) => {
    setAppState((prevState) => ({
      ...prevState,
      isCropModalOpen: true,
      imageToCrop: imageSrc,
      activeSectionId: sectionId, // Guardar qué sección está siendo editada
    }));
  }, []);

  const handleCloseCropModal = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      isCropModalOpen: false,
      imageToCrop: null,
      activeSectionId: null,
    }));
  }, []);

  const handleApplyCroppedImage = useCallback(
    (croppedImage) => {
      if (appState.activeSectionId) {
        // Si hay una sección activa, agregar la imagen a esa sección específica
        setAppState((prevState) => ({
          ...prevState,
          sectionImages: {
            ...prevState.sectionImages,
            [appState.activeSectionId]: croppedImage,
          },
        }));
      } else {
        // Si no hay sección activa, usar el comportamiento original
        handleAddEditorElement({ type: "image", src: croppedImage });
      }
      handleCloseCropModal();
    },
    [appState.activeSectionId, handleAddEditorElement, handleCloseCropModal]
  );

  // Nueva función para manejar clic en sección de grilla
  const handleSectionClick = useCallback(
    (sectionId, imageSrc = null) => {
      if (imageSrc) {
        // Si ya hay una imagen, abrirla para editar
        handleOpenCropModal(imageSrc, sectionId);
      } else {
        // Si no hay imagen, permitir seleccionar de la galería o subir nueva
        setAppState((prevState) => ({
          ...prevState,
          activeSectionId: sectionId,
        }));
      }
    },
    [handleOpenCropModal]
  );

  // Nueva función para agregar imagen desde galería a sección específica
  const handleGalleryImageToSection = useCallback(
    (imageSrc, sectionId) => {
      handleOpenCropModal(imageSrc, sectionId);
    },
    [handleOpenCropModal]
  );

  // Nueva función para limpiar la sección activa
  const handleClearActiveSection = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      activeSectionId: null,
    }));
  }, []);

  const handleOpenPreviewModal = useCallback(() => {
    setAppState((prevState) => ({ ...prevState, isPreviewModalOpen: true }));
  }, []);

  const handleClosePreviewModal = useCallback(() => {
    setAppState((prevState) => ({ ...prevState, isPreviewModalOpen: false }));
  }, []);

  const handleContinueFromPreview = useCallback(() => {
    handleClosePreviewModal();
    goToStep(6);
  }, [handleClosePreviewModal, goToStep]);

  const handleCompleteOrder = useCallback(() => {
    setTimeout(() => {
      goToStep(7);
    }, 2000);
  }, [goToStep]);

  const handleStartOver = useCallback(() => {
    setAppState({
      currentStep: 1,
      selectedBrand: null,
      selectedModel: null,
      selectedMaterial: null,
      selectedLayout: null,
      basePrice: 0,
      finalPrice: 0,
      editorElements: [],
      activeElement: null,
      nextElementZIndex: 1,
      canvasBackgroundColor: "#FFFFFF",
      isCropModalOpen: false,
      imageToCrop: null,
      isPreviewModalOpen: false,
      sectionImages: {},
      activeSectionId: null,
    });
  }, []);

  const renderStep = () => {
    switch (appState.currentStep) {
      case 1:
        return <BrandSelection onSelectBrand={handleSelectBrand} />;
      case 2:
        return (
          <ModelSelection
            selectedBrand={appState.selectedBrand}
            phoneModels={phoneModels}
            onSelectModel={handleSelectModel}
            onBack={() => goToStep(1)}
          />
        );
      case 3:
        return (
          <MaterialSelection
            onSelectMaterial={handleSelectMaterial}
            selectedMaterial={appState.selectedMaterial}
            onBack={() => goToStep(2)}
          />
        );
      case 4:
        return (
          <LayoutSelection
            onSelectLayout={handleSelectLayout}
            selectedLayout={appState.selectedLayout}
            onBack={() => goToStep(3)}
          />
        );
      case 5:
        return (
          <DesignEditor
            selectedLayout={appState.selectedLayout}
            selectedModel={appState.selectedModel}
            caseFrameUrls={caseFrameUrls}
            editorElements={appState.editorElements}
            activeElement={appState.activeElement}
            canvasBackgroundColor={appState.canvasBackgroundColor}
            sectionImages={appState.sectionImages}
            activeSectionId={appState.activeSectionId}
            onAddElement={handleAddEditorElement}
            onUpdateElement={handleUpdateEditorElement}
            onDeleteElement={handleDeleteEditorElement}
            onSetActiveElement={handleSetActiveElement}
            onSetCanvasBackgroundColor={handleSetCanvasBackgroundColor}
            onOpenCropModal={handleOpenCropModal}
            onOpenPreviewModal={handleOpenPreviewModal}
            onSectionClick={handleSectionClick}
            onGalleryImageToSection={handleGalleryImageToSection}
            onClearActiveSection={handleClearActiveSection}
            onBack={() => goToStep(4)}
          />
        );
      case 6:
        return (
          <Checkout
            orderSummary={{
              model: appState.selectedModel,
              material: appState.selectedMaterial,
              layout: appState.selectedLayout,
              subtotal: appState.finalPrice,
              shipping: 4.99,
              total: appState.finalPrice + 4.99,
            }}
            designElements={appState.editorElements}
            selectedLayout={appState.selectedLayout}
            canvasBackgroundColor={appState.canvasBackgroundColor}
            selectedModel={appState.selectedModel}
            caseFrameUrls={caseFrameUrls}
            onCompleteOrder={handleCompleteOrder}
            onBack={() => goToStep(5)}
          />
        );
      case 7:
        return <Confirmation onStartOver={handleStartOver} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Helmet>

      <Header />
      <ProgressBar currentStep={appState.currentStep} />
      <main className="container mx-auto p-4 mb-10 flex-grow">
        {renderStep()}
      </main>

      {appState.isCropModalOpen && (
        <CropModal
          isOpen={appState.isCropModalOpen}
          imageSrc={appState.imageToCrop}
          onClose={handleCloseCropModal}
          onApply={handleApplyCroppedImage}
        />
      )}

      <PreviewModal
        isOpen={appState.isPreviewModalOpen}
        designElements={appState.editorElements}
        selectedLayout={appState.selectedLayout}
        canvasBackgroundColor={appState.canvasBackgroundColor}
        selectedModel={appState.selectedModel}
        caseFrameUrls={caseFrameUrls}
        onClose={handleClosePreviewModal}
        onContinue={handleContinueFromPreview}
      />

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Fundify</h3>
              <p className="text-gray-400">
                Fundas personalizadas de alta calidad para tu smartphone. Diseña
                la tuya ahora y recíbela en tu domicilio.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Diseños populares
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Política de envíos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Garantía
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-tiktok text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500">
            <p>&copy; 2025 Fundify. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
