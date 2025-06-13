import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';

const rootRoute = createRootRoute({ component: App });

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
});

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetails,
});

export const router = createRouter({ routeTree: rootRoute.addChildren([listRoute, detailsRoute]) });