# VACANTES-APP-FRONTEND

Repositorio del código fuente del **frontend** de la aplicación web **Vacantes App**, desarrollada con **React + Vite**.  
Este proyecto implementa una arquitectura **REST**, comunicándose con el **backend en Spring Boot** a través de endpoints definidos.

---

## Estructura a seguir en el repositorio

La nomenclatura para componentes y archivos es **PascalCase** (por ejemplo: `VacanteCard.jsx`, `LoginForm.jsx`).

La estructura de carpetas del proyecto se organiza de la siguiente manera:

vacantes-app-frontend/
├── public/                   # Archivos públicos como index.html, favicon, etc.
│   └── index.html            # Archivo principal de HTML
├── src/                      # Código fuente de la aplicación
│   ├── assets/               # Recursos estáticos como imágenes, estilos, etc.
│   ├── components/           # Componentes reutilizables
│   ├── hooks/                # Custom hooks
│   ├── layouts/              # Layouts generales de la app
│   ├── pages/                # Páginas o vistas principales
│   ├── services/             # Servicios para manejar API calls
│   ├── store/                # Configuración de estado global (e.g., Redux, Context)
│   ├── utils/                # Funciones y utilidades
│   ├── App.js                # Componente principal de la aplicación
|   ├── index.css             # CSS 
│   ├── index.js              # Punto de entrada de la aplicación
│   └── routes.js             # Configuración de rutas
├── .env                      # Variables de entorno
├── .gitignore                # Archivos a ignorar por Git
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto

---

## Descripción de cada carpeta

### **public/**
Contiene los archivos públicos que no se procesan por Vite, como `index.html` y `favicon`.

### **src/**
Directorio principal del código fuente.

- **api/** → Configura la conexión con la API (Axios, endpoints base).
- **assets/** → Contiene recursos estáticos (imágenes, íconos, fuentes, estilos).
- **components/** → Componentes reutilizables como `Navbar`, `Footer`, `VacanteCard`, etc.
- **contexts/** → Implementación de Context API (por ejemplo, autenticación).
- **hooks/** → Custom hooks reutilizables (ejemplo: `useAuth`, `useFetch`).
- **layouts/** → Estructuras base que se repiten (por ejemplo: `MainLayout`, `AdminLayout`).
- **pages/** → Páginas principales (por ejemplo: `HomePage`, `VacantesPage`, `LoginPage`).
- **routes/** → Configuración de rutas de la aplicación usando `react-router-dom`.
- **services/** → Funciones que manejan las peticiones HTTP hacia el backend REST (por ejemplo: `VacantesService`, `AuthService`).
- **utils/** → Funciones utilitarias y helpers (validaciones, formateo de datos, etc.).


---

## Tecnologías principales

- **React 18** – Biblioteca principal para construir la interfaz de usuario.  
- **Vite** – Entorno rápido de desarrollo y compilación.  
- **Axios** – Cliente HTTP para consumo de API REST.  
- **React Router DOM** – Manejo de rutas y navegación.  
- **Context API / Hooks** – Manejo de estado global y lógica compartida.  
- **CSS / Tailwind (opcional)** – Estilos globales o utilitarios.

---

##  Configuración del entorno

1. Clona el repositorio:
   git clone https://github.com/EfrenDLD/vacantes-app-FRONTEND.git

2. Instala dependencias:
  npm install

3. Crea el archivo .env en la raíz del proyecto y define la URL del backend:
  VITE_API_URL=http://localhost:8080/api


4. Ejecuta el entorno de desarrollo:
  npm run dev
  La aplicación se ejecutará en http://localhost:5173


## Instala dependencias:
  npm install

## Ejecuta el entorno de desarrollo:
  npm run dev
  La aplicación se ejecutará en http://localhost:5173

## Buenas prácticas

- Mantén la nomenclatura PascalCase para componentes (VacanteForm.jsx).
- Usa camelCase para funciones y variables (getVacantes, handleSubmit).
- Evita lógica de negocio dentro de los componentes:
- usa services/ y hooks/ para mantener un código limpio y escalable.
- Usa el archivo .env para configurar la URL del backend y otros parámetros sensibles.

