import React from 'react';
import { Link } from 'react-router-dom';

interface TypeMenuItem {
  name: string;
  path: string;
}

const MENU_LIST: TypeMenuItem[] = [
  { name: 'Hello', path: '/hello' },
  { name: 'Style', path: '/style' },
  { name: 'Request', path: '/request' },
  { name: 'Redux saga', path: '/saga' },
];

const Menu = () => {
  const [menuList] = React.useState<TypeMenuItem[]>(MENU_LIST);

  return (
    <ul>
      {menuList.map((i: TypeMenuItem) => (
        <li key={i.name}>
          <Link to={i.path}>{i.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
