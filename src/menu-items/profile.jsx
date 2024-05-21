// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const profile = {
  id: 'profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.UserOutlined
    }
  ]
};

export default profile;
