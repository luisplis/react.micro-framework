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
    <div className="tree">
      <ul className={'nav nav-pills nav-fill '+style+' menus'}>
        {menus.map(menu => (
          <li key={menu.link} className="nav-item">
            <a className="nav-link" href={menu.link} title={menu.term}>
              <strong>{menu.name}</strong>
            </a>
            { (nodes.filter(node => menu.link === node.base).length > 0) &&
            <ul className={'nav nav-pills nav-fill '+style+' nodes'}>
              {nodes.filter(node => menu.link === node.base).map(node => (
                <li key={node.link} className="nav-item">
                  <a className="nav-link" href={node.link} title={node.term}>
                    <span>{node.name}</span>
                  </a>
                  { (items.filter(item => node.link === item.base).length > 0) &&
                  <ul className={'nav nav-pills nav-fill '+style+' items'}>
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
    </div>
  </>);
}
