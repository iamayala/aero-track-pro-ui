// assets
import { CalendarOutlined , ProfileOutlined, TeamOutlined  } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined,
  ProfileOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const task = {
  id: 'task-management',
  title: 'Task Management',
  type: 'group',
  children: [
    {
      id: 'maintenance-schedule',
      title: 'Maintenance Schedule',
      type: 'item',
      url: '/maintenance-schedule',
      icon: icons.CalendarOutlined
    },
    {
      id: 'task-order',
      title: 'Task and Work Order',
      type: 'item',
      url: '/task-order',
      icon: icons.ProfileOutlined
    },
     {
      id: 'manage-staff',
      title: 'Manage Staff',
      type: 'item',
      url: '/manage-staff',
      icon: icons.TeamOutlined
    }
  ]
};

export default task;
