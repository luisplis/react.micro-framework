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
