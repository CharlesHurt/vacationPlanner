'use strict';

var vacationApp = angular.module('vacationApp', ['ui.router']);

vacationApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('maintenanceState', {
  	url:'/maintenanceState',
  	templateUrl:"htmlPartials/listView.html",
    controller: "vacationController"
  })
  .state('detailsState', {
    url:'/detailsState',
    templateUrl:"htmlPartials/detailsView.html",
    controller: 'detailsController'
  })

  $urlRouterProvider.otherwise('/')
})

vacationApp.service("sharingService", function() {
  this.init = function() {
    //this.vacations = arguments[0]
  }
})

vacationApp.controller('detailsController', function($scope, $http, $state, $rootScope) {



})

vacationApp.controller('appController', function($scope, $http, $state, $rootScope) {
  $scope.changeState = function() {
    $state.go(arguments[0])
  }
})

vacationApp.controller('vacationController', function($scope, $http, $state, $rootScope) {
  $scope.notesVisible = false
  $scope.showNotes = function(vacation) {
    $scope.notesVisible = !$scope.notesVisible
  }

  $scope.showNotesToModify = function(note) {

  }

  $scope.removeNote  = function(note) {

  }

  $scope.doneWithNote  = function(note) {
    $scope.notesVisible = false
  }


  $scope.showAddVacation = false
  $scope.showEditVacation = false
  $scope.editingVacation = {}
  $scope.newVacation = {}

  $scope.showVacationToModify = (vacation) => {
    $scope.editForm.$setPristine()
    $scope.editForm.$setUntouched()

    $scope.editingVacation.destination = vacation.destination
    $scope.editingVacation.city = vacation.city
    $scope.editingVacation.state = vacation.state
    $scope.editingVacation.zip = vacation.zip
    $scope.editingVacation.country = vacation.country
    $scope.editingVacation.id = vacation.id

    $scope.showEditVacation = true
  }

  $scope.addVacationCancel = function() {
    $scope.newVacation.destination = ''
    $scope.newVacation.city = ''
    $scope.newVacation.state = ''
    $scope.newVacation.zip = ''
    $scope.newVacation.country = ''
    $scope.showAddVacation = false
  }

  $scope.showAddVacationView = () => {
    $scope.addForm.$setPristine()
    $scope.addForm.$setUntouched()
    $scope.addVacation.destination = ''
    $scope.addVacation.city = ''
    $scope.addVacation.state = ''
    $scope.addVacation.zip = ''
    $scope.addVacation.country = ''

    $scope.showAddVacation = true
    $scope.showEditVacation = false
  }

  $scope.updateVacationCancel = function() {
    $scope.editingVacation = {}
    $scope.showEditVacation = false
  }

  $scope.addVacation = function() {

      console.log("&***** error w/ZIP", $scope.newVacation.zip)


    if ($scope.newVacation.country ==='  ') {
      console.log();
    }
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
/*add form validation
destination 2chars min
zip is a 5 digit # or nothing*/
  $scope.updateVacationDone = function(vacation) {
    $scope.editingVacation.destination = vacation.destination
    $scope.editingVacation.city = vacation.city
    $scope.editingVacation.state = vacation.state
    $scope.editingVacation.zip = vacation.zip
    $scope.editingVacation.country = vacation.country

    $http({
      method: "PUT",
      url: "/vacations/" + vacation.id,
      data:  $scope.editingVacation // TODO change this to vacation
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

  $scope.deleteVacation = function(vacation) {
    console.log('vaca id:', vacation.id);
     $http({
      method: "DELETE",
      url: "/vacations" + '/' + vacation.id
    }).then(function(res) {
      var toDelete
      for (var i in $scope.vacations) {
        if ($scope.vacations[i].id === vacation.id) {
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
    console.log($scope.newVacation , ' is new vacation')
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
