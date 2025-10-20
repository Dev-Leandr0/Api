
# 🛍️ E-commerce API

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, y **Sequelize**, pensada para un sistema de **e-commerce** modular y escalable. 
La estructura sigue buenas prácticas de arquitectura limpia, separando controladores, manejadores, validaciones, middlewares y modelos de base de datos.

---

## 🧩 Estructura del Proyecto

```bash
src/
├── config/                     # Configuración general del proyecto
│   └── logger.js               # Configuración y manejo de logs personalizados
│
├── controllers/                # Controladores: manejan la lógica de negocio
│   ├── authControllers.js
│   ├── cartControllers.js
│   ├── productsControllers.js
│   └── usersControllers.js
│
├── db/                         # Conexión y configuración de la base de datos
│   └── database.js
│
├── handlers/                   # Handlers: reciben las solicitudes HTTP y llaman a los controladores
│   ├── authHandlers.js
│   ├── cartHandlers.js
│   ├── productsHandlers.js
│   └── userHandlers.js
│
├── logs/                       # Registro de logs de acceso y errores con morgan
│   └── access.log
│
├── middleware/                 # Middlewares de Express para validación, autorización y manejo de errores
│   ├── authorizeMiddleware.js
│   ├── errorHandler.js
│   └── verifyToken.js
│
├── models/                     # Modelos de base de datos (definidos con Sequelize)
│   ├── Cart.js
│   ├── Cart_Items.js
│   ├── Category.js
│   ├── Order_Items.js
│   ├── Orders.js
│   ├── Product.js
│   ├── User.js
│   └── relations.js            # Relaciones entre modelos
│
├── Routes/                     # Definición y organización de rutas del servidor
│   ├── authRoutes.js
│   ├── mainRoute.js
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── validations/                # Validaciones de datos mediante Joi
│   ├── cartValidation.js
│   ├── productsValidation.js
│   └── userValidation.js
│
├── app.js                      # Configuración principal de la aplicación Express
└── index.js                    # Punto de entrada del servidor
```

### 📄 Archivos raíz

- `.env` → Variables de entorno del proyecto (no se versiona).
- `.gitignore` → Archivos y carpetas ignoradas por Git.
- `package.json` / `package-lock.json` → Dependencias, scripts y metadatos del proyecto.
- `README.md` → Documentación principal del proyecto.

---

## ⚙️ Configuración del entorno

El archivo `.env` debe contener las siguientes variables:

```bash
# Puerto donde corre tu servidor.
PORT=3000

# Entorno actual del servidor.
NODE_ENV=development #production
MORGAN_LOG=dev #combined

# Credenciales de MongoDB (opcional si usas PostgreSQL)
# MONGO_USER=
# MONGO_PASS=
# MONGO_CLUSTER=
# MONGO_DB=

# Credenciales de PostgreSQL
POSTGRESQL_DB=
POSTGRESQL_USER=
POSTGRESQL_PASS=

# Clave secreta para JWT
JWT_SECRET=
JWT_EXPIRES_IN=1m
```

---

## 🚀 Instalación y Ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Dev-Leandr0/Api.git
   cd ecommerce
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura tu archivo `.env`** según los valores indicados arriba.

4. **Ejecuta el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **O en modo producción:**
   ```bash
   npm start
   ```

---

## 🧠 Scripts disponibles

- `npm run dev` → Ejecuta el servidor con **Nodemon** para recarga automática.
- `npm start` → Inicia el servidor en modo producción.
- `npm test` → (opcional) Ejecuta las pruebas si están configuradas.

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **Joi** (validaciones)
- **JWT** (autenticación)
- **Morgan** (logs HTTP)

---

## 📦 Estructura modular

La API sigue una separación clara por capas:

- **Handlers:** Interactúan con las rutas HTTP.
- **Controllers:** Contienen la lógica de negocio.
- **Middlewares:** Validan, autentican y gestionan errores.
- **Models:** Definen los esquemas de base de datos.
- **Validations:** Validan datos de entrada antes de llegar a la lógica principal.

---

## 📚 Autor

Desarrollado por **Leandro Alegre**  
🧑‍💻 Técnico en Desarrollo de Software  
📘 En curso: Introducción a JavaScript  
🚀 Proyecto personal de práctica profesional