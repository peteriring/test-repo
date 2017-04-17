import { SettingsComponent } from './settings.component';

export const routes = {
  url: '/settings/',
  component: SettingsComponent.ID,
  data: {
    class: 'settings',
    title: 'Settings',
  },
};

export default routes;
