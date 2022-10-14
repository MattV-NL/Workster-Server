import { Switch } from 'antd';

const EmailNotifications = ({ checked, onChange }) => {
  return (
    <>
      <div className='sub-header'>Email Notifications</div>
      <div className='account-setting'>
        Off
        <Switch checked={checked} onChange={onChange} /> On
      </div>
    </>
  );
};

export default EmailNotifications;
