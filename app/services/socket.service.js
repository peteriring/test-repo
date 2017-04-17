import * as socket from 'socket.io-client';
import EventEmitter from 'events';

export class SocketService extends EventEmitter {
  static ID() {
    return '$socket';
  }

  constructor(ENV) {
    super();
    this.socket = socket.connect(ENV.socketIOUrl);
  }

  on(name, callback) {
    this.socket.on(name, callback);
  }

  emit(name, params) {
    this.socket.emit(name, params);
  }

  destroy(name, listener) {
    this.socket.removeListener(name, listener);
  }
}

export default SocketService;
