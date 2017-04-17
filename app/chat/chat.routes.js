import { ChatComponent } from './chat.component';

export const routes = {
  url: '/chat/',
  component: ChatComponent.ID,
  data: {
    class: 'chat',
    title: 'Chat',
  },
  resolve: {
    messages: ['$notifications', $notifications => $notifications.history()],
  },
};

export default routes;
