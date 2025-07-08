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

### Instalación desde cero 
Instalar sin clonar este repositorio:
```
cd /PROJECTS
pnpm create vite@latest
// Project Name: "react.micro-framework" 
// Select Framework: "React" 
// Select Variant: TypeScript + SWC
cd /PROJECTS/react.micro-framework
pnpm install
pnpm install -g sass
pnpm i bootstrap bootstrap-icons --save
// Now you have sass with bootstrap and bs-icons
pnpm approve-builds -g
// It is required to merge packages
```

### Actualizar o instalar la última versión de React
```
pnpm install --save react@latest react-dom@latest
```

### Bootstrap compilado con Soporte SASS en VSCode
> [!IMPORTANT]
> Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida:
[/src/styles.scss](/src/styles.scss)
```
@import "bootstrap-icons/font/bootstrap-icons.min.css";

$primary:   #0077FF; 
$secondary: #FF005A;

// Customize bootstrap

@import "bootstrap/scss/**";

// Customize styles

:root {
    // BS 4 compatibility (_root.scss)
    @each $bp, $value in $grid-breakpoints {
      --breakpoint-#{$bp}: #{$value};
    }
}
body {
    font-size: 13pt;
    font-display: swap;
    overflow-x: hidden;
}
```
> [!IMPORTANT]
> Instalar extensión “Live Sass Compiler” en VSCode y configurarla para compilar en local:
[/.vscode/settings.json](/.vscode/settings.json)
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

