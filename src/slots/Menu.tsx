
export default function Menu() {

  const fso = Object.entries(import.meta.glob(
  ['/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}', '!/src/pages/**/(_!(layout)*(/*)?|_app|404)*'],
  { eager: true },
  ));

  let links:any[] = [];
  let name, term, link, file, base = '';
  let menu, deep = 0;

  fso.map((item) => {

    if ('menu' in item[1])
    {
      if (item[1].menu > 0)
      {
        file = item[0];
        menu = Number(item[1].menu);
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
    // Primero, intenta ordenar por la propiedad 'deep'
    if (a.deep !== b.deep) {
      return a.deep - b.deep; // Orden ascendente de 'deep'
    }
    // Si 'deep' es igual, entonces ordena por la propiedad 'menu'
    return a.menu - b.menu; // Orden ascendente de 'menu'
  });
  let nodes = links.filter(item => item.deep === 0);
  let items = links.filter(item => item.deep === 1);

  return (
    <nav className="nav navbar-nav text-start">
      <ul className="list-group">
        {nodes.map(node => (
          <li key={node.link} className="list-group-item">
            <a className="link" href={node.link} title={node.term}>
              <strong>{node.name}</strong>
            </a>
            { (items.filter(item => node.link === item.base).length > 0) &&
            <ul className="list-group mt-2">
              {items.filter(item => node.link === item.base).map(item => (
                <li key={item.link} className="list-group-item mx-n2 mb-n1">
                  <a className="link" href={item.link} title={item.term}>
                    <small>{item.name}</small>
                  </a>
                </li>
              ))}
            </ul>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}
