# React MicroFramework
## @react.micro-framework
Proyecto personal, he creado un microframework similar a Astro en React para generar frontales y paginas web dinámicas.
Además, voy a ir añadiendo retos y ejemplos con React para practicar más y mantenerme lo más actualizado posible con esta tecnología.

> [!NOTE]
> - Framework basado en componentes (slots) ligero y flexible, muy fácil de usar y extender.
> - Navegación por páginas: enrutamiento por sistemas de archivos (generouted + react-router-dom)
> - Vistas y maquetación con Bootstrap 5.x integrado y compilado a medida (bootstrap + sass)
> - Soporte para control de estados y validación de formularios (react-hook-form)
> - Soporte para el envío de emails automáticos desde la plataforma (express + nodemailer)
> - Soporte para páginas web progresivas PWA y aplicaciones de una página SPA (bundle Vite)
> - Componentes de interfaz multimedia: imágenes, galerías, vídeos (varios componentes)

### Instalación de bundle Vite con React y TypeScript
> Instalar sin clonar este repositorio:
```
cd /PROJECTS
pnpm create vite@latest
```
> Project Name: "react.micro-framework" 
> Select Framework: "React" 
> Select Variant: TypeScript + SWC
```
cd /PROJECTS/react.micro-framework
pnpm install
pnpm install -g sass
pnpm i bootstrap bootstrap-icons --save
```
> Aprobamos la mezcla de paquetes (npm fund)
```
pnpm approve-builds -g
```

### Actualizar e instalar la última versión de React
```
pnpm install --save react@latest react-dom@latest
```

### Integrar Bootstrap compilado con Soporte SASS
> [!IMPORTANT]
> Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida:
[/public/bootstrap.scss](/public/bootstrap.scss)
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
> [/vite.config.ts](/vite.config.ts)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    slots: [{ find: '@slots', replacement: path.resolve(__dirname, 'slots') }],
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
```
alias: { '@': path.resolve(__dirname, './src'),...}
```

