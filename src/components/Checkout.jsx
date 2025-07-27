// src/components/Checkout.jsx
import React, { useState, useEffect } from "react";

function Checkout({
  orderSummary,
  designElements,
  selectedLayout,
  canvasBackgroundColor,
  selectedModel,
  caseFrameUrls,
  onCompleteOrder,
  onBack,
}) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const checkoutPreviewRef = React.useRef(null);

  useEffect(() => {
    // Renderiza la vista previa del diseño en el paso de pago
    if (checkoutPreviewRef.current) {
      checkoutPreviewRef.current.innerHTML = ""; // Limpia el contenido anterior

      const tempCanvas = document.createElement("div");
      tempCanvas.className = "w-full h-full relative";
      tempCanvas.style.backgroundColor = canvasBackgroundColor;

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

      checkoutPreviewRef.current.appendChild(tempCanvas);
    }
  }, [
    designElements,
    selectedLayout,
    canvasBackgroundColor,
    selectedModel,
    caseFrameUrls,
  ]);

  const handleCompleteOrderClick = () => {
    setIsProcessing(true);
    onCompleteOrder();
  };

  let materialText = "";
  switch (orderSummary.material) {
    case "silicone":
      materialText = "Silicona";
      break;
    case "hardplastic":
      materialText = "Plástico Duro";
      break;
    case "leather":
      materialText = "Cuero";
      break;
    default:
      materialText = "N/A";
  }

  const layoutText =
    orderSummary.layout === "single" ? "Ventana única" : "Ventanas múltiples";

  return (
    <div id="checkout-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Atrás
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">
            Finalizar pedido
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen del pedido */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex mb-3">
                <div className="w-24 h-24 bg-white border rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-mobile-alt text-3xl text-gray-400"></i>
                </div>
                <div>
                  <h4 className="font-bold">
                    {orderSummary.model ? orderSummary.model.name : "N/A"}
                  </h4>
                  <p className="text-gray-600">Material: {materialText}</p>
                  <p className="text-gray-600">Diseño: {layoutText}</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between mb-1">
                  <span>Subtotal:</span>
                  <span id="checkout-subtotal">
                    ${orderSummary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Envío:</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span id="checkout-total">
                    ${orderSummary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Vista previa del diseño */}
            <h3 className="text-xl font-semibold mb-4">Tu diseño</h3>
            <div className="bg-white border rounded-lg p-2 flex justify-center">
              <div
                id="checkout-preview"
                ref={checkoutPreviewRef}
                className="relative w-48 h-80 bg-gray-100 overflow-hidden"
              >
                {/* La vista previa se renderizará aquí */}
              </div>
            </div>
          </div>

          {/* Opciones de pago */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Método de pago</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div
                className={`checkout-option border rounded-lg p-4 text-center cursor-pointer bg-white hover:bg-gray-50 transition-all hover:translate-y-[-5px] hover:shadow-md
                  ${
                    selectedPayment === "stripe"
                      ? "border-blue-500 ring-2 ring-blue-500"
                      : ""
                  }`}
                onClick={() => setSelectedPayment("stripe")}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/08/21/32/stripe-3384454_1280.png"
                  alt="Stripe"
                  className="h-12 mx-auto mb-3 object-contain"
                />
                <h4 className="font-semibold">Tarjeta de crédito</h4>
              </div>
              <div
                className={`checkout-option border rounded-lg p-4 text-center cursor-pointer bg-white hover:bg-gray-50 transition-all hover:translate-y-[-5px] hover:shadow-md
                  ${
                    selectedPayment === "paypal"
                      ? "border-blue-500 ring-2 ring-blue-500"
                      : ""
                  }`}
                onClick={() => setSelectedPayment("paypal")}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png"
                  alt="PayPal"
                  className="h-12 mx-auto mb-3 object-contain"
                />
                <h4 className="font-semibold">PayPal</h4>
              </div>
            </div>

            {/* Formulario de información de envío */}
            <h3 className="text-xl font-semibold mb-4">Información de envío</h3>
            <form id="shipping-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Calle y número"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ciudad"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Código postal"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">País</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Seleccionar país</option>
                    <option>Argentina</option>
                    <option>Chile</option>
                    <option>Colombia</option>
                    <option>México</option>
                    <option>Perú</option>
                    <option>España</option>
                    <option>Estados Unidos</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                id="complete-order-btn"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                onClick={handleCompleteOrderClick}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>{" "}
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock mr-2"></i> Completar pedido
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
