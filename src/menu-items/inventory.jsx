// assets
import {
  ApiOutlined,
  FileSyncOutlined
} from '@ant-design/icons';

// icons
const icons = {
  ApiOutlined,
  FileSyncOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const parts = {
  id: 'parts',
  title: 'Parts',
  type: 'group',
  children: [
    {
      id: 'parts-inventory',
      title: 'Parts and Inventory',
      type: 'item',
      url: '/inventory-management',
      icon: icons.ApiOutlined
    },
    {
      id: 'orders-inventory',
      title: 'Orders',
      type: 'item',
      url: '/inventory-orders',
      icon: icons.FileSyncOutlined
    },
  ]
};

export default parts;
