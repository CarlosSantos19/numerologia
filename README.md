# Numerología

Aplicación web de numerología pitagórica, en español. Funciona en el navegador, sin instalar nada, y se puede instalar como app (PWA) con modo sin conexión.

## Funciones

- **Mi carta**: Camino de Vida, Expresión, Impulso del Alma, Personalidad y Día de Nacimiento, con una síntesis personal, deudas kármicas, pináculos, desafíos y el cálculo paso a paso.
- **Calendario**: año personal con su ciclo de 9 años, los meses del año y un calendario mensual con la guía de cada día (sugerencias, qué esperar y prevenciones).
- **Compatibilidad**: compara los números de dos personas.
- **Historial**: las cartas se guardan solo en el dispositivo (localStorage).
- Tema claro y oscuro, fondo astrológico animado y diseño adaptado al móvil.

## Cómo usarla

Abre `index.html` en el navegador. Para el modo sin conexión y la instalación como app hace falta servirla por http:

```
node servidor.js
```

y abre http://localhost:8080. En Windows también puedes hacer doble clic en `iniciar.bat`.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `numerology.js` | Cálculos (tabla pitagórica, reducción, ciclos, compatibilidad) |
| `meanings.js` | Textos de interpretación |
| `app.js` | Interfaz |
| `sky.js` | Fondo astrológico |
| `styles.css` | Estilos |
| `sw.js` | Service worker (modo sin conexión); sube la versión de `CACHE` al cambiar archivos |

Solo con fines de entretenimiento.
