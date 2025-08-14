# Instalación de bundle Vite con React y TypeScript

> Instalar sin clonar este repositorio, cambia ``WWW`` y ``PYTO`` al gusto:

```console
cd /WWW
pnpm create vite@latest PYTO --template react-ts
```

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

> Soporte en servidor web para estos formatos de imagen en tu directorio raíz:

+ [/public/.htaccess](/public/.htaccess)

> Más información en (vite-plugin-imagemin)[https://github.com/vbenjs/vite-plugin-imagemin]

## Integrar Bootstrap compilado con Soporte SASS

```console
pnpm i bootstrap bootstrap-icons --save
```

Descargamos e importamos los estilos de Bootstrap compilado y optimizado a medida en assets porque si lo hacemos en public tendríamos problemas al cargar las rutas en el compilado de vite (las rutas absolutas no están disponibles fuera de App):

+ [/assets/bootstrap.scss](/assets/bootstrap.scss)

```css
@import "bootstrap-icons/font/bootstrap-icons.min.css";

// Customize bootstrap

@import "bootstrap/scss/**";

// Customize styles

:root { } body  { } /* etc */
```

Instalamos la extensión “Live Sass Compiler” en VSCode y lo configuramos para compilar en local. Instala en VSCode [Live Sass Compiler - Glenn Marks](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) y configuraló así:

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

> Así, cada vez que modifiques **[/public/bootstrap.scss](/public/bootstrap.scss)** se generará **[/public/bootstrap-min.css](/public/bootstrap-min.css)** y finalmente, sólo tenemos que cargarlo en nuestra aplicación:

+ [/src/App.tsx](/src/App.tsx)

```javascript
import 'bootstrap/dist/js/bootstrap.min.js';
```

+ [/src/main.css](/src/main.css)

```css
@import '@assets/bootstrap-min.css';
```

> Ahora ya tenemos inicializado Bootstrap en todo nuestro componente ``App´´, es decir, en toda la aplicación.

## Integrar Tailwind CSS con (alternativa a bootstrap)

Antes de nada, denbemos instalar sus librerías y dependencias en la aplicación weben inicializar su carga como plugin de Vite.

```console
pnpm i tailwindcss @tailwindcss/vite --save
```

+ [/.vscode/settings.json](/.vscode/settings.json)

```console
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ]
})
```

Después debemos cargar TaildWindCSS en la CSS de nuestra aplicación donde queramos que funcione, es perfectamente compatible con Bootstrap y otros estilos de CSS personalizados, aunque debemos evitar colisiones de clases.

+ [/src/main.css](/src/main.css)

```css
/*
** TailWindCSS && Custom Theme
*/
@import "tailwindcss";

@theme {
  --color-primary: #E65895;
  --color-secondary: #BC6BE8;
  --color-link: #1199FF;
  --color-linked: #1199FF;
  --color-dark: #393F6E;
  --color-light: #E2E4F3;
  --color-gray: #8B8EAB;
}
```

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

> Podemos crear rutas dinámicas, recorrerlas para poner enlaces, navegar por jerarquías, cargar dinámicamente modales y crear layouts diferentes, todo en la documentación [https://github.com/oedotme/generouted]

## Paths absolutos con Alias en Vite para importar recursos

Para poder usar en tu aplicación (vite+react) alias de paths absolutos para acortarlos, es imprescindible añadir las siguientes líneas de configuración y otras que te sean necesarias para tu aplicación vite:

+ [/vite.config.ts](/vite.config.ts)

```javascript
import * as path from 'path'

export default defineConfig({
  alias: [
      { find: '@slots', replacement: path.resolve(__dirname, 'src/slots') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
})
```

Sin embargo, tu entorno de desarrollo (vscode) pueden no encontrar ni enlazar estras rutas correctamente si no lo indicamos en la configuración del compilador:

+ [/tsconfig.json](/tsconfig.json)

```console
{
  "compilerOptions": {
     "paths": {
      "@assets/*": ["./src/assets/*"],
      "@slots/*": ["./src/slots/*"],
      "@pages/*": ["./src/pages/*"],
    }
  }
}
```

Además, es posible que typescript no valide el tipo de módulo que cargamos con los alias creados, en este caso o error de VSCode, debemos declararlo en la configuración del entorno.

> Cannot find module '@slots/Markdown' or **its corresponding type declarations**.

+ [/src/vite-env.d.ts](/src/vite-env.d.ts)

```javascript
declare module '@slots/*';
declare module '@pages/*';
declare module '@assets/*';
```

Así podemos importar o referenciar rutas (paths) usando su alias a modo de ruta absoluta y desde cualquier lugar, por ejemplo, nuestros componentes personalizados o piezas **slots**:

```javascript
import reactLogo from '@assets/react.svg';
```

> Si usas la versión o plantilla de Vite sin TypeScript, la configuración es ligeramente diferente:

```javascript
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src'),...}
  },
})
```

## Núcleo de la Aplicación Web

Ahora crearemos las estructuras de páginas y componentes dentro de nuestra aplicación base ``<App/>`` que además nos servirá de layout o vista principal.

### Estructura de ficheros y navegación

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
  ++ **pages** -- Navegación Web
    +++ [index.tsx](/src/pages/index.tsx)
    +++ ···
  ++ **slots** -- Componentes Esenciales
    +++ [Menu.tsx](/src/slots/Menu.tsx)
    +++ ···
+ ···

> Creamos la primera vista o layout de nuestra aplicación y hacemos que pase como hijo todo el renderizado del routing auntomático para que muestre los contenidos de páginas navegables:

+ /src/App.tsx

```javascript
import { ReactNode } from 'react';
import reactLogo from '@assets/react.svg'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
import '/public/bootstrap-min.css'
import './main.css'

import Menu from '@slots/Menu'

export default function App({ children }: { children?: ReactNode }) {

  return (
  <>
    <header className="sticky-top bg-dark">
      <div className='container py-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react img-fluid" alt="React logo" />
          </a>
          <Menu order='tool'/>
        </div>
      </div>
    </header>
    <main className='container'>
      <div className="row justify-content-start align-items-start">
        <div className="col-12 col-sm-3 col-lg-2 py-2">
          <Menu style='flex-column align-items-start'/>
        </div>
        <div className="col-12 col-sm-9 col-lg-10">
          <div className='main shadow-lg'>
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
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <Routes />
    </App>
  </StrictMode>
)
```

> Podemos añadir estilos personalizados a la vez que cargamos una versión 100% compilada de Bootstrap cargando en nuestra aplicación o layout la siguiente hoja de estilos:

```css
.main {
  margin: 30px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}
@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.flex-row.tree .nav-item { text-align: center; }
.flex-column.tree .nav-item { text-align: left; width: 100%; }
.flex-row.tree .nav-item { text-align: center; }

.flex-row.tree .nav-link { color: var(--bs-light); }
.flex-row.tree .nav-link:hover { color: var(--bs-secondary); }

.flex-row.subtree .nav-item { line-height: 1; }
.flex-column.subtree .nav-item { line-height: 1; padding: 0; }
```

> Creamos el primer componente "**slot**" de menú automático que usará **meta.glob** de Vite para crear componentes esenciales como un menu de enlaces completamente autónomo buscando variables de menú [**order**] en 3 niveles de navegación:

+ /src/slots/Menu.tsx

```javascript
import { replace } from "react-router-dom";

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
        const index = (link.split('/').pop() === 'index');
        deep = Number(index? link.split('/').length-2: link.split('/').length-1);
        link = ('/'+link.replace('/index', '')).replace('//', '/');
        base = '/'+link.split('/').splice(1, deep-1).join('/');

        name = ('name' in item[1])? item[1].name :(link.split('/').pop().replace(/\//g, ' ').replace('-', ' ')).trimEnd();
        term = ('term' in item[1])? item[1].term :(link.split('/').pop().replace(/\//g, ' ').replace('-', ' ')).trimEnd();
      }

      name = name.charAt(0).toUpperCase() + name.slice(1);

      links.push({'name': name, 'term': term, 'base': base, 'link': link, 'file': file, 'deep': deep, 'menu': menu});
    }
  });

  links = links.sort((a, b) => {

    if (a.deep !== b.deep) {
      return a.deep - b.deep; // Orden ascendente de 'deep'
    }
    return a[order] - b[order]; // Orden ascendente de 'menu'
  });

  const menus = links.filter(link => link.deep === 1);
  const nodes = links.filter(link => link.deep === 2);
  const items = links.filter(link => link.deep === 3);

  return (<>
      <ul className={'nav nav-pills nav-fill '+style+' tree'}>
        {menus.map(menu => (
          <li key={menu.link} className="nav-item">
            <a className="nav-link" href={menu.link} title={menu.term}>
              <strong>{menu.name}</strong>
            </a>
            { (nodes.filter(node => menu.link === node.base).length > 0) &&
            <ul className={'nav nav-pills nav-fill '+style+' subtree'}>
              {nodes.filter(node => menu.link === node.base).map(node => (
                <li key={node.link} className="nav-item">
                  <a className="nav-link" href={node.link} title={node.term}>
                    <small>{node.name}</small>
                  </a>
                  { (items.filter(item => node.link === item.base).length > 0) &&
                  <ul className={'nav nav-pills nav-fill '+style+' subtree'}>
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
            }
          </li>
        ))}
      </ul>
  </>);
}
```

> Como se aprecia, el componente menú ``<Menu/>`` filtra por las variables exportadas '**menu**' o '**tool**' para encontrar y listar de forma automática y en jeraquía todos los enlaces navegables de páginas dentro del directorio ''/pages/**`` (routing basado en el sistema de ficheros).

## Soporte para Markdown Extendido (github)

Para renderizar correctamente la sintaxis de los README.md de GitHub en un proyecto de Vite con React, la mejor y más común solución es usar la librería react-markdown. Hay que instalr ``react-markdown`` para el parsing y renderizado, ``remark-gfm`` para las extensiones de GitHub Flavored Markdown (tablas, listas de tareas, tachado, etc.), y ``rehype-highlight`` (o una alternativa como react-syntax-highlighter) para el resaltado de sintaxis en los bloques de código y para que se vean igual que en Github, es necesario instalar ``remark-directive`` para los bloques especiales y cargar todos los estilos ``github-markdown-css`` de GitHub.

```console
pnpm i react-markdown remark-gfm rehype-highlight remark-directive github-markdown-css highlight.js
```

Ahora creamos un componente en nuestro framework para poder cargar ficheros ``.md`` de forma sencilla:

+ /src/slots/Markdown.tsx

```javascript
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkDirective from 'remark-directive';

// Importa los estilos CSS necesarios
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css'; // <-- Este tema se ve bien con github-markdown-css

export default function Markdown({ file }: { file: string }) {
  const [markdown, setMarkdown] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Vite tiene una forma especial de importar archivos como texto crudo
    // usando el sufijo `?raw`
    if (file.endsWith('.md') || file.endsWith('.mdx'))
      import(/* @vite-ignore */ `${file}?raw`)
        .then((module) => {
          setMarkdown(module.default);
        })
        .catch((err) => {
          console.error(`Error al cargar el archivo Markdown: ${file}`, err);
          setError(`No se pudo cargar el archivo Markdown: ${file}`);
        });
    else
        setMarkdown(file);
  }, [file]);

  if (error) {
    return <div className="text-danger p-3">{error}</div>;
  }

  if (!markdown) {
    return <div className="p-3">Cargando contenido...</div>;
  }

  return (
    <div className="markdown-body"> {/* Contenedor para aplicar los estilos de GitHub */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
```

> Para usar nuestro componente en cualquier página o componente, tan sólo tenemos que importarlo e invocarlo:

```javascript
import MarkDown from '@slots/Markdown';

export default function example() {

  return <>
    <Markdown file="/doc/fullstack.md" />{ /* path absoluto */}
  </>
}
```

o bién, si prefieres:

```javascript
import MarkDown from '@slots/Markdown';

import readme from './readme.md?raw'; // path local

export default function example() {

  return <>
    <Markdown file={readme} />
  </>
}
```

## React Query para manejar APIs

React Query, o TanStack Query, es una librería que proporciona a React JS la capacidad de gestión de estado para cualquier tipo de datos asíncronos como la obtención de datos, el almacenamiento en caché, la sincronización y la actualización del estado del servidor, todo con el hook **useQuery**.

```code
pnpm i --save react-query
```

> Ejemplo de ´´useQuery``:

```javascript
export default function SimpleDataFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mySimpleData'], // Clave única para esta petición
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!res.ok) throw new Error('Falló la carga.');
      return res.json();
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Dato obtenido:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
