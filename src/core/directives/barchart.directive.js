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
            scope: {
                val: '='
            }
        };
        return directive;

        /**** changes **/



        /** end **/

        function link (scope, element, attrs) {

            var margins = {top: 20, right: 150, bottom: 20, left: 70}, height = 600 - margins.top - margins.bottom, width = 1000 ;
            var svg = d3.select(element[0]).append("svg")
                .attr('width', width)
                .attr('height', height)
                //.attr("transform", "translate(0," + (margins.top) + ")");
                
            //Watching data
            scope.$watch('val', drawChart, true);

            function drawChart(n, o){
                if(!n || n === "undefined"){
                    console.log('Empty or undefined');
                    return false;
                }
                //Everything Going to happen here
                //Data Scaling
                var traderOrderNew = n, traderOrderOld = o, xMin = margins.left, xMax = width - margins.left - margins.right, yMin = height - margins.bottom - margins.top,
                    yMax = margins.bottom,

                    xRangeAxis = d3.scale.linear()
                                .range([xMin, width])
                                .domain([0, 1]),

                    xRange = d3.scale.linear()
                                .range([xMin, width])
                                .domain([margins.left, d3.max(traderOrderNew, function(d){ return d.quantity})]),
                    /*
                        d3.scale.ordinal()
                                .rangeRoundbands([heightOFSVGstart, 0])
                                .domain(arrayOFDatawithID - [4, 5, 6, 7]);
                        In this way id is mapped with rangeRoundBand
                    */
                    yRange = d3.scale.ordinal()
                                .rangeRoundBands([margins.top, height - margins.bottom], 0.1)
                                .domain(traderOrderNew.map(function(d){ return d.id})),

                    xAxis = d3.svg.axis()
                                .scale(xRangeAxis)
                                .orient('top')
                                //.tickFormat(d3.format(".0%"))
                                .ticks(3, "%"),

                    yAxis = d3.svg.axis()
                                .scale(yRange)
                                .orient('left')
                                .ticks(5);

                //Appending Axis in SVG
                //x-axis
                svg.append('svg:g')
                    .attr('class', 'x-axis')
                    .attr('transform', 'translate(0 , '+  margins.top +')')
                    .call(xAxis);

                //y-axis
                svg.append('svg:g')
                    .attr('class', 'y-axis')
                    .attr('transform', 'translate( '+ margins.left +' , 0)')
                    .call(yAxis);
                
                var bar = svg.selectAll('rect')
                    .data(traderOrderNew)
                    .enter()
                    .append('g')
                    .attr({
                        'transform' : function(d, i){return 'translate( '+ (margins.left) +' , '+ (margins.top + i* ((height - margins.top - margins.bottom) / traderOrderNew.length)) +')'}
                    });

                    bar.append('rect')
                        .attr({
                            'width' : function(d){ return xRange(d.quantity);},
                            'height' : yRange.rangeBand()                            
                        });


                //Loop for traderOrderNew
                traderOrderNew.forEach(eachLoop);

                function eachLoop(data, i){
                    
                    console.log(data);
                }


            }
/*
            var drawChart =  function (n, o) {
                if(!n || typeof (n[0]) === "undefined") {
                   return;
                }
                console.log(n);
                
                /*
                var width = parseInt(d3.select("svg").style("width").replace("px",""));
                var w = width - margin.l - margin.r;
                var h = height - margin.t - margin.b;

                var y = d3.scale.linear().range([h - margin.t - margin.b, 0]);
                var x = d3.scale.linear().range([0, w - margin.r - margin.l]);

                var color = ["#6b486b", "#827A98", "#98abc5"];
                var getRanges = function (d) {
                    var e, p;
                    e = ((d.quantityExecuted / d.quantity)).toFixed(4);
                    p = ((d.quantityPlaced / d.quantity)).toFixed(4);
                    //console.log([[0, e], [e, (p - e).toFixed(4)], [p, 1 - p]]);
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
                    return d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(5);
                }
                // Draw the x Grid lines
                // function for the x grid lines
                //console.log( n);
                var yCount = n.length;
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("top")
                    .tickSubdivide(true)
                    .tickFormat(d3.format(".0%"))
                    .ticks(3);
                var y_domain = [yCount, 0];
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .ticks(0)
                    .tickSubdivide(true)
                    .orient("left");
                y.domain(y_domain);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                    .call(xAxis);
                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                    .call(yAxis);
                // Draw Y axis labels
                n.forEach(function (td, j) {
                    console.log(td);
                    console.log(j);
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
                    svg.append("g")
                        .attr("class","labels")
                        .append("text")
                        .text(td.id)
                        .attr("transform", "translate(" + (margin.l - 20) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");
                        // Put Total quantity on the right of bar
                    svg.append("g")
                        .append("text")
                        .text(td.quantity)
                        .attr("transform", "translate(" + (w - margin.r + 10) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");
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
                        .attr("transform", "translate(" + margin.l + "," + (y(j) + margin.t - Math.floor((w / yCount) / 2)) + ")")
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
                        .attr("height", Math.floor((w / yCount) / 4))
                        .attr("transform", function (d) {
                            return "translate(" + x(d[0]) + "," + Math.floor((w / yCount) / 2) + ")";
                        });
                    });
                var legends = [{"title": "Executed", "color": "#6b486b"}, {"title": "Placed", "color": "#827A98"}, {"title": "Total", "color": "#98abc5"}];
                var legend = svg.selectAll(".legend")
                    .data(legends.slice().reverse())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
//                      return "translate(" + (-margin.l - margin.r - i * 100) + ",0)"; // Horizontal
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
                
            }*/
            //scope.$watch('val', drawChart, true);
        }
    }

})();