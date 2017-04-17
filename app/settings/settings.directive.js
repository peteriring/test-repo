import template from './settings.directive.html';

export function directive() {
  return {
    template,
    scope: true,
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function link(scope, elem, attrs) {
      scope.title = attrs.title;
      scope.click = () => {
        scope.show = !scope.show;
        elem.children().each(function iter() {
          const child = angular.element(this);
          if (child.hasClass('accordion-content')) child.slideToggle('fast');
        });
      };
    },
  };
}

directive.$inject = [];
directive.ID = 'accordion';

export default directive;
