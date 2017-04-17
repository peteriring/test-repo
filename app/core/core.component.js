import template from './core.html';
import './core.scss';

export class CoreController {
  constructor($log, $notifications) {
    $log.debug('init:', 'CoreComponent');
    this.$notifications = $notifications;
    this.show = false;
  }
  toggleMenu(param = !this.show) {
    this.show = param;
  }
}

CoreController.$inject = ['$log', '$notifications'];

export const CoreComponent = {
  template,
  ID: 'core',
  controller: CoreController,
  bindings: {},
};
