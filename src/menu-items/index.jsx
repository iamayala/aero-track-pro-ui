// project import
import dashboard from './dashboard';
import part from './inventory';
import aircraft from './aircraft';
import task from './task';
import report from './report';
import document from './document';
import certification from './certification';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, task, aircraft, part, document, certification, report]
};

export default menuItems;
