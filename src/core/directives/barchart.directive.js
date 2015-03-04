(function(){
    'use strict'
    console.log("i m directive");

    angular
        .module('core.module')
        .directive('atBarchart', barchartDirective);

    barchartDirective.$inject = ['$window'];

    /* @ngInject */
    function barchartDirective($window) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link (scope, element, attrs) {

            console.log("i m here");
            var margin = {t: 20, r: 150, b: 20, l: 70}, height = 400;
            var svg = d3.select(element[0]).append("svg")
                .style('width', '100%')
                .attr('height', height)
                .attr("transform", "translate(0," + (margin.t) + ")");
            var drawChart =  function (n, o) {
                //Removing SVG data and regenerating graph
                svg.selectAll('*').remove();

                if (!n || typeof (n[0]) === "undefined") {
                    return;
                }
                var traderObj = n;
                var width = parseInt(d3.select("svg").style("width").replace("px",""));
                var w = width - margin.l - margin.r;
                var h = height - margin.t - margin.b;

                var y = d3.scale.linear().range([h - margin.t - margin.b, 0]);
                var x = d3.scale.linear().range([0, w - margin.r - margin.l]);
                var yScale = d3.scale.ordinal()
                                .rangeRoundBands([0, h - margin.t - margin.b], 0.1)
                                .domain(traderObj.map(function(d){ return d.id;}));

                var color = ["rgba(225,128,0,1)", "rgba(225,128,0,0.5)", "rgba(225,128,0,0.3)"];
                var getRanges = function (d) {
                    var e, p;
                    e = ((d.quantityExecuted / d.quantity)).toFixed(4);
                    p = ((d.quantityPlaced / d.quantity)).toFixed(4);
                    return [[0, e], [e, (p - e).toFixed(4)], [p, 1 - p]];
                };

                var line = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    });

                function make_x_axis() {
                    return d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .ticks(5);
                }

                // function for the y grid lines
                function make_y_axis() {
                    console.log('in make_y_axis');
                    return d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);
                }
                // Draw the x Grid lines
                // function for the x grid lines
                var yCount = n.length;
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("top")
                    .tickSubdivide(true)
                    .tickFormat(d3.format(".0%"))
                    .ticks(3);
                var y_domain = [yCount, 0];

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    //.ticks(0)
                    .tickSubdivide(true)
                    .orient("left");
                //y.domain(y_domain);

                //X-axis created
                svg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                    .call(xAxis);
                //Y-axis created
                svg.append("g")
                    .attr("class", "y-axis")
                    .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                    .call(yAxis);
                // Draw Y axis labels
                n.forEach(function (td, j) {
                   // console.log(td, j);
                    svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h + margin.t) + ")")
                        .call(make_x_axis()
                            .tickSize(-h, 0, 0)
                            .tickFormat("")
                    );

                    // Draw the y Grid lines
                    svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h + margin.t) + ")")
                        .call(make_y_axis()
                            .tickSize(-w, 0, 0)
                            .tickFormat("")
                    );

                   // console.log("j>>>>" + j);
                  //  if(j == 0) {
                        /*svg.append("g")
                            .attr("class","labels")
                            .append("text")
                            .text(td.id)
                            .attr("transform", "translate(" + (margin.l - 20) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");*/
                        // Put Total quantity on the right of bar
                    svg.append("g")
                        .attr({
                           "transform" : "translate(0," + margin.t + ")" 
                        })
                        .append("text")
                        .text(td.quantity)
                        .attr({
                            "transform" : function(){

                                return "translate(" + (w - margin.r + 10) + "," + (yScale(td.id) + yScale.rangeBand()/2) + ")"
                            },
                            "class" : "text-labels"
                        });
                        

                        // Draw a line below total quantity right to bar
                   // }
                    svg.append("g")
                        .attr("class","labels")
                        .append("path")
                        .attr("class", "line")
                        .attr("d", line([{x: 0, y: 0}, {x: 60, y: 0}]))
                        .attr("transform", "translate(" + (w - margin.r) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount + 1) + ")");
                                                
                    svg.append("g")
                        .attr("class","labels")
                        .attr("transform", "translate(" + margin.l + "," + margin.t + ")")
                        .selectAll("rect")
                        .data(getRanges(td))
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .style("fill", function (d, i) {
                            return color[i];
                        })
                        .attr("width", function (d, i) {
                            return x(d[1]);
                        })
                        .attr("height", yScale.rangeBand())
                        .attr("transform", function (d) {
                            console.log(yScale(td.id));
                            return "translate(" + x(d[0]) + "," + yScale(td.id) + ")";
                        });
                });
                var legends = [{"title": "Executed", "color": "rgba(225,128,0,1)"}, {"title": "Placed", "color": "rgba(225,128,0,0.5)"}, {"title": "Total", "color": "rgba(225,128,0,0.3)"}];
                var legend = svg.selectAll(".legend")
                    .data(legends.slice().reverse())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(" + (-margin.l - margin.r) + "," + i * 20 + ")"; // Vertical
                    });

                legend.append("rect")
                    .attr("x", width)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", function (d) {
                        return d.color;
                    });

                legend.append("text")
                    .attr("x", width + 20)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d.title;
                    });
            }

            scope.$watch(function(scope){
                return scope.$parent.vo.orders;
            },drawChart, true);


        }
    }

})();