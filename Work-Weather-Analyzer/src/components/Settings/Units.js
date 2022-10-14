import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Units = ({ darkMode, units, setUnits, clearWeatherValues }) => {
  const unitsOptions = ['metric', 'imperial', 'standard'];

  const unitsMenu = unitsOptions.map((unit) => {
    return {
      label: (
        <div
          onClick={() => {
            setUnits(unit);
            clearWeatherValues();
          }}
        >
          {unit}
        </div>
      ),
    };
  });

  const menu = <Menu items={unitsMenu} />;

  return (
    <>
      <div className='sub-header'>Measurement Unit</div>
      <div className={darkMode ? 'dark-dropdown' : 'light-dropdown'}>
        <Dropdown overlay={menu} trigger={'click'}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Units
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>{`Selected Units ${units}`}</div>
    </>
  );
};

export default Units;
