'use strict';

angular.module('angularJsExampleApp')
  .directive('rxPaint', ['rx', function(rx) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        function getOffset(event) {
          return {
            offsetX: event.offsetX || event.layerX,
            offsetY: event.offsetY || event.layerY
          };
        }

        function returnTrue() {
          console.log('mousedown');
          return 1;
        }

        function returnFalse() {
          console.log('mouseup');
          return 0;
        }

        console.log('rxPaint');
        var canvas = element[0];
        var ctx = canvas.getContext('2d');
        ctx.beginPath();

        var mousemove = rx.Observable.fromEvent(element, 'mousemove');
        var mousedown = rx.Observable.fromEvent(element, 'mousedown');
        var mouseup = rx.Observable.fromEvent(element, 'mouseup');

        // Calculate mouse deltas
        var mouseDiffs = mousemove.bufferWithCount(2, 1).select(function(x) {
          return {
            first: getOffset(x[0]),
            second: getOffset(x[1])
          };
        });

        // Merge mouse down and mouse up
        var mouseButton = mousedown.select(returnTrue)
          .merge(mouseup.select(returnFalse));

        // Determine whether to paint or lift
        var paint = mouseButton.select(function(down) {
          return down ? mouseDiffs : mouseDiffs.take(0);
        }).switchLatest();

        // Paint the results
        paint.subscribe(function(x) {
          ctx.moveTo(x.first.offsetX, x.first.offsetY);
          ctx.lineTo(x.second.offsetX, x.second.offsetY);
          ctx.stroke();
        });
      }
    };
  }]);
