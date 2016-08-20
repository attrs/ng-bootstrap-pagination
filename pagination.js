module.exports = function(options) {
  options = options || {};
  var tpl = options.tpl || '<nav>\
    <ul class="pagination mv0">\
      <li ng-class="prevable ? \'\' : \'disabled\'">\
        <a href="" aria-label="Previous" ng-click="prev()">\
          <span aria-hidden="true">&laquo;</span>\
        </a>\
      </li>\
      <li ng-class="page.active ? \'active\' : \'\'" ng-repeat="page in pages track by $index">\
        <a href="" ng-click="go(page.page)">{{page.page}}</a>\
      </li>\
      <li ng-class="nextable ? \'\' : \'disabled\'">\
        <a href="" aria-label="Next" ng-click="next()">\
          <span aria-hidden="true">&raquo;</span>\
        </a>\
      </li>\
    </ul>\
  </nav>';
  var defaultModel = options.defaultModel || 'paging';
  var defaultSetCount = +options.defaultSetCount || 10;
  
  return ['$templateCache', function ($templateCache) {
    return {
      template: tpl,
      replace: false,
      restrict: 'E',
      link: function($scope, $element, $attrs, ctrl) {
        var ngModel = $attrs.ngModel || defaultModel;
        $scope.prevable = false;
        $scope.nextable = false;
        $scope.curr = 0;
        $scope.total = 0;
        var set_count = +($attrs.setCount || defaultSetCount);
      
        var render = function() {
          var paging = $scope.paging = $scope.$eval(ngModel);
        
          if( paging ) {
            var total = paging.total;
            var offset = paging.offset;
            var limit = paging.limit;
          
            var prevable = offset > 0;
            var nextable = (offset + limit) < total;
            var curr = (Math.floor(offset / limit) + 1) || 1;
            var total = Math.ceil(total / limit);
            var pages = [];
            var set_index = Math.floor((curr - 1) / set_count) + 1;
            var start_page = (set_index * set_count) - set_count + 1;
            var end_page = (set_index * set_count);
          
            for(var i=start_page; i <= end_page; i++) {
              if( i > total ) break;
              pages.push({
                active: i === curr,
                page: i
              });
            }
          
            $scope.prevable = prevable;
            $scope.nextable = nextable;
            $scope.curr = curr;
            $scope.total = total;
            $scope.pages = pages;
            $scope.set_index = set_index;
            $scope.start_page = start_page;
            $scope.end_page = end_page;
          } else {
            $scope.prevable = false;
            $scope.nextable = false;
            $scope.curr = 1;
            $scope.total = 1;
            $scope.pages = [{active: true, page: 1}];
            $scope.set_index = 1;
            $scope.start_page = 1;
            $scope.end_page = 1;
          }
        };
      
        $scope.next = function() {
          if( $scope.nextable ) {
            var paging = $scope.$eval(ngModel);
            if( paging ) paging.go($scope.curr + 1);
          }
        };
        $scope.prev = function() {
          if( $scope.prevable ) {
            var paging = $scope.$eval(ngModel);
            if( paging ) paging.go($scope.curr - 1);
          }
        };
        $scope.go = function(index) {
          if( index < 1 ) index = 1;
          var paging = $scope.$eval(ngModel);
          if( paging ) paging.go(index);
        };
      
        $scope.$watch(ngModel, function(value) {
          render();
        });
      
        render();
      }
    };
  }];
};