# Instalación de bundle Vite con React y TypeScript

> Instalar sin clonar este repositorio, cambia ``WWW`` y ``PYTO`` al gusto:

```console
cd /WWW
pnpm create vite@latest PYTO --template react-ts
```

> [!NOTE]
> [Documentación de Vite](https://es.vite.dev/config/)

## Actualizar e instalar la última versión de React

```console
pnpm install --save react@latest react-dom@latest
```

> Cada vez que instalemos paquetes, tendremos que lanzar el arreglo de dependencias ``npm fund``:

```console
pnpm approve-builds
```

> Cada vez que instalemos paquetes, o clonemos repositorio, es aconsejable actualizar nuestro repositorio de ``node_modules``:

```console
pnpm install --save
```

## Instalar soporte para imágenes en Vite mediante plugins del bundle

```console
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

## Integrar Bootstrap compilado con Soporte SASS

```console
pnpm i bootstrap bootstrap-icons --save
```

> [!IMPORTANT]
> Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida:

+ [/public/bootstrap.scss](/public/bootstrap.scss)

```console
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

```console
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

## Rutas de navegación automáticas

> Routing automático basado en sistema de ficheros que usa Vite usando los paquetes "Genroute" y “React Router Dom”:

```console
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

## Paths absolutos con Alias en Vite para importar recursos

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

+ [/src/App.tsx](/src/App.tsx)

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

## Núcleo de la Aplicación Web

Ahora crearemos las estructuras de páginas y componentes dentro de nuestra aplicación base ``<App/>´´ que además nos servirá de layout o vista principal.

### Estructura de ficheros

+ /
+ **doc**
  ++ *.md -- README DOCUMENTS
+ public
  ++ .htaccess
  ++ [bootstrap.scss](/public/bootstrap.scss) -- COMPILE BOOTSTRAP
  ++ ···
+ src
  ++ [App.tsx](/src/App.tsx)   -- CUSTOM LAYOUT
  ++ [main.tsx](/src/main.tsx) -- CUSTOM APP
  ++ [main.css](/src/main.css) -- CUSTOM STYLES
  ++ assets
  ++ **pages**
    +++ [index.tsx](/src/pages/index.tsx)
    +++ ···
  ++ **slots**
    +++ [Menu.tsx](/src/slots/Menu.tsx)
    +++ ···
+ ···

> Creamos la primera vista o layout de nuestra aplicación y hacemos que pase como hijo todo el renderizado del routing auntomático para que muestre los contenidos de páginas navegables:

+ /src/App.tsx

```javascript

import { ReactNode } from 'react';
import reactLogo from '@assets/react.svg'
import '/public/bootstrap-min.css'
import '@/main.css'

import Menu from '@slots/Menu'

export default function App({ children }: { children?: ReactNode }) {

  return (
  <>
    <header className="sticky-top bg-dark">
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react img-fluid" alt="React logo" />
          </a>
          <Menu order='tool'/>
        </div>
      </div>
    </header>
    <main className='container'>
      <div className="row justify-content-start align-items-start vh-75">
        <div className="col-12 col-sm-3 col-lg-2 h-md-100">
          <Menu style='flex-column align-items-start'/>
        </div>
        <div className="col-12 col-sm-9 col-lg-10 h-100">
          <div className='main'>
            {children}
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-dark">
      <div className='display text-light text-center py-3'>
        <small>React Micro-Framework &reg; 2025</small>
      </div>
    </footer>
  </>
  )
}
```

+ /src/main.tsx

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <Routes />
    </App>
  </StrictMode>,
)
```

> Creamos el primer componente "**slot**" de menú automático que usará **meta.glob** de Vite para crear un menu de enlaces completamente autónomo buscando variables de menú [**order**] en cada página:

+ /src/slots/Menu.tsx

```javascript
export default function Menu({order = 'menu', style = 'flex-row'} : {order: string, style: string}) {

  const fso = Object.entries(import.meta.glob( ['/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}', '!/src/pages/**/(_!(layout)*(/*)?|_app|404)*'], { eager: true } ));

  let links:any[] = [];
  let name, term, link, file, base = '';
  let menu, deep = 0;

  fso.map((item) => {

    if (order in item[1])
    {
      if (item[1][order] > 0)
      {
        file = item[0];
        menu = Number(item[1][order]);
        link = item[0].replace("/src/pages", '').replace(".tsx", '');
        name = ('name' in item[1])? item[1].name :link.substring(1).replace(/\//g, ' ');
        term = ('term' in item[1])? item[1].term :link.substring(1).replace(/\//g, ' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        deep = link.split('/').length-2;
        base = (!deep)? '/': '/'+link.split('/').splice(1, deep).join('/');
        if (link.split('/').pop() === 'index')
        {
          deep--; link = base;
          deep = (deep<0)? 0: deep;
        }
        links.push({'name': name, 'term': term, 'base': base, 'link': link, 'file': file, 'deep': deep, 'menu': menu});
      }
    }
  });

  links = links.sort((a, b) => {

    if (a.deep !== b.deep) {
      return a.deep - b.deep; // Orden ascendente de 'deep'
    }
    return a[order] - b[order]; // Orden ascendente de 'menu'
  });
  let nodes = links.filter(item => item.deep === 0);
  let items = links.filter(item => item.deep === 1);

  return (<>
      <ul className={'nav nav-pills nav-fill '+style}>
        {nodes.map(node => (
          <li key={node.link} className="nav-item">
            <a className="nav-link" href={node.link} title={node.term}>
              <strong>{node.name}</strong>
            </a>
            { (items.filter(item => node.link === item.base).length > 0) &&
            <ul className={'nav nav-pills nav-fill '+style+' tree'}>
              {items.filter(item => node.link === item.base).map(item => (
                <li key={item.link} className="nav-item">
                  <a className="nav-link" href={item.link} title={item.term}>
                    <small>{item.name}</small>
                  </a>
                </li>
              ))}
            </ul>
            }
          </li>
        ))}
      </ul>
  </>);
}
```

> Creamos la primera página de nuestro sistema de ficheros "**page**" de nuestro routing automático, podemos añadir tantas páginas como queramos siguiendo las reglas de "routing generated":

+ /src/pages/index.tsx

```javascript
export const menu = 3;

export default function index() {

  return <pre>
      <h1>Tree Index!</h1>
      <p>···</p>
    </pre>
}
```

> Como se aprecia, el componente menú ``<Menu/>`` filtra por las variables exportadas '**menu**' o '**tool**' para encontrar y listar de forma automática y en jeraquía todos los enlaces navegables de páginas dentro del directorio ''/pages/**`` (routing basado en el sistema de ficheros).
