import React, { useEffect, useState } from "react";

function Confirmation({ onStartOver }) {
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setOrderDate(now.toLocaleDateString());
  }, []);

  return (
    <div id="confirmation-step" className="step-container">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-check text-4xl text-green-600"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4">¡Pedido completado!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Gracias por tu compra. Hemos recibido tu pedido y está siendo
          procesado.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8">
          <h3 className="font-semibold mb-3">Detalles del pedido</h3>
          <p className="mb-1">
            <strong>Número de pedido:</strong>{" "}
            <span className="text-blue-600">#ORD-24657</span>
          </p>
          <p className="mb-1">
            <strong>Fecha:</strong> <span id="order-date">{orderDate}</span>
          </p>
          <p>
            <strong>Correo de confirmación enviado a:</strong>{" "}
            <span id="order-email">usuario@ejemplo.com</span>
          </p>
        </div>

        <button
          id="start-over-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
          onClick={onStartOver}
        >
          Diseñar otra funda
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
