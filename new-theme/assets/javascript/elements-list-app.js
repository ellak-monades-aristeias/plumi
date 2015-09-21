(function() {

    var elApp = angular.module('elements_list_app', ['ngRoute', 'ngAnimate', 'chart.js', 'countTo']);

    Chart.defaults.global.colours[0] = '#ea7d3b';
    Chart.defaults.global.colours[1] = '#72ac4d';
    Chart.defaults.Pie.animationSteps = ('ontouchstart' in document) ? 1 : 30;
    Chart.defaults.Pie.animationEasing = 'easeInOut';

    elApp.directive('elementsList', [function() {
        return {
            templateUrl: 'contents/elements-list.html'
        };
    }]);

    elApp.directive('metricsInfo', [function() {
        return {
            templateUrl: 'contents/metrics-info.html'
        };
    }]);

    elApp.directive('buildInfo', [function() {
        return {
            templateUrl: 'contents/build-info.html'
        };
    }]);

    elApp.directive('ftestInfo', [function() {
        return {
            templateUrl: 'contents/ftest-info.html'
        };
    }]);

    elApp.directive('utestInfo', [function() {
        return {
            templateUrl: 'contents/utest-info.html'
        };
    }]);

    elApp.directive('pendingProcess', [function() {
        return {
            templateUrl: 'contents/pending-process.html'
        };
    }]);

    elApp.directive('runningProcess', [function() {
        return {
            templateUrl: 'contents/running-process.html'
        };
    }]);

    elApp.directive('metricsResults', [function() {
        return {
            templateUrl: 'contents/metrics-results.html'
        };
    }]);

    elApp.controller('ElementsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

        this.elements = {};
        $scope.elements_list = {};

        var that = this;

        $http.get('db/elements-list.json').success(function(data) {

            var i;
            that.elements = data[0];
            $scope.elements_list = that.elements;
            $scope.active_list_elem = false;

            for (i in that.elements) {

                $scope.elements_list[i].html_classes = that.getElemClasses(that.elements[i]);
                $scope.elements_list[i].state_string = that.getElemStateStr(that.elements[i].state);

                $scope.elements_list[i].metrics.html_classes = that.getElemProcessClasses(that.elements[i].metrics.completed_pc, that.elements[i].metrics.state);
                $scope.elements_list[i].metrics.html_styles = that.getElemProcessStyles(that.elements[i].metrics.completed_pc);

                $scope.elements_list[i].build.html_classes = that.getElemProcessClasses(that.elements[i].build.completed_pc, that.elements[i].build.state);
                $scope.elements_list[i].build.html_styles = that.getElemProcessStyles(that.elements[i].build.completed_pc);

                $scope.elements_list[i].unit_test.html_classes = that.getElemProcessClasses(that.elements[i].unit_test.completed_pc, that.elements[i].unit_test.state);
                $scope.elements_list[i].unit_test.html_styles = that.getElemProcessStyles(that.elements[i].unit_test.completed_pc);

                $scope.elements_list[i].functional_test.html_classes = that.getElemProcessClasses(that.elements[i].functional_test.completed_pc, that.elements[i].functional_test.state);
                $scope.elements_list[i].functional_test.html_styles = that.getElemProcessStyles(that.elements[i].functional_test.completed_pc);

                $scope.elements_list[i].functional_test.passed_tests_pc = Math.round((that.elements[i].functional_test.tests_passed * 100) / that.elements[i].functional_test.tests_num);
                $scope.elements_list[i].functional_test.code_covered_pc = 100 - that.elements[i].unit_test.code_covered_pc;
                $scope.elements_list[i].functional_test.tests_failed = that.elements[i].functional_test.tests_num - that.elements[i].functional_test.tests_passed;

                $scope.elements_list[i].unit_test.passed_tests_pc = Math.round((that.elements[i].unit_test.tests_passed * 100) / that.elements[i].unit_test.tests_num);
                $scope.elements_list[i].unit_test.tests_failed = that.elements[i].unit_test.tests_num - that.elements[i].unit_test.tests_passed;

                $scope.elements_list[i].result.notice = that.getResultNotice(that.elements[i].state);
                $scope.elements_list[i].result.html_classes = that.getResultClass(that.elements[i].state);
            }
        });

        this.getElemClasses = function(e) {
            var r,
                valid_type = e.type === 'build' || e.type === 'firewall' ? true : false;

            if (valid_type) {

                r = e.type === 'build' ? 'build' : 'firewall';

                switch (e.state) {
                    case 'running':
                        r += ' running';
                        break;
                    case 'pending':
                        r += ' pending';
                        break;
                    case 'rejected':
                        r += ' fail';
                        break;
                    case 'completed':
                    case 'accepted':
                        r += ' success';
                        break;
                }
            }

            return r;
        };

        this.getElemStateStr = function(state) {
            var r;

            switch (state) {
                case 'accepted':
                    r = 'Accepted';
                    break;
                case 'completed':
                    r = 'Completed';
                    break;
                case 'rejected':
                    r = 'Rejected';
                    break;
                case 'pending':
                    r = 'Pending';
                    break;
                case 'running':
                    r = 'Running';
                    break;
            }

            return r;
        };

        this.getElemProcessClasses = function(completed_pc, process_state) {
            var r = '';

            switch (process_state) {
                case 'pending':
                    r = 'pending';
                    break;
                case 'running':
                    r = 'running';
                    break;
                case 'failed':
                    r = 'fail';
                    break;
                case 'succeed':
                    r = 'success';
                    break;
            }

            r = completed_pc >= 100 ? r + (r != '' ? ' ' : r) + 'complete' : r;

            return r;
        };

        this.getElemProcessStyles = function(completed_pc) {

            var r = '';

            if (completed_pc > 0 && completed_pc < 100) {
                r = 'width: ' + completed_pc + '%';
            }

            return r;
        };

        this.clickElem = function(i) {
            $scope.active_list_elem = $scope.active_list_elem !== i ? i : false;
        };

        this.isActiveElem = function(i) {

            return $scope.active_list_elem === i ? true : false;
        };

        this.displayProcessData = function(process_state) {
            return process_state !== 'running' && process_state != 'pending' ? true : false;
        };

        this.passedTestsClass = function(val) {

            var r;
            val = parseInt(val, 10);

            if (val > 85) {
                r = 'excellent';
            } else if (val > 70) {
                r = 'very-good';
            } else if (val > 65) {
                r = 'good';
            } else if (val > 50) {
                r = 'above-average';
            } else if (val > 35) {
                r = 'above-average';
            } else {
                r = 'bad';
            }

            return r;
        };

        this.getResultClass = function(state) {

            var r = '';

            switch (state) {
                case 'accepted':
                    r = 'accepted-yellow';
                    break;
                case 'rejected':
                    r = 'rejected-red';
                    break;
                case 'completed':
                    r = 'completed-green';
                    break;
            }

            return r;
        };

        this.getResultNotice = function(state) {

            var r = '';

            switch (state) {
                case 'accepted':
                    r = 'Change Accepted';
                    break;
                case 'rejected':
                    r = 'Change Rejected';
                    break;
            }

            return r;
        };

    }]);

})();
