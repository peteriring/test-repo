import angular from 'angular';
import uirouter from 'angular-ui-router';

import services from '@app/services';

import { ChatComponent } from './chat.component';

export default angular.module('chat', [uirouter, services])
  .component(ChatComponent.ID, ChatComponent)
  .name;
