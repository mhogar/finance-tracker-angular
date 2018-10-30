var app = angular.module('FinanceTrackerApp', [])
                 .factory('stockService', ['$http', function($http) {
                   var stockApi = {};
                   
                   stockApi.searchStocks = function(symbol) {
                     return $http.get('/search_stocks.json?stock=' + symbol);
                   }
                   
                   return stockApi;
                 }])
                 .controller('stocksController', ['$scope', 'stockService', function($scope, stockService) {
                    $scope.stock = {};
                   
                    $scope.lookup = function() {
                      if ($scope.ticker != undefined && $scope.ticker != '') {
                        stockService.searchStocks($scope.ticker).then(
                          function (response) {
                            let data = response.data;
                            
                            $scope.stock = {};
                            $scope.stock.error        = null;
                            $scope.stock.symbol       = data.ticker;
                            $scope.stock.name         = data.name;
                            $scope.stock.last_price   = data.last_price;
                            $scope.stock.can_be_added = data.can_be_added;
                          },
                          function (response) {
                            $scope.stock = {};
                            $scope.stock.error = response.data.response;
                          }
                        );
                      }
                      else {
                       $scope.stock = {};
                      }
                    }
                 }])