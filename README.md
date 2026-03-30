# 🏡 Sistema de Gestión Comunitaria – Residencial Los Robles

> Aplicación web Full-Stack diseñada para la administración integral, comunicación y finanzas de la colonia **Residencial Los Robles**.

El sistema busca modernizar y agilizar la comunicación entre los residentes y la mesa directiva, facilitar el registro y pago de cuotas de mantenimiento, y centralizar la información vital de la comunidad en un entorno seguro y privado.

---

## 🎯 Problemática que resuelve

Este sistema nace como una solución tecnológica a los siguientes desafíos comunes en la administración condominal:
- ❌ Errores, pérdidas o desorden en el registro de pagos manuales.
- ❌ Falta de comunicación efectiva y oficial entre la directiva y los vecinos.
- ❌ Dificultad para contactar rápidamente a la mesa directiva.
- ❌ Acceso limitado o nulo a información de emergencia y reglamentos.

---

## 🚀 Funcionalidades Principales

### 👤 Gestión de Usuarios y Seguridad
- Registro e inicio de sesión seguro.
- Autenticación mediante **JSON Web Tokens (JWT)** y contraseñas encriptadas (Bcrypt).
- Control de Accesos Basado en Roles (RBAC):
  - 🧑 **Residentes:** Acceso a historial de pagos, emergencias y comunicados.
  - 🛡️ **Administradores:** Control total del sistema, gestión de usuarios y finanzas.

### 🏠 Padrón de Residentes
- Directorio oficial y privado.
- Registro de información de contacto (Dirección, Teléfono, Número de Casa).
- Solo visible para la mesa directiva.

### 💳 Sistema de Pagos y Finanzas
- Registro de cuotas de mantenimiento.
- Historial completo de transacciones por usuario.
- Validación de montos y métodos de pago (Efectivo, Transferencia, Online).

### 📢 Panel de Comunicados
- Publicación de avisos oficiales por parte de la administración.
- Historial de anuncios para mantener a la comunidad informada.

### 🚨 Directorio de Emergencias
- Acceso rápido a servicios vitales (Hospitales, Policía, Bomberos, Protección Civil).
- Botones de llamada directa (Click-to-call) optimizados para móviles.

### 🔔 Sistema de Notificaciones *(En desarrollo / opcional)*
- Alertas por correo/SMS para recordatorios de pago y avisos de servicios.

---

## 🛠️ Tecnologías Utilizadas

**Frontend (Cliente):**
- React 18 (Vite)
- React Router DOM v6
- Axios
- CSS3 (Flexbox/Grid moderno)

**Backend (Servidor):**
- Node.js
- Express.js
- JSON Web Tokens (JWT) & Bcrypt

**Base de Datos:**
- MySQL (Driver `mysql2` con Promesas)

---

## 📁 Estructura del proyect
residencial-los-robles/
├── client/                 # Aplicación React (Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Navbar, etc.)
│   │   ├── pages/          # Vistas principales (Dashboard, Login, etc.)
│   │   └── services/       # Conexión a la API (Axios)
│
└── server/                 # API Node.js / Express
    ├── config/             # Configuración de base de datos
    ├── controllers/        # Lógica de negocio
    ├── middlewares/        # Autenticación y roles (RBAC)
    ├── models/             # Consultas SQL y modelos
    └── routes/             # Endpoints de la API REST

⚙️ Instalación

Clonar repositorio
Bash
git clone [https://github.com/ElAlets/residencial-los-robles.git](https://github.com/ElAlets/residencial-los-robles.git)
cd residencial-los-robles

Backend
Bash
cd server
npm install
npm run dev

Frontend
Abre una nueva terminal y ejecuta:
Bash
cd client
npm install
npm run dev

🌐 Variables de entorno
Crea un archivo .env en la carpeta /server con la siguiente estructura:

Fragmento de código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=residencial_los_robles
JWT_SECRET=tu_secreto

👨‍💻 Autor
Alejandro Barragán Pérez

📄 Licencia
Este proyecto está bajo la licencia MIT. Eres libre de utilizarlo, modificarlo y distribuirlo.
