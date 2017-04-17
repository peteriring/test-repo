import angular from 'angular';
import uirouter from 'angular-ui-router';

import services from '@app/services';

import { CoreComponent } from './core.component';

export default angular.module('core', [uirouter, services])
  .component(CoreComponent.ID, CoreComponent)
  .name;
