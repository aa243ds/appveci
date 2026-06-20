# 🛡️ AlertaVec

PWA de seguridad vecinal para reportar y recibir alertas en tiempo real en tu barrio. Proyecto enfocado en los **ODS 11** (Ciudades y Comunidades Sostenibles) y **ODS 16** (Paz, Justicia e Instituciones Sólidas), desarrollado con metodología **Design Thinking**.

## ✨ Funcionalidades

- **Mapa en tiempo real** (Leaflet + OpenStreetMap) con tu ubicación y los reportes de la zona.
- **Reportar incidentes** (robo, sospechoso, vandalismo, acoso, accidente, otro) eligiendo el punto exacto en un mini-mapa con pin arrastrable — útil para marcar la avenida o calle correcta aunque no sea exactamente donde estás parado.
- **Geocodificación inversa automática** (Nominatim) para guardar la dirección real del reporte.
- **Botón de pánico S.O.S** con mantener presionado, cuenta regresiva y seguimiento simulado de atención.
- **Foro vecinal** persistente para publicar y comentar entre vecinos.
- **Sistema de cuentas** (registro/login) guardado en `localStorage`.
- **Panel de Administrador** independiente del usuario normal, con pestañas para supervisar y eliminar reportes, publicaciones del foro, usuarios registrados y alertas S.O.S.
- **PWA instalable** con ícono, splash y funcionamiento offline básico vía Service Worker.

## 🔑 Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@alertavec.com` | `admin123` |
| Vecino | (crea una cuenta nueva desde "Crear cuenta") | — |

El administrador entra directo al **Panel de Administrador** (no ve el mapa ni las pantallas de vecino). Cualquier cuenta creada desde el registro queda como vecino normal.

## 📂 Estructura del proyecto

```
.
├── index.html        # App completa (HTML + CSS + JS embebido)
├── manifest.json     # Manifest de la PWA (nombre, ícono, colores)
├── sw.js             # Service Worker (cache offline)
├── assets/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

Toda la lógica vive en `index.html` (sin build, sin dependencias de npm). Las únicas librerías externas son **Leaflet** (mapa) y **Google Fonts**, cargadas por CDN.

## 🚀 Cómo correrlo localmente

El navegador bloquea geolocalización y Service Workers en `file://`, así que necesitas servirlo por `http://localhost`:

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node
npx serve .
```

Luego abre `http://localhost:8080` en el navegador (idealmente en modo responsive/móvil desde DevTools, o desde tu celular en la misma red).

## 🌐 Cómo publicarlo con GitHub Pages

1. Sube este repositorio a GitHub (ver pasos abajo).
2. Ve a **Settings → Pages**.
3. En "Branch", selecciona `main` y la carpeta `/ (root)`.
4. Guarda y espera 1-2 minutos. Tu app quedará en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.
5. Como GitHub Pages sirve por HTTPS, la geolocalización y el Service Worker funcionarán sin problema (a diferencia de `file://`).

## 📤 Subir este proyecto a tu repositorio

```bash
cd alertavec
git init
git add .
git commit -m "AlertaVec: mapa de reportes, mini-mapa de ubicación, panel admin y PWA"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

Si el repositorio ya existe en GitHub con contenido previo, usa `git pull origin main --allow-unrelated-histories` antes del `push`, o simplemente reemplaza los archivos existentes y haz commit normal.

## ⚠️ Notas

- Todos los datos (usuarios, reportes, foro, S.O.S) se guardan en `localStorage` del navegador — no hay backend ni base de datos real. Si limpias el caché del navegador, se pierden los datos.
- La geocodificación inversa usa la API pública de **Nominatim/OpenStreetMap**; tiene límites de uso razonables para pruebas, no recomendado para tráfico alto en producción sin su propio servidor de geocodificación.
- Proyecto académico/demo — no usar como único canal real de emergencia.
