import template from './photos.directive.html';

export class SwipeListener {
  constructor(elem) {
    this.elem = elem;
    this.window = angular.element(window);
    this.left = () => {};
    this.right = () => {};
    this.resize = () => {};
    this.mouse = {};
    this.before = {};
  }

  add(name, callback) {
    this[name] = callback;
  }

  register() {
    this.onStart = e => this.start(e);
    this.onMove = e => this.move(e);
    this.onStop = e => this.stop(e);
    this.onResize = e => this.resize(e);
    this.window.on('resize', this.onResize);
    this.elem.on('dragstart touchstart', this.onStart);
    this.elem.on('mousemove touchmove', this.onMove);
    this.elem.on('dragleave mouseup mouseleave touchend', this.onStop);
  }

  start(event) {
    event.preventDefault();
    const { type, clientX, clientY } = event;
    const pos = {
      x: (type === 'touchstart') ? event.originalEvent.touches[0].clientX : clientX,
      y: (type === 'touchstart') ? event.originalEvent.touches[0].clientY : clientY,
    };
    this.before.x = pos.x;
    this.before.y = pos.y;
    this.before.type = type;
    this.before.timestamp = new Date().getTime();
    this.mouse.dragging = true;
  }

  move(event) {
    const { type, clientX, clientY } = event;
    const pos = {
      x: (type === 'touchmove') ? event.originalEvent.touches[0].clientX : clientX,
      y: (type === 'touchmove') ? event.originalEvent.touches[0].clientY : clientY,
    };
    this.mouse.x = pos.x;
    this.mouse.y = pos.y;
  }

  stop() {
    const { before, mouse, left, right } = this;
    const threshold = before.type === 'touchstart' ? 150 : 3;
    const distance = Math.abs(mouse.x - before.x);
    const elapsed = new Date().getTime() - before.timestamp;
    if (distance < threshold || elapsed < 100 || !mouse.dragging) return null;
    this.mouse.dragging = false;
    return (mouse.x - before.x > 0) ? left() : right();
  }

  destroy() {
    this.window.off('resize', this.onResize);
    this.elem.off('dragstart touchstart', this.onStart);
    this.elem.off('mousemove touchmove', this.onMove);
    this.elem.off('dragleave mouseup mouseleave touchend', this.onStop);
  }
}

export function directive($gallery, $timeout) {
  return {
    template,
    scope: {},
    restrict: 'E',
    replace: true,
    link: function link($scope, $element) {
      const { width, height } = $gallery;
      const $inner = $element.children().filter(function iter() {
        return angular.element(this).hasClass('carousel-inner');
      });

      $scope.next = () => {
        if ($gallery.tweening) return null;
        $gallery.tweening = true;

        const { index } = $gallery;
        const length = $inner.children().length - 1;
        const callback = () => {
          $gallery.next();
          $timeout(() => { $gallery.tweening = false; }, 600);
          $gallery.toggle($element);
        };

        if ((!index && index !== 0) || index === length) return $gallery.extend($element, callback);
        return callback();
      };
      $scope.prev = () => {
        if ($gallery.tweening) return;
        $gallery.tweening = true;

        $gallery.prev();
        $timeout(() => { $gallery.tweening = false; }, 600);
        $gallery.toggle($element);
      };

      const listener = new SwipeListener($element);
      listener.add('resize', () => $gallery.toggle($element));
      listener.add('right', () => $scope.next());
      listener.add('left', () => $scope.prev());
      listener.register();

      $scope.$on('$destroy', () => {
        listener.destroy();
        $gallery.reset();
      });

      $scope.next();

      $element.css('max-height', height);
      $element.css('max-width', width);
      $inner.css('max-height', height);
      $inner.css('max-width', width);
    },
  };
}

directive.$inject = ['$gallery', '$timeout'];
directive.ID = 'carousel';

export default directive;
