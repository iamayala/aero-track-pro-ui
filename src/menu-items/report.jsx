// assets
import { FileTextOutlined, FileProtectOutlined } from '@ant-design/icons';

// icons
const icons = {
  FileTextOutlined,
  FileProtectOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const report = {
  id: 'report',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'automated-reports',
      title: 'Maintenance Reports',
      type: 'item',
      url: '/automated-reports',
      icon: icons.FileTextOutlined
    },
    {
      id: 'compliance-reports',
      title: 'Compliance Reports',
      type: 'item',
      url: '/compliance-reports',
      icon: icons.FileProtectOutlined
    }
  ]
};

export default report;
