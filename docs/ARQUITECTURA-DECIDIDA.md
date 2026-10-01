# ARQUITECTURA DECIDIDA

**Proyecto:** Nueva web de Andrew Estructuras Metálicas (rediseño desde cero)
**Web actual:** https://estructuras-metalicas--andrew55.webnode.es
**Repositorio:** https://github.com/GrupoUpsenSL/WEB-METAL
**Equipo:** Jakub (Frontend) y Mateusz (Backend, contenido y datos)
**Plazo:** 12 días
**Versión:** 2.0 (octubre 2026). Integra la propuesta de backend de Mateusz con la decisión de frontend de Jakub.

---

## 1. Resumen de decisiones

| Área | Decisión | Origen |
|---|---|---|
| Repositorio | **Monorepo** `WEB-METAL` con `frontend/`, `backend/` y `docs/` | El repositorio ya existe y es único |
| Frontend | React puro (`.jsx`), JavaScript, CSS plano, compilado con esbuild y pre-renderizado a HTML estático | Jakub |
| Compilación | GitHub Actions (no se usa Node.js en local) | Jakub |
| Backend | PHP 8.2+ sin framework, PDO, API REST | Mateusz |
| Base de datos | MySQL 8 | Mateusz |
| Correo | PHPMailer por SMTP | Mateusz |
| Contenido público | Servicios y proyectos **estáticos en el frontend**, con los mismos nombres de campo que la API | A validar con Mateusz el día 1 |
| Formulario de contacto | `POST /api/contact` en tiempo real | Ambos |
| Administración | Endpoints protegidos con JWT; el panel visual es fase 2 | Mateusz |

---

## 2. Stack tecnológico definido

### Frontend (Jakub)

| Tecnología | Versión | Uso |
|---|---|---|
| React + ReactDOM | 19.x (`^19.0.0`) | Componentes de función, sin TypeScript |
| react-router-dom | 6.x (`^6.30.0`) | `BrowserRouter` en el navegador, `StaticRouter` al compilar |
| esbuild | 0.25.x (`^0.25.0`) | Compila JSX y empaqueta. Sin Vite ni Babel |
| CSS plano | n/a | Un `styles.css` con variables CSS (tokens); se divide por componente al crecer |
| `scripts/prerender.js` | n/a | Un `index.html` por ruta, `sitemap.xml` y `404.html` |
| `fetch` nativo | n/a | Cliente de la API (`src/api.js`), sin Axios |

### Backend (Mateusz)

| Tecnología | Versión | Uso |
|---|---|---|
| PHP | 8.2+ | API REST sin framework |
| MySQL | 8.0+ | Base de datos relacional |
| PDO | nativo | Consultas preparadas |
| PHPMailer | 6.8+ | Correos del formulario por SMTP |
| JWT | n/a | Autenticación de administración |

### Herramientas y despliegue

| Capa | Tecnología | Notas |
|---|---|---|
| Editor | Visual Studio Code | |
| Control de versiones | Git + GitHub | Ramas por funcionalidad y Pull Requests |
| Compilación | GitHub Actions (Node.js 22) | Construye `frontend/` en cada push a `main` y deja `dist/` como descarga |
| Frontend en producción | Carpeta `dist/` estática | Ver sección 9 |
| Backend en producción | Hosting con PHP 8.2+ y MySQL | Ver sección 9 |

_Las líneas de versión están fijadas en `package.json`. La versión exacta instalada queda registrada en el log de GitHub Actions (`npm ls`)._

---

## 3. Estructura del repositorio

```
WEB-METAL/
├── .github/
│   └── workflows/
│       └── build.yml              # Compila frontend/ y publica dist/ como artefacto
├── docs/
│   └── ARQUITECTURA-DECIDIDA.md
├── frontend/                      # Jakub
│   ├── public/
│   │   ├── robots.txt             # Se copia tal cual a dist/
│   │   └── images/                # WebP: servicios/, portfolio/, logos/ (se crea con la primera imagen)
│   ├── scripts/
│   │   ├── build.js               # esbuild + servidor de desarrollo
│   │   └── prerender.js           # Un HTML por ruta + sitemap + 404
│   ├── src/
│   │   ├── main.jsx               # Entrada del navegador (hydrateRoot)
│   │   ├── entry-server.jsx       # Entrada de la compilación (renderToString)
│   │   ├── App.jsx                # Header + rutas + Footer (404 incluido)
│   │   ├── routes.js              # Ruta, título y descripción SEO por página
│   │   ├── site.js                # SITE (datos del negocio), SERVICES y whatsappLink()
│   │   ├── api.js                 # Cliente de la API: getServices, getProjects, sendContact
│   │   ├── styles.css             # Tokens + estilos base + estilos de componentes
│   │   ├── HomePage.jsx           # Inicio (Hero y servicios dentro)
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── Button.jsx
│   └── package.json
└── backend/                       # Mateusz
    ├── api/
    │   ├── config/                # Database.php, Config.php, Env.php
    │   ├── controllers/           # Service, Project, Contact, Testimonial, Settings, Auth
    │   ├── models/                # BaseModel, Service, Project, ContactMessage, Testimonial, User
    │   ├── routes/routes.php      # Patrón de URL → controlador
    │   ├── middleware/            # CORS, Authentication, Validation
    │   ├── utils/                 # Response, ErrorHandler, Validator, Mailer, Logger, Helper
    │   ├── uploads/               # services/, projects/
    │   ├── logs/
    │   ├── index.php              # Router y punto de entrada
    │   └── .htaccess
    ├── database/
    │   ├── schema.sql
    │   └── seeds.sql
    ├── .env.example               # Plantilla; el .env real no se sube a Git
    ├── composer.json
    └── README.md
```

**Cómo crece `frontend/src/`:**

| Cuando ocurra esto | Se hace esto |
|---|---|
| `HomePage.jsx` pasa de ~100 líneas | Mover `Hero` y `ServicesGrid` a `components/sections/` |
| `styles.css` pasa de ~300 líneas | Separar `tokens.css` y luego un CSS por componente |
| Se añade la segunda página | Crear `src/pages/` y mover `HomePage.jsx` |
| Se crean los formularios | Crear `components/forms/` con `ContactForm.jsx`, `Input.jsx`, `Textarea.jsx` |

---

## 4. Páginas y rutas

| Ruta | Página | Contenido |
|---|---|---|
| `/` | Inicio | Hero, destacados, servicios, proceso, proyectos, testimonios, CTA |
| `/servicios/` | Servicios | Resumen de los 6 servicios |
| `/servicios/<slug>/` | Detalle de servicio | Plantilla única; slugs en español (ver sección 7) |
| `/nuestro-trabajo/` | Portafolio | Proyectos filtrables por servicio |
| `/nuestro-trabajo/<slug>/` | Detalle de proyecto | Opcional, fase posterior |
| `/sobre-nosotros/` | Sobre nosotros | Historia, forma de trabajar, confianza |
| `/contacto/` | Contacto | Formulario, WhatsApp, teléfono, zona de servicio |
| `/gracias/` | Gracias | Confirmación tras enviar el formulario (`noindex`) |
| `/aviso-legal/`, `/politica-privacidad/`, `/politica-cookies/` | Legales | Obligatorias en España |
| `*` | 404 | `noindex` |

Se mantienen las URLs de la web actual (`/servicios`, `/nuestro-trabajo`, `/sobre-nosotros`, `/contacto`).

---

## 5. Lista de componentes (frontend)

| Componente | Archivo | Responsabilidad | Estado |
|---|---|---|---|
| `App` | `src/App.jsx` | Estructura global y rutas; muestra el 404 | Hecho |
| `Header` | `components/Header.jsx` | Logo, navegación y botón "Pedir presupuesto" | Hecho |
| `Footer` | `components/Footer.jsx` | Contacto y datos del negocio desde `SITE` | Hecho |
| `Button` | `components/Button.jsx` | Enlace/botón con variantes | Hecho |
| `Hero` | dentro de `HomePage.jsx` | H1, subtítulo y dos CTA (WhatsApp y servicios) | Hecho |
| `ServicesGrid` | dentro de `HomePage.jsx` | Cuadrícula de los 6 servicios | Hecho |
| `MobileMenu` | `components/` | Menú móvil | Planificado |
| `FeaturesSection` | `components/sections/` | Los 4 puntos de valor | Planificado |
| `ProcessSteps` | `components/sections/` | Los 6 pasos del "Modus operandi" | Planificado |
| `CTASection` | `components/sections/` | Banner de conversión repetible | Planificado |
| `ServiceCard`, `ProjectCard` | `components/cards/` | Tarjetas solo de presentación | Planificado |
| `ProjectGallery` | `components/sections/` | Filtro por servicio y lightbox | Planificado |
| `TestimonialsSection` | `components/sections/` | Reseñas de clientes | Planificado |
| `ContactForm` | `components/forms/` | Campos, validación y envío con `sendContact()` | Planificado |
| `Input`, `Textarea`, `Badge` | `components/ui/` | Elementos de formulario y etiquetas | Planificado |
| `WhatsAppFloat` | `components/` | Botón flotante con mensaje por página | Planificado |
| `PageMeta`, `JsonLd` | `components/seo/` | Título, descripción, canonical y datos estructurados | Planificado |
| `CookieBanner` | `components/` | Consentimiento; activa GTM/GA4 solo tras aceptar | Planificado |

**Regla de separación:** los componentes solo muestran; el contenido vive en `site.js` (o en la API); la lógica de red vive en `api.js`; las páginas solo ensamblan componentes.

Los componentes del backend (modelos, controladores, middleware y utilidades) están descritos en la sección 3 y los gestiona Mateusz.

---

## 6. Contrato de integración con la API

**URL base:** variable `API_URL` de GitHub Actions (_Settings > Secrets and variables > Actions > Variables_). Si no existe, se usa `/api`.

**Formato de respuesta** (todas las rutas):

```json
{ "success": true, "message": "OK", "data": {}, "timestamp": "2026-10-01T10:30:00Z" }
```

**Endpoints que usa la web pública:**

| Método y ruta | Uso | Cuándo |
|---|---|---|
| `POST /api/contact` | Enviar el formulario | Tiempo real (obligatorio) |
| `GET /api/services` | Servicios activos | Fase 2: sustituye a los datos estáticos |
| `GET /api/projects?service_id=&page=&limit=` | Proyectos publicados | Fase 2 |
| `GET /api/testimonials` | Testimonios publicados | Fase 2 |
| `GET /api/settings` | Teléfono, email, horario | Opcional |

Los endpoints de administración (`/api/auth/*`, `POST/PUT/DELETE`) son del panel de administración (fase 2).

**Cuerpo de `POST /api/contact`:**

| Campo | Obligatorio | Validación (navegador y servidor) |
|---|---|---|
| `name` | Sí | 2 a 100 caracteres |
| `email` | Sí | Formato de email válido, máx. 255 |
| `phone` | No en la BD (la web lo pide) | Teléfono español: 9 dígitos que empiezan por 6, 7, 8 o 9, con `+34` opcional; máx. 20 |
| `service_interest` | No | Uno de los slugs de servicio |
| `message` | Sí | 10 a 2000 caracteres |
| `privacy_consent` | Sí | Debe ser `true` (RGPD) |
| `website` | No | Campo trampa (honeypot): si viene relleno, se descarta |

**Errores:** `400` validación (con `data.errors` por campo), `429` demasiados envíos desde la misma IP, `500` error genérico sin detalles internos. Mateusz confirma estos códigos al documentar la API.

---

## 7. Datos compartidos

- **Nombres de campo:** el frontend usa los mismos nombres que la API (`name`, `slug`, `short_description`, `description`, `image_url`, `features`...). Así, pasar de datos estáticos a la API en la fase 2 no requiere traducir campos.
- **Slugs en español**, iguales a las URLs de la web: `cerramientos`, `pergolas`, `garajes`, `techados`, `paneles-solares`, `puertas-portones`. La propuesta inicial del backend usaba slugs en inglés (`enclosures`, `garages`...), que habría que cambiar en el `seeds.sql`.
- **Imágenes:** nombres como `servicio-cerramientos-01.webp`, en `frontend/public/images/servicios/`, `portfolio/` y `logos/`, según el catálogo `ASSETS-ORGANIZADOS` de Mateusz.
- **Contenido real:** los textos finales vienen de `CONTENIDO-MEJORADO.md` (Mateusz).

---

## 8. Decisiones técnicas justificadas

| Decisión | Justificación | Descartado |
|---|---|---|
| **React puro (`.jsx`)** | Componentes reutilizables con una responsabilidad clara; la Task 3 asume React | Next.js |
| **JavaScript, sin TypeScript** | Arranque rápido en 12 días; el riesgo de errores de nombres se reduce con revisión de PR y con campos iguales a los de la API | TypeScript |
| **esbuild** | JSX necesita compilación; una sola herramienta, sin archivo de configuración | Vite y Babel |
| **Compilación en GitHub Actions** | No se puede usar Node.js en local | Compilar en local |
| **Pre-renderizado de cada página** | Una app React sin él envía HTML casi vacío: peor SEO, peor primera carga y vistas previas de WhatsApp genéricas | Aplicación solo de cliente |
| **CSS plano con tokens** | Sin dependencias ni configuración; coherencia por variables y nombres de clase por componente | Tailwind |
| **`fetch` en lugar de Axios** | Una dependencia menos y suficiente para esta API | Axios |
| **Animaciones con CSS** | Sin librerías, respetando `prefers-reduced-motion` | Framer Motion |
| **Contenido público estático en la fase 1** | Permite pre-renderizar las páginas y mejora el SEO; la API de servicios y proyectos se activa en la fase 2 | Cargar servicios y proyectos desde la API en el navegador |
| **PHP puro con PDO** | Configuración rápida y compatible con cualquier hosting compartido; consultas preparadas contra inyección SQL | Laravel, Symfony |
| **API REST** | Simple y suficiente para 6 recursos | GraphQL |
| **MySQL** | Datos relacionales, incluido en casi cualquier hosting PHP | MongoDB |
| **PHPMailer por SMTP** | Estándar y sin depender de un servicio de pago | API de terceros |
| **Respuestas y errores centralizados** | Nunca se exponen errores de la base de datos al navegador | n/a |

**SEO desde el inicio:** título, descripción y canonical por página, Open Graph, `sitemap.xml`, `robots.txt` indexable (la web actual está en `noindex`), `lang="es"`, JSON-LD `LocalBusiness`, imágenes WebP con dimensiones fijas y 301 desde las URLs antiguas si cambia el dominio.

---

## 9. Despliegue

**Frontend:** GitHub Actions compila `frontend/` y deja `dist/` como artefacto descargable; el paso FTP opcional del workflow lo sube solo.

**Backend:** subida por SSH/SFTP; `.env` con las credenciales se crea en el servidor.

**Decisión pendiente: dónde alojar cada parte.**

| Opción | Ventajas | Inconvenientes |
|---|---|---|
| **A. Todo en un hosting con PHP 8.2 y MySQL** (recomendada) | Un solo dominio, API en `/api`, sin CORS, un único lugar donde subir | Hay que confirmar el hosting |
| **B. Frontend en Vercel/Netlify y API en `api.<dominio>`** | CDN y despliegue automático | Requiere CORS (`FRONTEND_URL`), dos dominios y configurar `frontend/` como directorio raíz |

---

## 10. Reparto de tareas y plan de 12 días

| Días | Jakub (Frontend) | Mateusz (Backend y datos) |
|---|---|---|
| 1 | Subir el esqueleto; primera compilación en GitHub Actions | Carpeta `backend/`, base de datos y `schema.sql`; confirmar hosting |
| 2–3 | Tokens CSS, componentes UI, Header y Footer | `Database.php`, `BaseModel.php`, `Response.php`, `ErrorHandler.php` |
| 4–6 | Secciones de la home y plantilla de servicio | Modelos y controladores, `routes.php`, `index.php`, `POST /api/contact` |
| 7–9 | Portafolio, Sobre nosotros, Contacto, `ContactForm` conectado, páginas legales | `Mailer.php`, `Validator.php`, middleware, límite por IP, documentación de la API |
| 10–11 | Rendimiento, accesibilidad, SEO y datos estructurados | Auditoría de seguridad, pruebas con Postman, correos reales |
| 12 | Producción y documentación | Producción, Search Console y traspaso |

**Contenido (Mateusz):** `CONTENIDO-ORIGINAL.md`, `SERVICIOS-INVENTARIO.md`, `ESTRUCTURA-DATOS-BACKEND.md`, `CONTENIDO-MEJORADO.md` y la carpeta `ASSETS-ORGANIZADOS`.

**Flujo de trabajo:** `main` siempre desplegable; ramas cortas (`feat/hero`, `feat/contact-api`); Pull Request revisado por la otra persona y _Squash and merge_. Jakub trabaja en `frontend/` y Mateusz en `backend/`; los archivos compartidos (`docs/`, `.github/`) se cambian de común acuerdo.

---

## 11. Plan de trabajo para la Task 2 (diseño y mockup de secciones principales)

1. Confirmar con el cliente la **zona de servicio**, el **dominio** y el **hosting**.
2. Definir la identidad visual como valores de `styles.css` (colores, tipografía, espaciado).
3. Reunir logo, fotos de proyectos y textos finales (`CONTENIDO-MEJORADO.md`).
4. Diseñar los mockups en este orden: Header + Hero, cuadrícula de servicios, pasos del proceso, banner CTA, Footer y plantilla de página de servicio.
5. Cada sección del mockup se corresponde con un componente de la sección 5, de modo que el diseño pasa directamente a la Task 3.

---
