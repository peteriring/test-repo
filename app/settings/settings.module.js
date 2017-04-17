import angular from 'angular';
import uirouter from 'angular-ui-router';

import services from '@app/services';

import { SettingsComponent } from './settings.component';
import { directive } from './settings.directive';

export default angular.module('settings', [uirouter, services])
  .component(SettingsComponent.ID, SettingsComponent)
  .directive(directive.ID, directive)
  .name;
