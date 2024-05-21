import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// new urls
const AircraftHistory = Loadable(lazy(() => import('pages/aircraft-history')));
const AircraftMonitoring = Loadable(lazy(() => import('pages/aircraft-monitoring')));
const AutomatedReports = Loadable(lazy(() => import('pages/automated-reports')));
const ComplianceReports = Loadable(lazy(() => import('pages/compliance-reports')));
const DocumentManagement = Loadable(lazy(() => import('pages/document-management')));
const FleetAnalytics = Loadable(lazy(() => import('pages/fleet-analytics')));
const MaintenanceSchedule = Loadable(lazy(() => import('pages/maintenance-schedule')));
const TaskOrder = Loadable(lazy(() => import('pages/task-order')));
const Inventory = Loadable(lazy(() => import('pages/inventory-management')));
const InventoryOrders = Loadable(lazy(() => import('pages/inventory-orders')));
const ManageStaff = Loadable(lazy(() => import('pages/staff')));
const Certification = Loadable(lazy(() => import('pages/certification')));
const Profile = Loadable(lazy(() => import('pages/profile')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'inventory-management',
      element: <Inventory />
    },
    {
      path: 'aircraft-history',
      element: <AircraftHistory />
    },
    {
      path: 'aircraft-monitoring',
      element: <AircraftMonitoring />
    },
    {
      path: 'automated-reports',
      element: <AutomatedReports />
    },
    {
      path: 'document-management',
      element: <DocumentManagement />
    },
    {
      path: 'fleet-analytics',
      element: <FleetAnalytics />
    },
    {
      path: 'maintenance-schedule',
      element: <MaintenanceSchedule />
    },
    {
      path: 'task-order',
      element: <TaskOrder />
    },
    {
      path: 'inventory-orders',
      element: <InventoryOrders />
    },
    {
      path: 'compliance-reports',
      element: <ComplianceReports />
    },
    {
      path: 'manage-staff',
      element: <ManageStaff />
    },
    {
      path: 'certification',
      element: <Certification />
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
