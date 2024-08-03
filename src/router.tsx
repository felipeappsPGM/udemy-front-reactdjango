import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Auth
const SignIn = Loader(lazy(() => import('src/content/pages/Auth/SignIn')));

// Groups
const Groups = Loader(lazy(() => import('src/content/pages/Groups/Groups')));

//Add Groups
const AddGroups = Loader(lazy(() => import('src/content/pages/Groups/Add')));

//Edit Groups
const EditGroups = Loader(lazy(() => import('src/content/pages/Groups/Edit')));

// Employees
const Employees = Loader(
  lazy(() => import('src/content/pages/Employees/Employees'))
);
const AddEmployees = Loader(
  lazy(() => import('src/content/pages/Employees/Add'))
);
const EditEmployee = Loader(
  lazy(() => import('src/content/pages/Employees/Edit'))
);

// Tasks
const TasksERP = Loader(lazy(() => import('src/content/pages/Tasks/Tasks')));
const AddTasks = Loader(lazy(() => import('src/content/pages/Tasks/Add')));
const EditTasks = Loader(lazy(() => import('src/content/pages/Tasks/Edit')));

//Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404/index'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/employees" replace />
      },
      {
        path: 'overview',
        element: <Navigate to="/employees" replace />
      },

      {
        path: '*',
        element: <Status404 />
      },
      //Auth
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
  //Groups

  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'groups',
        element: <Groups />
      },
      {
        path: 'groups-add',
        element: <AddGroups />
      },
      {
        path: 'groups/edit/:id',
        element: <EditGroups />
      }
    ]
  },

  // Employees
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: 'employees-add',
        element: <AddEmployees />
      },
      {
        path: 'employees/edit/:id',
        element: <EditEmployee />
      }
    ]
  },

  // Tasks
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'tasks',
        element: <TasksERP />
      },
      {
        path: 'tasks-add',
        element: <AddTasks />
      },
      {
        path: 'tasks/edit/:id',
        element: <EditTasks />
      }
    ]
  }
];

export default routes;
