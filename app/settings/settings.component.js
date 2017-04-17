import template from './settings.html';
import './settings.scss';

export class SettingsController {
  constructor($log, $notifications, $gallery) {
    $log.debug('init:', 'SettingsComponent');
    this.$notifications = $notifications;
    this.$gallery = $gallery;
  }
  get nickname() {
    const { $notifications } = this;
    return $notifications.user;
  }

  set nickname(value) {
    const { $notifications } = this;
    $notifications.user = value;
  }

  get width() {
    const { $gallery } = this;
    return $gallery.width;
  }

  set width(value) {
    const { $gallery } = this;
    $gallery.width = value;
  }

  get height() {
    const { $gallery } = this;
    return $gallery.height;
  }

  set height(value) {
    const { $gallery } = this;
    $gallery.height = value;
  }
}

SettingsController.$inject = ['$log', '$notifications', '$gallery'];

export const SettingsComponent = {
  template,
  ID: 'settings',
  controller: SettingsController,
  bindings: {},
};
