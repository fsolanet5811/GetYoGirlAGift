
var getYoGirlAGiftApp = angular.module('GetYoGirlAGiftApp', ['ui.router']);


getYoGirlAGiftApp.config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            //$locationProvider.hashPrefix('/#/');
            $locationProvider.html5Mode(false);


            $stateProvider

                .state("login", {
                    url: '/login',
                    controller: 'LoginController',
                    // template: "<h2>caca</h2>",
                    templateUrl: '/Angular/Views/Login.html',
                    controllerAs: 'loginCtrl',
                    //resolve: {
                    //    GetUser: [function ($rootScope)
                    //    {
                    //        return $rootScope.user;
                    //    }
                    //]}
                })

                .state("signup", {
                    url: '/signup',
                    controller: 'SignupController',
                    // template: "<h2>caca</h2>",
                    templateUrl: '/Angular/Views/Signup.html',
                    controllerAs: 'signupCtrl',
                    //resolve: {
                    //    GetUser: [function ($rootScope)
                    //    {
                    //        return $rootScope.user;
                    //    }
                    //]}
                })

                .state("home", {
                    url: "/home",
                    controller: 'HomeController',
                    //template: "<h2>caca</h2>",
                    templateUrl: '/Angular/Views/home.html',
                    controllerAs: 'homeCtrl',
                    params: {
                        response: null
                    },
                    //resolve: { authenticate: authenticate}
                    resolve: {
                        authorize: ['$window', '$rootScope', '$location', '$q', function ($window, $rootScope, $location, $q) {
                            var deferred = $q.defer();
                            if ($rootScope.user) {
                               return deferred.resolve({});   
                            }
                            $window.location.href = '/#!/Login';
                            deferred.reject();
                            return deferred.promise;
                        }]
                    }
                })

                .state("addEditGirl", {
                    url: "/edit",
                    controller: 'AddEditGirlController',
                    //template: "<h2>caca</h2>",
                    templateUrl: '/Angular/Views/AddEditGirl.html',
                    controllerAs: 'addEditGirlCtrl',
                    params: {
                        selectedGirl: null
                    },
                    //resolve: { authenticate: authenticate}
                    resolve: {
                        authorize: ['$window', '$rootScope', '$location', '$q', function ($window, $rootScope, $location, $q) {
                            var deferred = $q.defer();
                            if ($rootScope.user) {
                               return deferred.resolve({});   
                            }
                            $window.location.href = '/#!/Login';
                            deferred.reject();
                            return deferred.promise;
                        }]
                    }
                })

                .state("search", {
                    url: "/search",
                    controller: 'SearchController',
                    //template: "<h2>caca</h2>",
                    templateUrl: '/Angular/Views/Search.html',
                    controllerAs: 'searchCtrl',
                    params: {
                        selectedGirl: null
                    },
                    //resolve: { authenticate: authenticate}
                    resolve: {
                        authorize: ['$window', '$rootScope', '$location', '$q', function ($window, $rootScope, $location, $q) {
                            var deferred = $q.defer();
                            if ($rootScope.user) {
                               return deferred.resolve({});   
                            }
                            $window.location.href = '/#!/Login';
                            deferred.reject();
                            return deferred.promise;
                        }]
                    }
                })


            $urlRouterProvider.otherwise('login');



            //$stateProvider.state('home', {
            //    url: '/',
            //    controller: 'HomeController',
            //    templateUrl: '/Angular/views/home.html',
            //    params: {
            //        request: null
            //    }
            //})

            //$stateProvider.state('home2', {
            //    url: '',
            //    controller: 'HomeController',
            //    templateUrl: '/Angular/Views/home.html',
            //    params: {
            //        response: null
            //    },
            //    //resolve: { authenticate: authenticate}
            //    resolve: {
            //        authorize: ['$window', '$rootScope', '$location', '$q', function ($window, $rootScope, $location, $q) {
            //            var deferred = $q.defer();
            //            if ($rootScope.user) {
            //                if ($rootScope.user.IsAuthenticated) {
            //                    return deferred.resolve({});
            //                }
            //            }
            //            $window.location.href = '/#!/login';
            //            deferred.reject();
            //            return deferred.promise;
            //        }]
            //    }
            //})


            //$stateProvider.state('addEditRequest', {
            //    url: '/addEditRequest',
            //    controller: 'RequestController',
            //    templateUrl: '/Angular/views/Request.html',
            //    params: {
            //        request: null
            //    }
            //})

            //$stateProvider.state('addEditBatch', {
            //    url: '/addEditBatch',
            //    controller: 'BatchController',
            //    templateUrl: '/Angular/views/Batch.html',
            //    params: {
            //        Batch: null,
            //        RequestID: null,
            //        Segmentation: null,
            //        JobNumber: null,
            //        JobTitle: null,
            //        CustomerName: null
            //    }
            //})


        }])


//QCApp.config( function ($stateProvider, $urlRouterProvider) 
//{
//	$stateProvider
//            .state("home", {
//                url: "/home",
//                controller: 'HomeController',
//                //template: "<h2>caca</h2>",
//                templateUrl: '/Scripts/angular/views/home.html',
//                controllerAs: 'homeCtrl',
//                //resolve: { authenticate: authenticate}
//                resolve: {
//                    authorize: ['$window', '$rootScope', '$location', '$q', function ($window, $rootScope, $location, $q) {
//                        var deferred = $q.defer();
//                        if ($rootScope.user)
//                        {
//                            if ($rootScope.user.IsAuthenticated) {
//                                return deferred.resolve({});
//                            }
//                        }
//                        $window.location.href = '/#!/login';
//                        deferred.reject();
//                        return deferred.promise;
//                    }]
//                }
//            })

//            .state("login", {
//				url:'/login',
//                controller: 'LoginController',
//				// template: "<h2>caca</h2>",
//                templateUrl: '/Scripts/angular/views/Login.html',
//                controllerAs: 'loginCtrl'
//            })


//    $stateProvider.state('employees', {
//        url: '/employees',
//        controller: 'EmployeesController',
//        templateUrl: '/Scripts/angular/views/ManageEmployees.html',
//        params: {
//            area: null
//        }
//    })


//    $urlRouterProvider.otherwise('/login');


//})


;

