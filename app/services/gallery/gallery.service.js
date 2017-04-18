
export class GalleryService {
  static ID() {
    return '$gallery';
  }
  constructor(ENV, $timeout) {
    this.$timeout = $timeout;
    this.ENV = ENV;
    this.width = 640;
    this.height = 480;
    this.options = {};
  }

  get src() {
    const { width, height, ENV } = this;
    return `${ENV.imageUrl}${width}/${height}?t=${new Date().getTime()}`;
  }

  get tweening() {
    return this.options.tweening;
  }

  set tweening(value) {
    this.options.tweening = value;
  }

  reset() {
    delete this.index;
  }

  next() {
    const { index = -1 } = this;
    this.index = index + 1;
  }

  prev() {
    const { index = 0 } = this;
    this.index = Math.max(index - 1, 0);
  }

  toggle($element) {
    const { index } = this;
    const width = $element.width();
    $element.find('img').each(function iter(key) {
      const $parent = angular.element(this).parent();
      $parent.css('width', `${width}px`);
      if (key < index) {
        $parent.css('left', `${-width}px`);
      } else if (key > index) {
        $parent.css('left', `${width}px`);
      } else {
        $parent.css('left', '0px');
      }
    });
  }

  show($element) {
    const { $timeout } = this;
    $timeout(() => { this.tweening = false; }, 600);
    this.toggle($element);
  }

  extend($element, callback) {
    const { height, src } = this;
    const inner = $element.children().filter(function iter() { return angular.element(this).hasClass('carousel-inner'); });
    const width = $element.width();
    const style = `left: ${width}px; top: ${-height * (inner.children().length)}px; height: ${height}px; width: ${width}px;`;
    const $parent = inner
      .append(`<div class="item" style="${style}">`)
      .children()
      .last();
    const $img = document.createElement('img');
    $img.src = src;
    $img.onload = () => {
      $parent.append($img);
      if (callback && typeof callback === 'function') callback();
    };
  }
}

GalleryService.$inject = ['ENV', '$timeout'];

export default GalleryService;
