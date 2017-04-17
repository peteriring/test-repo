import template from './chat.html';
import './chat.scss';

export class ChatController {
  constructor($log, $scope, $notifications) {
    $log.debug('init:', 'ChatComponent');
    this.$log = $log;
    this.$scope = $scope;
    this.$notifications = $notifications;
    this.message = '';

    const listener = data => this.recieve(data);

    $notifications.seen();
    $notifications.on('message', listener);
    $scope.$on('$destroy', () => this.destructor(listener));
  }
  send() {
    if (!this.message) return;
    const { $notifications } = this;
    $notifications.emit('message', { message: this.message });
    this.messages = $notifications.history();
    this.message = '';
  }
  recieve() {
    const { $scope, $notifications } = this;
    this.messages = $notifications.history();
    $notifications.seen();
    if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') $scope.$apply();
  }

  destructor(listener) {
    const { $notifications } = this;
    $notifications.destroy('message', listener);
  }
}

ChatController.$inject = ['$log', '$scope', '$notifications'];

export const ChatComponent = {
  template,
  ID: 'chat',
  controller: ChatController,
  bindings: {
    messages: '<',
  },
};
