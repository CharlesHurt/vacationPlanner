'use strict';

var vacationApp = angular.module('vacationApp', ['ui.router']);

vacationApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('maintenanceState', {
  	url:'/maintenanceState',
  	templateUrl:"htmlPartials/listView.html",
    controller: "vacationController"
  })
  .state('practiceState', {
    url:'/practiceState',
    templateUrl:"htmlPartials/practiceView.html",
    controller: 'practiceController'
  })

  $urlRouterProvider.otherwise('/')
})

vacationApp.service("sharingService", function() {
  this.init = function() {
    //this.vacations = arguments[0]
  }
})

vacationApp.controller('practiceController', function($scope, $http, $state, $rootScope) {
  $scope.questionIndex = 0
  $scope.answerVisible = false

  $scope.showAnswer = function() {
    $scope.answerVisible = true
    $scope.questionHost = "This is a good question"
  }

  $scope.showNextQuestion = function() {
    $scope.questionHost = "bla"
    $scope.answerVisible = false
  }
})

vacationApp.controller('appController', function($scope, $http, $state, $rootScope) {
  $scope.changeState = function() {
    $state.go(arguments[0])
  }
})

vacationApp.controller('vacationController', function($scope, $http, $state, $rootScope) {
  $scope.showAddVacation = false
  $scope.showEditVacation = false
  $scope.editingVacation = {}
  $scope.newVacation = {}

  $scope.showVacationToModify = (fc) => {
    $scope.editingVacation.category = fc.category
    $scope.editingVacation.question = fc.question
    $scope.editingVacation.answer = fc.answer
    $scope.editingVacation.id = fc.id

    $scope.showEditVacation = true
  }

  $scope.addVacationCancel = function() {
    $scope.newVacation.category = ''
    $scope.newVacation.question = ''
    $scope.newVacation.answer = ''
    $scope.showAddVacation = false
  }

  $scope.showAddVacationView = () => {
    $scope.addVacation.category = ''
    $scope.addVacation.question = ''
    $scope.addVacation.answer = ''
    $scope.showAddVacation = true
    $scope.showEditVacation = false
  }

  $scope.updateVacationCancel = function() {
    $scope.editingVacation = {}
    $scope.showEditVacation = false
  }

  $scope.addVacation = function() {
    $http({
      method: "POST",
      url: "/vacations",
      data: $scope.newVacation
    }).then(function(res) {
        $scope.newVacation = {}
        $scope.showEditVacation = false
        $scope.showAddVacation = false
        $scope.getVacations()
    }, function(err) {
      console.log('error')
      $scope.vacations =  err.statusText
    })
  }

  $scope.updateVacationDone = function(fc) {
    $scope.editingVacation.category = fc.category
    $scope.editingVacation.question = fc.question
    $scope.editingVacation.answer = fc.answer
    $http({
      method: "PUT",
      url: "/vacations/" + fc.id,
      data:  $scope.editingVacation
    }).then(function(res) {
      //$scope.vacations = res.data
      $scope.getVacations()
      $scope.showAddVacation = false
    }, function(err) {
      console.log('error')
      $scope.vacations =  err.statusText
    })
    $scope.showEditVacation = false
  }

  $scope.deleteVacation = function(fc) {
     $http({
      method: "DELETE",
      url: "/vacations" + '/' + fc.id
    }).then(function(res) {
      var toDelete
      for (var i in $scope.vacations) {
        if ($scope.vacations[i].id === fc.id) {
          toDelete = i
        }
      }
      $scope.vacations.splice(toDelete, 1)
      $scope.showEditVacation = false
    }, function(err) {
      console.log('error')
      $scope.vacations =  err.statusText
    })
  }

  $scope.getVacations = function(sharingService) {
    $http({
      method: "GET",
      url: "/vacations"
    }).then(function(res) {
      $scope.vacations = res.data
    }, function(err) {
      $scope.vacations =  res.statusText
    })
  }
  $scope.getVacations() //initialize

  $scope.postVacation = function() {
    console.log($scope.newVacation , ' is new fc')
    $http({
      method: "POST",
      url: "/vacations",
      data: $scope.newVacation
    }).then(function(res) {
      $scope.vacations = res.data
      $showAddVacation = false
    }, function(err) {
      console.log('error')
      $scope.vacations =  err.statusText
    })
  }
});
