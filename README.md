# E.E.S.T N.º 1 «Luciano Reyes» — Sitio de auditoría y transparencia

Web estática de concientización sobre el estado de higiene y seguridad de la escuela.
Redactada por estudiantes (7.º 5.º Programación) con el Departamento de Salud e Higiene.

## Cómo correrla localmente

Es un sitio 100 % estático. Basta con abrir `index.html` en el navegador, o servirlo:

```bash
# con Python
python -m http.server 8000

# o con Node
npx serve .
```

Luego abrir `http://localhost:8000`.

## Qué hay adentro

| Sección | Contenido |
|---|---|
| Hero + marquee | El planteo y las cifras más fuertes |
| 01 La escuela | Contexto institucional y las 4 especialidades |
| 02 La auditoría | Los 19 puntos, en 6 categorías, con norma y solución |
| 03 Cifras | Contadores animados |
| 04 Futuro | Pasantías (Tenaris, Axion, UTN) y Scratchaton |
| 05 Talleres | EPP y especialidades |
| 06 Voces | «Lo que dicen los chicos» |
| 07 Propuestas | Ejes, agenda y formulario |
| 08 Marco | Contexto legal y postura (Provincia, no Nación) |
| 09 Sumarse | Formas concretas de ayudar |

## Documentación

- **`Memory.md`** — memoria del sistema. **Leer primero.** Todo cambio se registra acá.
- **`contenido/lo-que-dicen-los-chicos.md`** — fuente de las voces publicadas.
- **`propuestas/`** — agenda de propuestas con formato YAML.

## Checklist antes de difundir

1. [ ] Reemplazar `contacto@example.edu.ar` por el correo oficial (en `index.html` y `main.js`).
2. [ ] Revisión del Departamento de Salud e Higiene del contenido.
3. [ ] (Opcional) Fotos reales del relevamiento en `assets/img/`.
4. [ ] Verificar datos: cantidades, especialidades, convenios y certificaciones.
5. [ ] Registrar la versión final en `Memory.md`.