// assets
import { FolderOpenOutlined } from '@ant-design/icons';

// icons
const icons = {
  FolderOpenOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const document = {
  id: 'document',
  title: 'Documents',
  type: 'group',
  children: [
    {
      id: 'document-management',
      title: 'Document Management',
      type: 'item',
      url: '/document-management',
      icon: icons.FolderOpenOutlined
    }
  ]
};

export default document;
