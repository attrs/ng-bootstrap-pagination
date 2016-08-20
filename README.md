# ng-bootstrap-pagination
> An angularjs pagination directive for bootstrap

## Installation
```sh
$ npm install ng-bootstrap-pagination --save
```

## Usage
```javascript
var angular = require('angular');
var pagination = require('ng-bootstrap-pagination');

angular.module('app', []).directive('pagination', pagination());
```

```html
<pagination ng-model="paging" set-count="5"></pagination>
```

```javascript
angular.module('app').controller('list', ['$scope', function($scope) {
  function refresh(options) {
    if( typeof options === 'number' ) options = {offset:options};
    if( typeof options === 'string' ) options = {search:options};
    options = options || {};
    
    var offset = options.offset || 0;
    var limit = options.limit || 50;
    
    $scope.paging = {
        total: 100,
        offset: offset,
        limit: limit,
        go: function(index) {
          refresh((index * limit) - limit);
        }
    };
  }
  
  refresh();
}]);
```


## Options
```javascript
angular.module('app', []).directive('pagination', pagination({
    tpl: '<nav>\
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
  </nav>',
  defaultModel: 'paging',
  defaultSetCount: 10
}));
```

- Options
    - tpl : template markup / String (Optional)
    - defaultModel : default model name / String (Optional) / default : paging
    - defaultSetCount : default display page amount at once / Number (Optional) / default : 10
