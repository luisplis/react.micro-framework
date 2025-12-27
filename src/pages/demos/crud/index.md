# 1ª Prueba técnica React y Nodejs

> Te damos la bienvenida a la primera prueba técnica del proceso de selección como Senior Software Typescript Developer con React y Nodejs. La prueba consiste en lo siguiente:

### Ejercicio 1. Añadir y eliminar elementos de una lista (React)

**Requisitos**: Tener instalado Nodejs (v16.x.x o superior). Tener instalado npm.

**Duración máxima**: 40 minutos

**Enunciado**:

```bash
Crear una app en React que implemente un campo de texto y botón para añadir un elemento.

Cuando se hace click en el botón, el texto en el campo de entrada debe agregarse a continuación en una lista de elementos.

Además, cada vez que se hace click en cualquier elemento de la lista, debe eliminarse de la lista.
```

- [x] _Dar importancia a la funcionalidad y usabilidad, más que al diseño visual._
- [x] _El código debe ser enteramente desarrollado en Typescript._

___

### Testing y mejoras:

> Finalmente, se implementa con ViteTest/ReactTestingLibrary un test end-to-end (usuario) para validar el componente y su funcionamiento de cara a refactorizar en un custom hook de React.

```bash
pnpm install vitest happy-dom -D
pnpm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
```

> ```package.json```

```js
  "scripts": {
    // ···
    "test": "vitest",
  }
```

> ```vite.config.ts```

```js
/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})
```

```bash
pnpm run test
```

