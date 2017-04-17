import angular from 'angular';

import { NotificationService } from './notifications.service';
import { run } from './notifications.run';

export default angular.module('notifications', [])
  .service(NotificationService.ID(), NotificationService)
  .run(run)
  .name;
