import React from "react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Aumentado el tamaño del logo a h-12 */}
          <img
            src="/images/fundifyLogo.png"
            alt="Fundify Logo"
            className="h-14 object-contain mr-3"
          />
        </div>
        <div>
          <span className="hidden sm:inline mr-4">
            Fundas personalizadas para tu smartphone
          </span>
          <a
            href="#"
            className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            <span id="cart-count">0</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
