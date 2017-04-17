import core from '@app/core/core.routes';
import chat from '@app/chat/chat.routes';
import photos from '@app/photos/photos.routes';
import settings from '@app/settings/settings.routes';

export function routes($stateProvider) {
  $stateProvider
    .state('core', core)
    .state('core.chat', chat)
    .state('core.photos', photos)
    .state('core.settings', settings);
}

routes.$inject = ['$stateProvider'];

export default routes;
