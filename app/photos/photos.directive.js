import template from './photos.directive.html';

function extend(inner, width, height) {
  const style = `left: ${width}px; top: ${-height * (inner.children().length)}px; height: ${height}px; width: ${width}px;`;
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


function toggle(active, elem, width) {
  elem.find('canvas').each(function iter(index) {
    const parent = angular.element(this).parent();
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
      const inner = elem.children().filter(function iter() {
        return angular.element(this).hasClass('carousel-inner');
      });
      const show = () => {
        $timeout(() => { options.tweening = false; }, 600);
        toggle($gallery.index, elem, scope.width, scope.height);
        if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') scope.$apply();
      };
      const draw = (data, ctx) => {
        ctx.drawImage(data, 0, 0);
        show();
      };

      const mouse = {};
      const start = {};
      const drag = (e) => { start.x = e.clientX; start.y = e.clientY; mouse.dragging = true; };
      const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
      const stop = () => {
        const distance = ((mouse.x - start.x) ** 2) + ((mouse.y - start.y) ** 2);
        if (distance < 9 || !mouse.dragging) return null;
        mouse.dragging = false;
        return (mouse.x - start.x > 0) ? scope.prev() : scope.next();
      };

      inner.on('swipeleft', scope.next);
      inner.on('swiperight', scope.prev);
      inner.on('dragstart', drag);
      inner.on('mousemove', move);
      inner.on('dragleave mouseup mouseleave', stop);

      scope.width = $gallery.width;
      scope.height = $gallery.height;
      scope.next = () => {
        if (options.tweening) return null;
        options.tweening = true;
        if ((!$gallery.index && $gallery.index !== 0) ||
          $gallery.index === inner.children().length - 1) {
          const ctx = extend(inner, scope.width, scope.height);
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
        inner.off('swipeleft', scope.next);
        inner.off('swiperight', scope.prev);
        inner.off('dragstart', drag);
        inner.off('mousemove', move);
        inner.off('dragleave mouseup mouseleave', stop);
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
