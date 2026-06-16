---
sidebar_position: 1
---

# Argos

## 1. Resumen ejecutivo

Argos es una billetera digital construida con arquitectura modular. El proyecto permite registrar usuarios, autenticar sesiones, validar identidad, consultar productos financieros, operar desde un dashboard, realizar pagos o transferencias y ejecutar transacciones como pagos de servicios o recargas.

La validacion de identidad no es el producto principal: es una pieza de seguridad dentro del alta digital. El objetivo general de Argos es entregar una experiencia financiera completa para web y mobile, manteniendo cada dominio separado en microfrontends y microservicios.

## 2. Que problema resuelve

Argos busca centralizar en una sola billetera digital los flujos principales de un usuario financiero:

- Crear una cuenta digital.
- Validar datos de contacto mediante OTP.
- Validar identidad mediante KYC, OCR y biometria.
- Iniciar sesion con mecanismos seguros.
- Ver productos, saldos y opciones disponibles.
- Enviar dinero o realizar transferencias P2P.
- Pagar servicios, hacer recargas y revisar comprobantes.
- Adaptar la experiencia visual por marca o empresa.

## 3. Arquitectura general

```text
Usuario Web / Mobile
  |
  |-- Host web: ivt-mf-rc-webonboarding
  |-- Host mobile: ivt-mf-rc-mobclient
        |
        |-- MFEs federados por dominio
        |     |-- oauth
        |     |-- otp
        |     |-- onboarding
        |     |-- identity
        |     |-- dashboard
        |     |-- products
        |     |-- payment
        |     |-- transactions
        |
        |-- Backend / Microservicios
              |-- onboarding
              |-- oauth
              |-- otp
              |-- identity
              |-- branding
              |-- products
              |-- integration / external services
              |-- ocr service
              |-- orchestrator lambda
```

## 4. Componentes frontend

### Host web: `ivt-mf-rc-webonboarding`

Es el contenedor web principal. Resuelve la marca por URL, aplica branding, muestra la experiencia web y monta los microfrontends remotos.

Consume:

- `ivt-mf-rc-oauth`
- `ivt-mf-rc-otp`
- `ivt-mf-rc-onboarding`
- `ivt-mf-rc-identity`
- `ivt-mf-rc-products`
- `ivt-mf-rc-dashboard`
- `ivt-mf-rc-payment`
- `ivt-mf-rc-transactions`

Puerto local:

```text
5173
```

### Host mobile: `ivt-mf-rc-mobclient`

Es el contenedor tecnico para Android. Carga branding, decide el flujo global, monta remotos mobile y pasa callbacks, marca y estado base.

Puerto local:

```text
8081
```

### Branding compartido: `ivt-mf-rc-shrbranding`

Paquete local que centraliza configuracion visual:

- marcas
- paletas
- textos
- recursos
- layout por pantalla
- campos dinamicos
- botones dinamicos
- modulos habilitados
- validaciones simples

Hoy contiene marcas como `argos` y `test`. En paralelo existe el microservicio `ivt-ms-nj-branding` para mover esa configuracion a backend y PostgreSQL.

### Auth: `ivt-mf-rc-oauth`

MFE responsable del dominio de autenticacion:

- login
- validacion de PIN
- recuperacion de acceso
- manejo de sesion
- tokens
- biometria local del dispositivo cuando aplica

Puertos:

```text
Web: 9101
Mobile: 9001
Deploy web: /oauth/assets/remoteEntry.js
```

### OTP: `ivt-mf-rc-otp`

MFE responsable del flujo de codigos temporales:

- seleccion de canal
- envio/reenvio de codigo
- timer
- ingreso y validacion del OTP
- retorno del resultado al flujo padre

Puertos:

```text
Web: 9102
Mobile: 9002
Deploy web: /otp/assets/remoteEntry.js
```

### Onboarding: `ivt-mf-rc-onboarding`

MFE orquestador del alta de usuario. No valida biometria ni OTP directamente; consume otros dominios.

Coordina:

- registro inicial
- journey `onboarding-normal`
- journey `onboarding-digital`
- OTP
- KYC
- seleccion de productos
- creacion de acceso/PIN

Puertos:

```text
Web: 9104
Mobile: 9004
Deploy web: /onboarding/assets/remoteEntry.js
```

### Identity / KYC: `ivt-mf-rc-identity`

MFE responsable de identidad dentro del alta digital.

Funciones:

- captura frontal del DNI
- captura posterior del DNI
- captura de selfie
- validacion de documento con OCR
- validacion facial/liveness
- envio de evidencias al backend
- retorno de resultado KYC al onboarding

El trabajo reciente del SDK vive aqui: deteccion del documento en camara, captura automatica cuando el DNI esta estable, recorte del documento antes de enviarlo y preparacion de imagen para OCR.

Puertos:

```text
Web: 9105
Mobile: 9005
Deploy web: /identity/assets/remoteEntry.js
```

### Dashboard: `ivt-mf-rc-dashboard`

MFE del home principal post-login.

Funciones:

- resumen de saldos y productos activos
- centro de navegacion
- accesos rapidos
- entrada a pagos P2P
- entrada a pagos de servicios y recargas
- estados globales de error o servicio no disponible

Puertos:

```text
Web: 9103
Mobile: 9003
Deploy web: /dashboard/assets/remoteEntry.js
```

### Products: `ivt-mf-rc-products`

MFE de productos financieros.

Funciones:

- catalogo de productos
- seleccion de producto
- vista dinamica por producto
- datos laborales
- revision y firma
- pantalla final de confirmacion

Puertos:

```text
Web: 9106
Mobile: 9006
Deploy web: /products/assets/remoteEntry.js
```

### Payment: `ivt-mf-rc-payment`

MFE para pagos P2P y transferencias.

Funciones:

- seleccion de contacto
- ingreso de monto
- validacion contra saldo
- seleccion de canal
- confirmacion
- comprobante digital

Puertos:

```text
Web: 9107
Mobile: 9007
Deploy web: /payment/assets/remoteEntry.js
```

### Transactions: `ivt-mf-rc-transactions`

MFE para operaciones transaccionales no P2P.

Funciones:

- pagos de servicios
- recargas
- busqueda de empresas/convenios
- consulta de deudas
- comprobantes

Puertos:

```text
Web: 9108
Mobile: 9008
Deploy web: /transactions/assets/remoteEntry.js
```

## 5. Componentes backend

### `ivt-ms-nd-omboarding`

Microservicio de registro real de usuarios.

Endpoints principales:

```text
GET  /onboarding/health
POST /onboarding/register/availability
POST /onboarding/register
GET  /onboarding/docs
```

Escribe en tablas usadas luego por OAuth, como `auth.entity`, `auth.user` y `auth.user_config`.

Puerto local:

```text
4002
```

### `ivt-ms-nj-oauth`

Microservicio de autenticacion.

Endpoints principales:

```text
GET  /health
GET  /docs
POST /auth/login/verificar-dispositivo
POST /auth/login/iniciar
POST /auth/login/verificar-codigo
POST /auth/login/verificar-pin
```

Usa PostgreSQL, Drizzle ORM, Express, Zod y Swagger.

### `ivt-ms-nj-otp`

Microservicio de codigos OTP.

Endpoints principales:

```text
POST /otp/iniciar
POST /otp/verificar
POST /onboarding/register/iniciar-codigo
POST /onboarding/register/verificar-codigo
POST /auth/login/iniciar
POST /auth/login/verificar-codigo
```

Puerto local:

```text
4003
```

### `ivt-ms-nj-identity`

Microservicio de validacion de identidad. Recibe el payload OCR/MRZ y valida si el DNI existe o se registra en DynamoDB.

Endpoints principales:

```text
POST /identity/validate-document
POST /identity/register-dni
```

Puerto local:

```text
4005
```

### `ivt-ms-nj-branding`

Microservicio de configuracion de marca desde PostgreSQL. Reemplaza progresivamente la configuracion local de `shrbranding`.

Endpoints principales:

```text
GET /health
GET /branding/health
GET /docs
GET /branding/docs
GET /docs.json
GET /branding/docs.json
GET /branding/marca/:empresaId
```

Puerto local:

```text
4004
```

### `ivt-ms-nj-products`

Microservicio de productos y contratos.

Endpoints principales:

```text
GET  /health
GET  /products/health
GET  /docs
GET  /products/docs
POST /products/contracts/pdf
POST /products/contracts/pdf/base64
GET  /products/contracts/pdf/base64?path=contracts/contrato.pdf
```

Usa S3 para almacenar y recuperar PDFs de contratos.

### `ivt-ms-nj-servexternal`

Microservicio de integraciones externas.

Funciones:

- envio de SMS
- envio de correos
- lectura de credenciales SMTP desde PostgreSQL
- integracion con proveedores externos `arg-sms` y `arg-email`

Endpoints principales:

```text
GET  /health
GET  /integration/health
GET  /integration/health/db
POST /integration/send/sms
POST /integration/send/email
```

## 6. OCR y SDK dentro de Argos

El OCR no es una billetera por si solo. Es una capacidad de soporte usada por `ivt-mf-rc-identity` para mejorar el proceso KYC.

Flujo simplificado:

```text
Identity MFE
  |
  |-- SDK de camara detecta documento
  |-- captura automatica cuando el DNI esta estable
  |-- recorta y normaliza imagen
  |
  v
OCR Service
  |
  |-- lee datos del DNI
  |-- estructura campos
  |-- recorta foto de la persona del DNI cuando aplica
  |
  v
Identity Backend
  |
  |-- valida o registra DNI
  |-- devuelve resultado KYC al onboarding
```

Tecnologias usadas en OCR:

- Python
- FastAPI
- PaddleOCR / PaddlePaddle
- Pillow
- boto3
- Docker
- ECS/Fargate
- S3
- OpenAPI / Swagger JSON

Tecnologias usadas en SDK/captura:

- React
- React Native Web
- TypeScript
- MediaDevices / getUserMedia
- Canvas API
- analisis de bordes y contraste
- estabilidad por frames
- recorte automatico del documento

## 7. Flujo de negocio principal

### Alta digital

```text
1. Usuario entra al host web o mobile.
2. Host resuelve marca y journey.
3. Onboarding captura datos iniciales.
4. OTP valida correo o telefono.
5. Identity valida DNI, OCR y selfie/liveness.
6. Products permite seleccionar producto.
7. OAuth crea acceso/PIN.
8. Usuario llega al dashboard.
```

### Login

```text
1. Usuario ingresa identificador.
2. OAuth valida dispositivo o contexto.
3. OTP valida codigo si aplica.
4. OAuth valida PIN.
5. Se crea sesion.
6. Dashboard muestra productos y accesos.
```

### Operacion de billetera

```text
1. Usuario entra al dashboard.
2. Consulta saldos/productos.
3. Elige enviar dinero, pagar servicio o recargar.
4. Payment o Transactions ejecuta el flujo.
5. Se genera comprobante.
```

## 8. Tecnologias principales del proyecto

Frontend:

- React
- React Native
- React Native Web
- TypeScript
- Vite
- Module Federation con `@originjs/vite-plugin-federation`
- Re.Pack / Rspack para mobile federation
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Firebase en host web/mobile cuando aplica

Backend:

- Node.js
- TypeScript
- Express
- Zod
- Drizzle ORM
- PostgreSQL
- Swagger / OpenAPI
- Vitest
- Supertest
- serverless-http
- AWS Lambda
- DynamoDB en identidad
- S3 en productos/OCR

OCR / procesamiento:

- Python
- FastAPI
- PaddleOCR
- PaddlePaddle
- Docker
- ECS/Fargate
- API Gateway
- Lambda orquestadora

## 9. Como levantar localmente

Desde la raiz del proyecto:

```powershell
C:\Users\Josue Cumpa\Desktop\argos_pry
```

### Levantar todos los MFEs web

```powershell
.\start-web-mfes.ps1
```

Esto usa:

```text
Host web: http://localhost:5173
oauth:        http://localhost:9101/assets/remoteEntry.js
otp:          http://localhost:9102/assets/remoteEntry.js
dashboard:    http://localhost:9103/assets/remoteEntry.js
onboarding:   http://localhost:9104/assets/remoteEntry.js
identity:     http://localhost:9105/assets/remoteEntry.js
products:     http://localhost:9106/assets/remoteEntry.js
payment:      http://localhost:9107/assets/remoteEntry.js
transactions: http://localhost:9108/assets/remoteEntry.js
```

### Levante full local

```powershell
.\local-dev.ps1
```

Con backend:

```powershell
.\local-dev.ps1 -WithBackend
```

Servicios backend locales visibles en la guia/scripts:

```text
products: http://localhost:4000
branding: http://localhost:4004
identity: http://localhost:4005
```

Otros servicios se levantan desde su carpeta con:

```bash
npm install
npm run dev
```

## 10. Rutas de despliegue web

En despliegue web bajo un solo dominio:

```text
/argos
/oauth/assets/remoteEntry.js
/otp/assets/remoteEntry.js
/onboarding/assets/remoteEntry.js
/dashboard/assets/remoteEntry.js
/identity/assets/remoteEntry.js
/products/assets/remoteEntry.js
/payment/assets/remoteEntry.js
/transactions/assets/remoteEntry.js
```

## 11. Mensaje para exposicion

Argos es una billetera digital modular. Su valor no esta solo en una pantalla, sino en la separacion de dominios: autenticacion, OTP, onboarding, identidad, productos, pagos, transacciones y branding pueden evolucionar de forma independiente.

La parte de identity/OCR fortalece el alta digital: evita capturas malas, lee el DNI, extrae datos, soporta validacion facial y reduce errores antes de registrar al usuario. Luego, el usuario entra al ecosistema de billetera: dashboard, productos, transferencias, pagos y servicios.

## 12. Repos/carpetas revisadas

```text
ivt-mf-rc-webonboarding
ivt-mf-rc-mobclient
ivt-mf-rc-shrbranding
ivt-mf-rc-oauth
ivt-mf-rc-otp
ivt-mf-rc-onboarding
ivt-mf-rc-identity
ivt-mf-rc-dashboard
ivt-mf-rc-products
ivt-mf-rc-payment
ivt-mf-rc-transactions
ivt-ms-nd-omboarding
ivt-ms-nj-oauth
ivt-ms-nj-otp
ivt-ms-nj-identity
ivt-ms-nj-branding
ivt-ms-nj-products
ivt-ms-nj-servexternal
```
