// assets
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
