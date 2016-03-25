angular.module('gucqa').directive('coursesIndex', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/courses/index/index.html',
    controllerAs: 'coursesIndex',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        courses: () => {
          return Courses.find({}, { sort: { name: 1 } });
        }
      });
    }
  }
});

