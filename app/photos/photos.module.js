import angular from 'angular';
import uirouter from 'angular-ui-router';

import services from '@app/services';

import { PhotosComponent } from './photos.component';
import { directive } from './photos.directive';

export default angular.module('photos', [uirouter, services])
  .component(PhotosComponent.ID, PhotosComponent)
  .directive(directive.ID, directive)
  .name;
