import template from './photos.html';
import './photos.scss';

export class PhotosController {
  constructor($log) {
    $log.debug('init:', 'PhotosComponent');
  }
}

PhotosController.$inject = ['$log'];

export const PhotosComponent = {
  template,
  ID: 'photos',
  controller: PhotosController,
  bindings: {},
};
