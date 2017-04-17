import angular from 'angular';

import { GalleryService } from './gallery.service';

export default angular.module('gallery', [])
  .service(GalleryService.ID(), GalleryService)
  .name;
