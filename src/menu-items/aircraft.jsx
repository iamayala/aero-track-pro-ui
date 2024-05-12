// assets
import {
  SyncOutlined,
  FundProjectionScreenOutlined,
  TableOutlined
} from '@ant-design/icons';

// icons
const icons = {
  SyncOutlined,
  FundProjectionScreenOutlined,
  TableOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const aircraft = {
  id: 'aircraft',
  title: 'Aircrafts',
  type: 'group',
  children: [
    {
      id: 'aircraft-monitoring',
      title: 'Aircraft Monitoring',
      type: 'item',
      url: '/aircraft-monitoring',
      icon: icons.FundProjectionScreenOutlined
    },
    {
      id: 'aircraft-history',
      title: 'History and Logbook',
      type: 'item',
      url: '/aircraft-history',
      icon: icons.SyncOutlined
    },
     {
      id: 'fleet-analytics',
      title: 'Fleet Analytics',
      type: 'item',
      url: '/fleet-analytics',
      icon: icons.TableOutlined
    },
  ]
};

export default aircraft;
