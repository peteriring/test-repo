
export class GalleryService {
  static ID() {
    return '$gallery';
  }
  constructor(ENV) {
    this.ENV = ENV;
    this.width = 640;
    this.height = 480;
    this.images = [];
  }

  get image() {
    const { images, index } = this;
    return images[index];
  }

  reset() {
    this.images = [];
    delete this.index;
  }

  getImage(callback) {
    const { width, height, images, ENV } = this;
    const img = new Image();
    img.onload = function onload() {
      images.push(this);
      callback(this);
    };
    img.src = `${ENV.imageUrl}${width}/${height}?t=${new Date().getTime()}`;
  }

  next(callback) {
    const { index = -1, images } = this;
    this.index = index + 1;
    if (this.index < images.length) {
      callback(this.image);
    } else {
      this.getImage(callback);
    }
  }

  prev(callback) {
    const { index = 0, images } = this;
    this.index = Math.max(index - 1, 0);
    if (this.index < images.length) {
      callback(this.image);
    } else {
      this.getImage(callback);
    }
  }
}

GalleryService.$inject = ['ENV'];

export default GalleryService;
