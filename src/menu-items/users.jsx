// assets
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = { TeamOutlined };

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const users = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'manage-staff',
      title: 'Manage Staff',
      type: 'item',
      url: '/manage-staff',
      icon: icons.TeamOutlined
    }
  ]
};

export default users;
