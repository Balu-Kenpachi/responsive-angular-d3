'use strict';

import * as d3 from "d3";
import BarChart from '../charts/bar-chart';

const SIZE = {
  top: 20,
  bottom: 110,
  left: { sm: 0, lg: 50 }
};

export default [
  '$window',
  '$timeout',
  function BarChartDirective($window, $timeout){
    var linker = function(scope, element, attrs){
      // the DOM needs time to load, so that we can access the computed width of the container elements.
      // setting a 100ms timeout gives that xtra time to capture the final DOM
      angular.element(document).ready(() => {
        let chart = new BarChart(d3, element, scope.data, attrs.id);
        chart.size(SIZE).render();

        angular.element($window).bind('resize', () => chart.clean(SIZE).size().render());
      }, 100);
    }

    return {
      restrict: 'EA',
      replace: true,
      link: linker,
      scope: { 
        data: '=',
        chartId: '='
      }
    }
  }
];
