# React MicroFramework
## @react.micro-framework
Proyecto personal, he creado un microframework similar a Astro en React para generar frontales y paginas web dinámicas.
Además, voy a ir añadiendo retos y ejemplos con React para practicar más y mantenerme lo más actualizado posible con esta tecnología.
- Framework basado en componentes (slots) ligero y flexible, muy fácil de usar y extender.
- Navegación por páginas: enrutamiento por sistemas de archivos (generouted + react-router-dom)
- Vistas y maquetación con Bootstrap 5.x integrado y compilado a medida (bootstrap + sass)
- Soporte para control de estados y validación de formularios (react-hook-form)
- Soporte para el envío de emails automáticos desde la plataforma (express + nodemailer)
- Soporte para páginas web progresivas PWA y aplicaciones de una página SPA (bundle Vite)
- Componentes de interfaz multimedia: imágenes, galerías, vídeos (varios componentes)


## Instalación de bundle Vite con React y TypeScript
> Instalar sin clonar este repositorio, cambia WWW y PYTO al gusto:
```
cd /WWW
pnpm create vite@latest PYTO --template react-ts
```


## Actualizar e instalar la última versión de React
```
pnpm install --save react@latest react-dom@latest
```
> Cada vez que instalemos paquetes, tendremos que lanzar el arreglo de dependencias ``npm fund``:
```
pnpm approve-builds
```
> Cada vez que instalemos paquetes, o clonemos repositorio, es aconsejable actualizar nuestro repositorio de ``node_modules``:
```
pnpm install --save
```


### Instalar soporte para imágenes en Vite mediante plugins del bundle:
```
pnpm i vite-plugin-imagemin -D
```
> Aseguramos que la configuración de Vite utiliza los plugins en su configuración añadiendo:
[/vite.config.ts](/vite.config.ts) 
```javascript
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'

export default defineConfig({
  plugins: [
    viteImagemin()
  ],
})
```
> [!IMPORTANT]
> Soporte en servidor web para estos formatos de imagen en tu directorio raíz:
- [/public/.htaccess](/public/.htaccess)
> Más información en (vite-plugin-imagemin)[https://github.com/vbenjs/vite-plugin-imagemin]

\ backslash 
` backtick 
* asterisk 
_ underscore
{} curly braces 
[] square brackets 
() parentheses 
# hash mark 
+ plus sign 
— minus sign (hyphen) 
. dot 
! exclamation mark


### Integrar Bootstrap compilado con Soporte SASS
```
pnpm i bootstrap bootstrap-icons --save
```
> [!IMPORTANT]
> Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida:
- [/public/bootstrap.scss](/public/bootstrap.scss)
```
@import "bootstrap-icons/font/bootstrap-icons.min.css";

// Customize bootstrap

@import "bootstrap/scss/**";

// Customize styles

:root { } body  { } /* etc */
```
> [!IMPORTANT]
> Instalamos la extensión “Live Sass Compiler” en VSCode y lo configuramos para compilar en local:
> Instala en VSCode [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) y configuraló así: [/.vscode/settings.json](/.vscode/settings.json)
```
{
"liveSassCompile.settings.formats":[
    {
        "format": "compressed", 
        "extensionName": "-min.css", 
     // "savePath": "/public/css", 
    }
],
"liveSassCompile.settings.generateMap": false, 
"liveSassCompile.settings.watchOnLaunch": true
}
```
> Así, cada vez que modifiques **[/public/bootstrap.scss](/public/bootstrap.scss)** se generará **[/public/bootstrap-min.css](/public/bootstrap-min.css)**


### Configuración de alias en Vite (path absoluto para sistema de ficheros)
> [!IMPORTANT]
> Añade las siguientes líneas de configuración y otras que te sean necesarias para tu aplicación:
[/vite.config.ts](/vite.config.ts)
```javascript
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
```
> Así podemos importar o referenciar rutas (paths) usando su alias a modo de ruta absoluta y desde cualquier lugar, por ejemplo:
```javascript
/*
** /App.tsx
*/
import Slot from '@/slots/Slot'

export default function App() {
  return (<>
      <Slot userName="Luisplis"> ALLinONE </Slot>
  </>)
}
```
> [!NOTE]
> Si usas la versión o plantilla de Vite sin TypeScript, la configuración es ligeramente diferente:
```javascript
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src'),...}
  },
})
```


### Rutas de navegación automáticas
> Routing automático basado en sistema de ficheros que usa Vite usando los paquetes "Genroute" y “React Router Dom”:
```
pnpm install @generouted/react-router
pnpm install react-router-dom
```
> Configuración del sistema de rutas basado en directorios y ficheros
[/vite.config.ts](/vite.config.ts)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'

export default defineConfig({ plugins: [react(), generouted()] })
```
[/src/main.tsx](/src/main.tsx)
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Routes } from '@generouted/react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
```
[/src/pages/index.tsx](/src/pages/index.tsx)
```javascript
export default function index() {
  return <h1>HomePage Index ¡routing directory /pages file based default!</h1>
}
```
> [!NOTE]
> Podemos crear rutas dinámicas, recorrerlas para poner enlaces, navegar por jerarquías, cargar dinámicamente modales y crear layouts diferentes, todo en la documentación:
> [https://github.com/oedotme/generouted]

> [!NOTE]
> Truco para obtener todas las rutas sólidas con **import.meta.glob** de Vite:
```javascript
let links = Object.keys(import.meta.glob<Module>(
  ['/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}', '!/src/pages/**/(_!(layout)*(/*)?|_app|404)*'],
  { eager: true },
  )).map((item, i) => { 
    links[i] =  item.replace("/src/pages", '').replace(".tsx", ''); 
  })
);

console.log(links);
```

BLA BLA BLA

