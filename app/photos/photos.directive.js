import template from './photos.directive.html';

function extend(inner, elem, width, height) {
  const w = elem.width();
  const style = `left: ${w}px; top: ${-height * (inner.children().length)}px; height: ${height}px; width: ${w}px;`;
  const parent = inner
    .append(`<div class="item" style="${style}">`)
    .children()
    .last();
  const canvas = parent
    .append(`<canvas width="${width}" height="${height}">`)
    .children()
    .last();
  const ctx = canvas[0].getContext('2d');
  return ctx;
}


function toggle(active, elem) {
  const width = elem.width();
  elem.find('canvas').each(function iter(index) {
    const parent = angular.element(this).parent();
    parent.css('width', `${width}px`);

    if (index < active) {
      parent.css('left', `${-width}px`);
    } else if (index > active) {
      parent.css('left', `${width}px`);
    } else {
      parent.css('left', '0px');
    }
  });
}

export function directive($gallery, $timeout) {
  return {
    template,
    scope: {},
    restrict: 'E',
    replace: true,
    link: function link(scope, elem) {
      const options = {};
      const win = angular.element(window);
      const inner = elem.children().filter(function iter() {
        return angular.element(this).hasClass('carousel-inner');
      });
      const show = () => {
        $timeout(() => { options.tweening = false; }, 600);
        toggle($gallery.index, elem);
        if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') scope.$apply();
      };
      const draw = (data, ctx) => {
        ctx.drawImage(data, 0, 0);
        show();
      };

      const mouse = {};
      const start = {};
      const init = (e) => {
        const { type, clientX, clientY } = e;
        const pos = {
          x: (type === 'touchstart') ? e.originalEvent.touches[0].clientX : clientX,
          y: (type === 'touchstart') ? e.originalEvent.touches[0].clientY : clientY,
        };
        start.x = pos.x;
        start.y = pos.y;
        start.type = type;
        start.timestamp = new Date().getTime();
        mouse.dragging = true;
      };
      const move = (e) => {
        const { type, clientX, clientY } = e;
        const pos = {
          x: (type === 'touchmove') ? e.originalEvent.touches[0].clientX : clientX,
          y: (type === 'touchmove') ? e.originalEvent.touches[0].clientY : clientY,
        };
        mouse.x = pos.x;
        mouse.y = pos.y;
      };
      const stop = () => {
        const threshold = start.type === 'touchstart' ? 150 : 3;
        const distance = Math.abs(mouse.x - start.x);
        const elapsed = new Date().getTime() - start.timestamp;
        if (distance < threshold || elapsed < 200 || !mouse.dragging) return null;
        mouse.dragging = false;
        return (mouse.x - start.x > 0) ? scope.prev() : scope.next();
      };
      const resize = () => toggle($gallery.index, elem);

      win.on('resize', resize);
      inner.on('dragstart touchstart', init);
      inner.on('mousemove touchmove', move);
      inner.on('dragleave mouseup mouseleave touchend', stop);

      scope.width = $gallery.width;
      scope.height = $gallery.height;
      scope.next = () => {
        if (options.tweening) return null;
        options.tweening = true;
        if ((!$gallery.index && $gallery.index !== 0) ||
          $gallery.index === inner.children().length - 1) {
          const ctx = extend(inner, elem, scope.width, scope.height);
          return $gallery.next(data => draw(data, ctx));
        }
        return $gallery.next(show);
      };
      scope.prev = () => {
        if (options.tweening) return;
        options.tweening = true;
        $gallery.prev(show);
      };
      scope.$on('$destroy', () => {
        win.off('resize', resize);
        inner.off('dragstart touchstart', init);
        inner.off('mousemove touchmove', move);
        inner.off('dragleave mouseup mouseleave touchend', stop);
        $gallery.reset();
      });

      scope.next();
      elem.css('max-height', scope.height);
      elem.css('max-width', scope.width);
      inner.css('max-height', scope.height);
      inner.css('max-width', scope.width);
    },
  };
}

directive.$inject = ['$gallery', '$timeout'];
directive.ID = 'carousel';

export default directive;
