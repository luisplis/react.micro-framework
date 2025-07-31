
export const menu = 3;
import Markdown from '@slots/Markdown';
import readme from './readme.md?raw';
import "tailwindcss";



export default function cuestionario() {

  return <>
  <h1 className="text-3xl font-bold text-primary">CUESTIONARIO</h1>
  <a className="text-link hover text-linked text-shadow-linked" 
    href="https://github.com/agomezr/react-country-quiz" target="_blank">
  </a>
  <hr/>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myLargeModal">
    Enunciado del ejercicio
  </button>
  <div className="modal fade" id="myLargeModal" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className='text-primary'>Enunciado del ejercicio</h2>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <Markdown file={readme} />
        </div>
        <div className="modal-footer text-center">
          <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</>
}
