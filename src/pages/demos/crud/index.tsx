import Crud from "./Crud";
import Markdown from '@slots/Markdown';
import readme from "./index.md?raw";

export const menu = 1;

export default function index() {
  return <div className="main shadow-xl py-3">
    <h2>Lista de elementos CRUD</h2>
    <div className='text-center py-3'>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myLargeModal">
        Abrir Enunciado
      </button>
    </div>
    <div className="p-3 border-2 border-rounded border-secondary">
      <Crud />
    </div>
    <hr />
    <div className="modal fade" id="myLargeModal" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className='text-primary'>Enunciado del ejercicio</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body bg-white">
            <Markdown file={readme} />
          </div>
          <div className="modal-footer text-center">
            <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
