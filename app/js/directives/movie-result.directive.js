/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .directive('movieResult', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                result: '='
            },
            template: [
                '<div class="row">',
                    '<div class="col-sm-4">',
                        '<img ng-show="result.Poster && result.Poster.length > 3" ng-src="{{ result.Poster }}" alt="{{ result.Title }}" />',
                    '</div>',
                    '<div class="col-sm-8">',
                        '<h3>{{ result.Title }}</h3>',
                        '<p><strong>Director: </strong>{{ result.Director }}</p>',
                        '<p><strong>Actors: </strong>{{ result.Actors }}</p>',
                        '<p><strong>Released: </strong>{{ result.Released }} ({{ result.Released | fromNowFilter }})</p>',
                        '<p><strong>Genre: </strong>{{ result.Genre }}</p>',
                        '<p><strong>Plot: </strong>{{ result.Plot }}</p>',
                    '</div>',
                '</div>'
            ].join('')
        }
    });