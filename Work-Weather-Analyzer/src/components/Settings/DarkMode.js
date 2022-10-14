import { Switch } from 'antd';

const DarkMode = ({ checked, onChange }) => {
  return (
    <>
      <div className='sub-header'>Dark Mode</div>
      <div className='account-setting'>
        Off
        <Switch checked={checked} onChange={onChange} /> On
      </div>
    </>
  );
};

export default DarkMode;
