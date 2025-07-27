// src/data/index.js
// Datos del modelo de teléfono - Esto provendría de una API en una aplicación real
export const phoneModels = {
  samsung: [
    {
      id: "samsung-s23",
      name: "Galaxy S23",
      price: 15.99,
      backViewImg: "/images/Modelo/samsung/s23.jpeg",
    },
    {
      id: "samsung-s23plus",
      name: "Galaxy S23+",
      price: 15.99,
      backViewImg: "/images/Modelo/samsung/s23plus.jpeg",
    },
    {
      id: "samsung-s23ultra",
      name: "Galaxy S23 Ultra",
      price: 17.99,
      backViewImg: "/images/Modelo/samsung/s23ultra.jpeg",
    },
    {
      id: "samsung-zfold4",
      name: "Galaxy Z Fold 4",
      price: 19.99,
      backViewImg: "/images/Modelo/samsung/zfold4.jpeg",
    },
    {
      id: "samsung-zflip4",
      name: "Galaxy Z Flip 4",
      price: 18.99,
      backViewImg: "/images/Modelo/samsung/zflip4.jpeg",
    },
    {
      id: "samsung-a54",
      name: "Galaxy A54",
      price: 14.99,
      backViewImg: "/images/Modelo/samsung/A52.webp",
    }, // Ajusta si tienes A54.webp
  ],
  motorola: [
    {
      id: "moto-g72",
      name: "Moto G72",
      price: 14.99,
      backViewImg: "/images/Modelo/motorola/G72.webp",
    },
    {
      id: "moto-g52",
      name: "Moto G52",
      price: 14.99,
      backViewImg: "/images/Modelo/motorola/G52.webp",
    },
    {
      id: "moto-edge30",
      name: "Moto Edge 30",
      price: 15.99,
      backViewImg: "/images/Modelo/motorola/edge-30.png",
    },
    {
      id: "moto-razr40",
      name: "Moto Razr 40",
      price: 18.99,
      backViewImg: "/images/Modelo/motorola/razr40.jpeg",
    },
  ],
  xiaomi: [
    {
      id: "xiaomi-13pro",
      name: "Xiaomi 13 Pro",
      price: 15.99,
      backViewImg: "/images/Modelo/xiaomi/note-13pro-5G.png",
    },
    {
      id: "xiaomi-13t",
      name: "Xiaomi 13T",
      price: 15.99,
      backViewImg: "/images/Modelo/xiaomi/note-13-5G.jpeg",
    },
    {
      id: "xiaomi-redminote12",
      name: "Redmi Note 12",
      price: 14.99,
      backViewImg: "/images/Modelo/xiaomi/redmi-13c-4G.png",
    },
    {
      id: "xiaomi-poco-f5",
      name: "POCO F5",
      price: 15.99,
      backViewImg: "/images/Modelo/xiaomi/POCO-F5.jpeg",
    },
  ],
  iphone: [
    {
      id: "iphone-15promax",
      name: "iPhone 15 Pro Max",
      price: 19.99,
      backViewImg: "/images/Modelo/iphone/15proMax.avif",
    },
    {
      id: "iphone-15pro",
      name: "iPhone 15 Pro",
      price: 18.99,
      backViewImg: "/images/Modelo/iphone/15pro.avif",
    },
    {
      id: "iphone-15plus",
      name: "iPhone 15 Plus",
      price: 17.99,
      backViewImg: "/images/Modelo/iphone/15plus.webp",
    },
    {
      id: "iphone-15",
      name: "iPhone 15",
      price: 16.99,
      backViewImg: "/images/Modelo/iphone/15.webp",
    },
    {
      id: "iphone-14",
      name: "iPhone 14",
      price: 15.99,
      backViewImg: "/images/Modelo/iphone/14.avif",
    },
    {
      id: "iphone-13",
      name: "iPhone 13",
      price: 15.99,
      backViewImg: "/images/Modelo/iphone/13.avif",
    },
    {
      id: "iphone-12",
      name: "iPhone 12",
      price: 15.99,
      backViewImg: "/images/Modelo/iphone/12proMax.avif",
    }, // Usando 12proMax.avif como ejemplo para 12
    {
      id: "iphone-11",
      name: "iPhone 11",
      price: 15.99,
      backViewImg: "/images/Modelo/iphone/11.jpeg",
    },
  ],
  lg: [
    {
      id: "lg-velvet",
      name: "LG Velvet",
      price: 14.99,
      backViewImg: "/images/Modelo/lg/velvet.jpeg",
    },
    {
      id: "lg-wing",
      name: "LG Wing",
      price: 16.99,
      backViewImg: "/images/Modelo/lg/wing.jpeg",
    },
    {
      id: "lg-v60",
      name: "LG V60 ThinQ",
      price: 15.99,
      backViewImg: "/images/Modelo/lg/v60.jpeg",
    },
  ],
  huawei: [
    {
      id: "huawei-p60pro",
      name: "Huawei P60 Pro",
      price: 16.99,
      backViewImg: "/images/Modelo/huawei/p60pro.jpeg",
    },
    {
      id: "huawei-p60",
      name: "Huawei P60",
      price: 15.99,
      backViewImg: "/images/Modelo/huawei/p60.jpeg",
    },
    {
      id: "huawei-mate50pro",
      name: "Huawei Mate 50 Pro",
      price: 17.99,
      backViewImg: "/images/Modelo/huawei/mate50pro.jpeg",
    },
    {
      id: "huawei-nova11",
      name: "Huawei Nova 11",
      price: 14.99,
      backViewImg: "/images/Modelo/huawei/nova11.jpeg",
    },
  ],
};

// Mapeo de imágenes de marcos de fundas (asegúrate de que estas rutas coincidan con tus archivos en public/images/Fundas/)
export const caseFrameUrls = {
  // Ejemplos genéricos para Samsung, Motorola, Xiaomi, LG, Huawei - AJUSTA SI TIENES ARCHIVOS ESPECÍFICOS
  "samsung-s23": "/images/Fundas/samsung-s23-frame.png",
  "samsung-s23plus": "/images/Fundas/samsung-s23plus-frame.png",
  "samsung-s23ultra": "/images/Fundas/samsung-s23ultra-frame.png",
  "samsung-zfold4": "/images/Fundas/samsung-zfold4-frame.png",
  "samsung-zflip4": "/images/Fundas/samsung-zflip4-frame.png",
  "samsung-a54": "/images/Fundas/samsung-a54-frame.png",
  "moto-g72": "/images/Fundas/moto-g72-frame.png",
  "moto-g52": "/images/Fundas/moto-g52-frame.png",
  "moto-edge30": "/images/Fundas/moto-edge30-frame.png",
  "moto-razr40": "/images/Fundas/moto-razr40-frame.png",
  "xiaomi-13pro": "/images/Fundas/xiaomi-13pro-frame.png",
  "xiaomi-13t": "/images/Fundas/xiaomi-13t-frame.png",
  "xiaomi-redminote12": "/images/Fundas/xiaomi-redminote12-frame.png",
  "xiaomi-poco-f5": "/images/Fundas/xiaomi-poco-f5-frame.png",
  // Rutas de Fundas para iPhone basadas en tu captura de pantalla
  "iphone-15promax": "/images/Fundas/15proMax.png",
  "iphone-15pro": "/images/Fundas/15pro.png",
  "iphone-15plus": "/images/Fundas/15plus.png",
  "iphone-15": "/images/Fundas/15.png",
  "iphone-14": "/images/Fundas/14.png",
  "iphone-13": "/images/Fundas/13.png",
  "iphone-12": "/images/Fundas/12.png", // Usando 12.png
  "iphone-11": "/images/Fundas/11.png",
  "lg-velvet": "/images/Fundas/lg-velvet-frame.png",
  "lg-wing": "/images/Fundas/lg-wing-frame.png",
  "lg-v60": "/images/Fundas/lg-v60-frame.png",
  "huawei-p60pro": "/images/Fundas/huawei-p60pro-frame.png",
  "huawei-p60": "/images/Fundas/huawei-p60-frame.png",
  "huawei-mate50pro": "/images/Fundas/huawei-mate50pro-frame.png",
  "huawei-nova11": "/images/Fundas/huawei-nova11-frame.png",
};
