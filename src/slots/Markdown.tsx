import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkDirective from 'remark-directive';

// Importa los estilos CSS necesarios
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css'; // <-- Este tema se ve bien con github-markdown-css


interface MarkdownProps {
  file: string; // La ruta al archivo .md (ej: '/doc/fullstack.md')
}

export default function Markdown({ file }: MarkdownProps) {
  const [markdownContent, setMarkdownContent] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Vite tiene una forma especial de importar archivos como texto crudo
    // usando el sufijo `?raw`
    import(/* @vite-ignore */ `${file}?raw`)
      .then((module) => {
        setMarkdownContent(module.default);
      })
      .catch((err) => {
        console.error(`Error al cargar el archivo Markdown: ${file}`, err);
        setError(`No se pudo cargar el archivo Markdown: ${file}`);
      });
  }, [file]);

  if (error) {
    return <div className="text-danger p-3">{error}</div>;
  }

  if (!markdownContent) {
    return <div className="p-3">Cargando contenido...</div>;
  }

  return (
    <div className="markdown-body"> {/* Contenedor para aplicar los estilos de GitHub */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
