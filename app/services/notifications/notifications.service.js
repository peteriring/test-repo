import * as socket from 'socket.io-client';
import EventEmitter from 'events';

export class NotificationService extends EventEmitter {
  static ID() {
    return '$notifications';
  }

  static start() {}

  constructor(ENV, $rootScope) {
    super();
    this.socket = socket.connect(ENV.socketIOUrl);
    this.user = 'guest0001';
    this.$rootScope = $rootScope;
  }

  on(name, callback) {
    this.socket.on(name, callback);
  }

  emit(name, params) {
    this.socket.emit(name, { ...params, user: this.user });
    this.store({ ...params, user: 'me' });
  }

  start() {
    this.messages = [];
    this.unread = false;
    this.listener = data => this.onMessage(data);
    this.on('message', this.listener);
  }

  stop() {
    this.destroy('message', this.listener);
  }

  seen() {
    this.unread = false;
  }

  history() {
    return this.messages;
  }

  store(data) {
    data.timestamp = new Date().getTime();
    this.messages.push(data);
  }

  onMessage(data) {
    const { $rootScope } = this;
    this.unread = true;
    this.store(data);
    if ($rootScope.$root.$$phase !== '$apply' && $rootScope.$root.$$phase !== '$digest') $rootScope.$apply();
  }

  destroy(name, listener) {
    this.socket.removeListener(name, listener);
  }
}

NotificationService.$inject = ['ENV', '$rootScope'];

export default NotificationService;
