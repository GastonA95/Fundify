import React from "react";

function BrandSelection({ onSelectBrand }) {
  const brands = [
    // Rutas actualizadas para las imágenes locales en public/images/Marca/
    { name: "Samsung", dataBrand: "samsung", img: "/images/Marca/samsung.png" },
    {
      name: "motorola",
      dataBrand: "motorola",
      img: "/images/Marca/motorola.png",
    },
    { name: "xiaomi", dataBrand: "xiaomi", img: "/images/Marca/xiaomi.png" },
    { name: "iPhone", dataBrand: "iphone", img: "/images/Marca/iphone.png" },
    { name: "lg", dataBrand: "lg", img: "/images/Marca/lg.png" },
    { name: "huawei", dataBrand: "huawei", img: "/images/Marca/huawei.png" },
  ];

  return (
    <div id="brand-step" className="step-container active-step">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Selecciona la marca de tu teléfono
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.dataBrand}
              className="p-4 bg-white border rounded-lg shadow-sm text-center cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md"
              onClick={() => onSelectBrand(brand.dataBrand)}
            >
              {/* Contenedor de tamaño fijo para la imagen */}
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-800">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandSelection;
