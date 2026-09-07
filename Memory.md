# Memory.md — Memoria del sistema

> Este archivo es la **memoria viva** de la web de la E.E.S.T N.º 1 «Luciano Reyes».
> Cada cambio que se haga en el sitio debe quedar registrado acá, con fecha y motivo.
> Si un archivo cambia y no está en este registro, **el cambio no existe**.

---

## 1. Propósito del sitio

Web estática de **concientización, transparencia y gestión comunitaria** sobre el estado de
higiene y seguridad del edificio escolar. Redactada por estudiantes (7.º 5.º Programación) con
el asesoramiento del Departamento de Salud e Higiene.

**Objetivos:**
1. Hacer visible, con datos y normas, el deterioro de la escuela.
2. Explicar cada problema en lenguaje simple (que un estudiante de primer año lo entienda).
3. Proponer soluciones concretas y hacer seguimiento público de su avance.
4. Convocar a la comunidad, a los privados y a las empresas del convenio (Tenaris, Axion, UTN)
   a complementar la inversión pública, sin reemplazarla.
5. Defender la escuela: **no se ataca al personal ni a la institución**, se documenta el estado
   y se exige el cumplimiento de la obligación provincial de financiar la infraestructura.

**Tono editorial (no negociable):**
- Profesional y humano a la vez.
- Explicativo: normas ISO / leyes explicadas en simple.
- Con urgencia, pero sin sensacionalismo.
- Liberal en la invitación a la inversión privada, **0 partidario** en lo político:
  se sostiene que la responsabilidad del edificio es de la **Provincia** (diseño federal,
  no opinión partidaria) y que el privado **complementa**.
- Legalmente prudente: sin nombres propios de autoridades, sin acusaciones individuales.

---

## 2. Estructura de archivos

```
/
├── index.html                  → Página principal (todo el contenido expositivo)
├── README.md                   → Guía de actualización rápida
├── Memory.md                   → ESTE ARCHIVO. Memoria del sistema.
├── assets/
│   ├── css/main.css            → Design system completo
│   ├── js/main.js              → Interacciones (revelado, contadores, acordeones, filtros, formulario)
│   └── img/                    → Ilustraciones SVG
│       └── hero.svg            → Ilustración principal del hero
├── contenido/
│   └── lo-que-dicen-los-chicos.md  → Fuente de las voces publicadas en la sección 06
└── propuestas/
    ├── README.md               → Índice de propuestas y formato
    └── P-001..P-006.md         → Una propuesta por archivo (formato YAML + cuerpo)
```

---

## 3. Cómo actualizar cada cosa

### 3.1 Texto de la página
Editar `index.html`. Las secciones están numeradas (`01` a `09`) y con `id` propio.
Cada problema de la auditoría vive en un `<article class="issue">` dentro de `#auditoria`.
Tras tocar cualquier texto → agregar entrada en el **Registro de cambios** (sección 5).

### 3.2 Voces («Lo que dicen los chicos»)
1. Agregar el testimonio en `contenido/lo-que-dicen-los-chicos.md`.
2. Copiar el `<blockquote>` correspondiente en `#voces` del `index.html`.
3. Registrar el cambio.

### 3.3 Propuestas
1. Crear `propuestas/P-NNN.md` con el formato del `README.md` de propuestas.
2. Actualizar la tabla de `#propuestas` en `index.html` (ID, título, eje, prioridad, estado).
3. Cambiar el `estado:` del front matter cuando avance (propuesta → en evaluación → en ejecución → resuelta).
4. Registrar el cambio.

### 3.4 Formulario
El formulario actualmente arma un `mailto:` al correo `contacto@example.edu.ar`.
**Antes de publicar, reemplazar ese correo** por el oficial de la escuela o la cooperadora
(buscar `example.edu.ar` en `index.html` y `main.js`).

### 3.5 Imágenes
Las imágenes son SVG editables en `assets/img/`. Para fotos reales: agregar el archivo en
`assets/img/` y reemplazar la referencia en `index.html`. Siempre con `alt` descriptivo.

---

## 4. Normas de referencia (glosario simple)

| Referencia | Qué es, en simple |
|---|---|
| Ley 19.587 | Ley nacional de higiene y seguridad en el trabajo. |
| Decreto 351/79 | Reglamenta la ley: cómo se hacen las medidas (pasillos, tableros, extintores, señalización). |
| Res. SRT 299/11 | Regula extintores (matafuegos): cantidad, ubicación, carga y recarga. |
| ISO 3864 / ISO 7010 | Señalización universal: carteles que todos entienden sin leer. |
| ISO 45001 | Sistema de gestión de salud y seguridad: prevenir antes que lamentar. |
| EPP | Elementos de Protección Personal: antiparras, guantes, protectores auditivos, calzado, ropa. |

Siempre que se cite una norma en la página, mantener el tono: **norma → por qué importa → cómo se arregla**.

---

## 5. Registro de cambios

### 2026-09-07 — v0.2 · Auditoría y corrección responsive (móvil)
- **Auditoría realizada:** el CSS tenía una única media query (900px) y las grillas usaban
  `minmax` fijo que desbordaba en pantallas <340px.
- **Correcciones aplicadas:**
  - Todas las grillas pasaron a `minmax(min(Npx,100%),1fr)` → cero overflow horizontal en móviles angostos.
  - Título del hero: los `<br>` forzados se reemplazaron por `<span>` que fluyen en móvil (≤640px).
  - Jerarquía de breakpoints: 1100px / 900px / 720px / 640px / 400px + `prefers-reduced-motion` + `print`.
  - Tabla de propuestas → se convierte en tarjetas apiladas en ≤720px (con labels por fila vía CSS).
  - Inputs del formulario con `font-size:1rem` en móvil → evita el zoom automático de iOS.
  - `.issue__row` con `min-width:0` y wrap → el título ya no empuja el toggle fuera de pantalla.
  - Menú móvil: botón de cerrar (×), bloqueo de scroll del body al abrir, cierre con tecla Escape.
  - Marquee: el `gap` se reemplazó por `margin-right` por item → loop `translateX(-50%)` sin salto.
  - Paddings reducidos en móvil (normas, formulario, voces__cta, cifras__line, marco, ayudar).
  - Botones del hero/voces/ayudar al 100% de ancho en móvil (targets táctiles grandes).
  - `min-height` del hero con fallback `100vh` + mejora progresiva `100svh`.
- Verificado: JS (`node --check`), balance de llaves CSS (340/340), etiquetas HTML balanceadas.

### 2026-09-07 — v0.1 · Versión inicial (exposición)
- Creación del sitio completo: `index.html`, `assets/css/main.css`, `assets/js/main.js`.
- Ilustración principal `assets/img/hero.svg`.
- Contenido de la auditoría: 19 puntos en 6 categorías (incendio, eléctrica, edificio, higiene, talleres, organización).
- Secciones: hero, marquee, escuela, auditoría, cifras, futuro, talleres, voces, propuestas, marco, sumarse, footer.
- Sistema de memoria: `Memory.md`, `contenido/lo-que-dicen-los-chicos.md`, `propuestas/` (P-001 a P-006).
- Formulario de propuestas con envío por correo (placeholder `contacto@example.edu.ar`).
- Pendiente antes de difundir: correo oficial real, fotos reales del relevamiento si se desea, y revisión
  del Departamento de Salud e Higiene.