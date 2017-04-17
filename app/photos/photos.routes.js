import { PhotosComponent } from './photos.component';

export const routes = {
  url: '/photos/',
  component: PhotosComponent.ID,
  data: {
    class: 'photos',
    title: 'Gallery',
  },
};

export default routes;
