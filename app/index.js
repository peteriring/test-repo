import '@app/favicon.ico';
import '@app/style.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import env from '@app/config';
import core from '@app/core';
import chat from '@app/chat';
import photos from '@app/photos';
import settings from '@app/settings';

import { routes } from './routes';

export default angular.module('index', [uirouter, env, core, chat, photos, settings])
  .config(routes)
  .config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])
  .config(['$urlRouterProvider', $urlRouterProvider => $urlRouterProvider.otherwise($injector => $injector.get('$state').go('core.chat'))])
  .run(['$rootScope', '$state', ($rootScope, $state) => { $rootScope.$state = $state; }])
  .name;
