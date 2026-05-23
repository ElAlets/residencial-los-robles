# 🏘️ Sistema de Gestión Comunitaria – Residencial Los Robles

> Aplicación web Full-Stack diseñada para la administración, comunicación y gestión financiera de la colonia **Residencial Los Robles**.

El sistema moderniza la comunicación entre residentes y administración, facilita el control de cuotas de mantenimiento y centraliza información importante de la comunidad en un entorno seguro y privado.

---

## 📌 Problemática que resuelve

Este sistema nace como solución a problemas comunes en la administración condominal:

- ❌ Registro manual de pagos propenso a errores.
- ❌ Comunicación ineficiente entre administración y vecinos.
- ❌ Dificultad para consultar información importante.
- ❌ Falta de acceso rápido a contactos de emergencia.
- ❌ Ausencia de un directorio centralizado de residentes.

---

## ✨ Funcionalidades principales

### 🔐 Gestión de Usuarios y Seguridad

- Registro e inicio de sesión.
- Autenticación mediante **JWT (JSON Web Token)**.
- Contraseñas cifradas con **Bcrypt**.
- Control de acceso por roles (**RBAC**).

#### Roles implementados

### 👤 Residente

Puede acceder a:

- Dashboard del residente
- Comunicados de la colonia
- Historial de pagos
- Directorio de emergencias

### 🛡️ Administrador

Puede acceder a:

- Dashboard administrativo
- Gestión de residentes
- Alta, edición y eliminación de vecinos
- Registro de pagos
- Comunicados
- Gestión completa del sistema

---

## 🏡 Padrón de Residentes

- Directorio oficial privado.
- Registro de:
  - Dirección
  - Número de casa
  - Teléfono
- CRUD completo:
  - ➕ Crear vecino
  - ✏️ Editar vecino
  - 🗑️ Eliminar vecino

---

## 💳 Sistema de Pagos

- Registro de cuotas de mantenimiento.
- Historial de transacciones.
- Métodos de pago:
  - Efectivo
  - Transferencia
  - Online

---

## 📢 Panel de Comunicados

- Publicación de anuncios oficiales.
- Avisos comunitarios.
- Historial de comunicados.

---

## 🚨 Directorio de Emergencias

Acceso rápido a:

- 🚓 Policía
- 🚒 Bomberos
- 🏥 Hospitales
- 🛟 Protección Civil

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React 18
- Vite
- React Router DOM v6
- Axios
- CSS3 (Flexbox + Grid)

### Backend

- Node.js
- Express.js
- JWT
- Bcrypt
- Dotenv

### Base de datos

- MySQL / MariaDB
- mysql2

---

## 📂 Estructura del proyecto

```txt
residencial-los-robles/
│
├── client/                 # Frontend React + Vite
│
├── server/                 # Backend Node.js / Express
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
│
├── database/
│   ├── schema.sql          # Estructura BD
│   └── seed.sql            # Datos demo
│
├── README.md
└── .gitignore
```

---

## ⚙️ Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/ElAlets/residencial-los-robles.git
cd residencial-los-robles
```

---

### 2. Configurar base de datos

Importa:

```text
database/schema.sql
database/seed.sql
```

en **phpMyAdmin** o **MySQL Workbench**.

---

### 3. Configurar Backend

```bash
cd server
npm install
npm run dev
```

---

### 4. Configurar Frontend

Abre una nueva terminal:

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Variables de entorno

Crea un archivo:

```text
server/.env
```

con esta configuración:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=residencial_los_robles
PORT=5000
JWT_SECRET=secretkey
```

---

## 🧪 Usuarios demo

### 👨‍💼 Administrador

```text
Correo:
admin@test.com

Contraseña:
123456
```

### 👤 Residente

```text
Correo:
residente@test.com

Contraseña:
123456
```

---

## 🔒 Seguridad implementada

- Autenticación JWT
- Contraseñas encriptadas
- Middleware de autorización
- Protección de rutas privadas
- Control de acceso por roles (RBAC)

---

## 🚀 Futuras mejoras

- 📩 Notificaciones por correo
- 📱 Diseño responsive móvil
- 📄 Exportación de reportes PDF
- 💳 Integración de pagos reales
- 🔔 Sistema de notificaciones push

---

## 👨‍💻 Autor

**Alejandro Barragán Pérez**

Proyecto académico desarrollado para la materia de **PROYECTO II**.

---

## 📄 Licencia

Proyecto bajo licencia **MIT**.
