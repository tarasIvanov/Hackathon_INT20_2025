import { FC } from 'react';
import { NavLink } from 'react-router';
import { scrollToTop } from '../../utils/scrolltoTop';
import { IoChevronUpCircleOutline } from "react-icons/io5";

import style from './Footer.module.scss';

export const Footer: FC = () => {
  const navigation = [
    {
      href: '',
      name: 'Github',
    },
    {
      href: '',
      name: 'Contacts',
    },
    {
      href: '',
      name: 'Rules',
    },
  ];

  return (
    <footer className={style.footer}>
      <a
        href="#"
        className={style.logo__link}>
        <h1>Logo</h1>
      </a>
      <nav className={style.nav}>
        <ul className={style.nav__list}>
          {navigation.map(({ href, name }) => (
            <li
              key={name}
              className={style.nav__item}>
              <NavLink
                to={href}
                target="_blank"
                className={style.nav__link}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={style.backToTop}
        onClick={scrollToTop}>
        <p className={style.backToTop__text}>Back to top</p>
        <div className={style.backToTop__button}>
          <IoChevronUpCircleOutline />
        </div>
      </button>
    </footer>
  );
};
