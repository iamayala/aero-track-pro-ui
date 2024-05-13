// assets
import {
  SafetyCertificateOutlined 
} from '@ant-design/icons';

// icons
const icons = {
SafetyCertificateOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const certification = {
  id: 'certification',
  title: 'Learning',
  type: 'group',
  children: [
    {
      id: 'certification-inventory',
      title: 'Certificates',
      type: 'item',
      url: '/certification',
      icon: icons.SafetyCertificateOutlined
    }
  ]
};

export default certification;
