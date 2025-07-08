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
> [!NOTE]
> (Documentación de Vite)[https://es.vite.dev/config/]

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
+ [/vite.config.ts](/vite.config.ts) 
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
+ [/public/.htaccess](/public/.htaccess)
> Más información en (vite-plugin-imagemin)[https://github.com/vbenjs/vite-plugin-imagemin]


### Integrar Bootstrap compilado con Soporte SASS
```
pnpm i bootstrap bootstrap-icons --save
```
> [!IMPORTANT]
> Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida:
+ [/public/bootstrap.scss](/public/bootstrap.scss)
```
@import "bootstrap-icons/font/bootstrap-icons.min.css";

// Customize bootstrap

@import "bootstrap/scss/**";

// Customize styles

:root { } body  { } /* etc */
```
> [!IMPORTANT]
> Instalamos la extensión “Live Sass Compiler” en VSCode y lo configuramos para compilar en local:
> Instala en VSCode [Live Sass Compiler - Glenn Marks](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) y configuraló así:
+ [/.vscode/settings.json](/.vscode/settings.json)
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


### Rutas de navegación automáticas
> Routing automático basado en sistema de ficheros que usa Vite usando los paquetes "Genroute" y “React Router Dom”:
```
pnpm i @generouted/react-router react-router-dom
```
> Configuración del sistema de rutas basado en directorios y ficheros
+ [/vite.config.ts](/vite.config.ts)
```javascript
import generouted from '@generouted/react-router/plugin'

export default defineConfig({ plugins: [react(), generouted()] })
```
> Añadimos el enrutador en la aplicación principal (o sustituimos)
+ [/src/main.tsx](/src/main.tsx)
```javascript
import { Routes } from '@generouted/react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
```
> Creamos nuestra primera úrl basada en el sistema de ficheros ´´/pages/**´´
+ [/src/pages/index.tsx](/src/pages/index.tsx)
```javascript
export default function index() {
  return <pre>
      <code>HomePage Index ¡routing directory /pages file based default!</code>
    </pre>
}
```
> [!NOTE]
> Podemos crear rutas dinámicas, recorrerlas para poner enlaces, navegar por jerarquías, cargar dinámicamente modales y crear layouts diferentes, todo en la documentación:
> [https://github.com/oedotme/generouted]


### Paths absolutos con Alias en Vite para importar recursos
> [!IMPORTANT]
> Añade las siguientes líneas de configuración y otras que te sean necesarias para tu aplicación:
+ [/vite.config.ts](/vite.config.ts)
```javascript
import * as path from 'path'

export default defineConfig({
  alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
    ],
})
```
> Así podemos importar o referenciar rutas (paths) usando su alias a modo de ruta absoluta y desde cualquier lugar, por ejemplo:
+ (/src/App.tsx)[/src/App.tsx]
```javascript
import { useState } from 'react'
import reactLogo from '@assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'

export default function App() {
  return (<>Hola Mundo</>)
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

BLA BLA BLA

