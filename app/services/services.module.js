import angular from 'angular';

import notifications from './notifications';
import gallery from './gallery';

export default angular.module('services', [notifications, gallery])
  .name;
