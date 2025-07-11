
import { ReactNode } from 'react';
import reactLogo from '@assets/react.svg'
import '@/App.css'

import '/public/bootstrap-min.css'
import './main.css'

import Menu from '@slots/Menu'

function App({ children }: { children?: ReactNode }) {

  return (
  <>
    <header>
      <nav className="collapse d-lg-block sidebar collapse bg-white">
        <div className="position-sticky">
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <div className="list-group list-group-flush mx-3 mt-4">
            <a href="#" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
              <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>LINKS</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
    <main className='container-fluid'>
      <div className="d-flex flex-row">
        <div className="bg-dark">
          <Menu/>
        </div>
        <div className="bg-white">
          {children}
        </div>
      </div>
    </main>
    <footer>
      FOOTER
    </footer>
  </>
  )
}

export default App