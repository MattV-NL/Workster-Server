import './titleNav.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../constants';
import img1 from '../../images/logo.png';
import Compare from '../Compare/Compare';
import LoginStatus from './LoginStatus';
import { Menu, Dropdown } from 'antd';
import { useContext } from 'react';
import { UserSettingsContext } from '../../contexts/UserSettingsContext';
import { MenuUnfoldOutlined } from '@ant-design/icons';

const logo = 'logo';

const items = [
  {
    label: (
      <Link to={paths.HOME} className='navbar-item'>
        Home
      </Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link to={paths.WEATHER} className='navbar-item'>
        Weather Page
      </Link>
    ),
    key: 'weather',
  },
  {
    label: (
      <Link to={paths.WORK} className='navbar-item'>
        Work Page
      </Link>
    ),
    key: 'work',
  },
];

const TitleNav = () => {
  const { darkMode } = useContext(UserSettingsContext);

  return (
    <div className='header'>
      <div className='title-container'>
        <div className='title'>Work / Weather Analyzer</div>
        <Link to={paths.HOME} className='logo-container'>
          <img className={logo} src={img1} alt='logo' />
        </Link>
      </div>
      <div className='navbar'>
        <Dropdown overlay={<Menu items={items} className='navbar-item' />}>
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <MenuUnfoldOutlined
              className={darkMode ? 'dark-menu-icon' : 'light-menu-icon'}
            />
          </a>
        </Dropdown>
        <Compare className='navbar-item' />
        <LoginStatus
          className={darkMode ? 'dark-navbar-item' : 'light-navbar-item'}
        />
      </div>
    </div>
  );
};

export default TitleNav;
