var appControllers = angular.module('controllers', []);

appControllers.controller('loginController', function($scope, $http, $rootScope, $window) {
    $scope.register = function() {
           $window.location.href = '/#/newUser';
        }

    $scope.login = function() {
       var email = $( "#emailField" ).val();
       var password = $( "#passwordField" ).val();
       $http({
           method: 'POST',
           url: $rootScope.url+'/authenticate',
           data: { "email": email, "pass": password }
       }).then(function successCallback(response) {
                     if(response.data != "")
                     {
                        $rootScope.user = response.data;
                        $window.location.href = '/#/home';
                     }else
                     {
                        $("#wrongPassword").show();
                        setTimeout(function(){ $("#wrongPassword").hide(); }, 3000);
                     }
                   }, function errorCallback(response) {
                        if($rootScope.user != null)
                             alert("Problemos su interneto ryšiu");
                   });
    }

});

appControllers.controller('homeController', function($scope, $http, $rootScope, $window) {
   $scope.logOff = function(){
           $http({
              method: 'POST',
              url: $rootScope.url+'/signOut',
              data: { "user":$rootScope.user}
                 }).then(function successCallback(response) {
                        if(response.data != "")
                        {
                           $rootScope.user = null;
                           $window.location.href = '/#/';
                        }else
                        {
                           $rootScope.user = null;
                           $window.location.href = '/#/';
                        }
                      }, function errorCallback(response) {
                           $rootScope.user = null;
                           $window.location.href = '/#/';
                    });
      }
   if($rootScope.user == null)
     $window.location.href = '/#/';
    $scope.regi = function() {
        $window.location.href = '/#/overview';
     }
    $scope.cont = function() {
        $window.location.href = '/#/ContactUs';
  }
});

function isValidPhonenumber(value) {
    return (/^\d{7,}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
}

function isValidDate(value){
    var patt = new RegExp(/^(\d{4})-(\d{2})-(\d{2})/);
    return patt.test(value);
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]); // padding
  };

appControllers.controller('newRegistrationController', function($scope, $http, $rootScope, $window) {
    if($rootScope.user == null)
            $window.location.href = '/';
    $scope.home = function(){
                $window.location.href = '/#/home';
           };

           $scope.logOff = function(){
                $http({
                   method: 'POST',
                   url: $rootScope.url+'/signOut',
                   data: { "user":$rootScope.user}
                      }).then(function successCallback(response) {
                             if(response.data != "")
                             {
                                $rootScope.user = null;
                                $window.location.href = '/#/';
                             }else
                             {
                                $rootScope.user = null;
                                $window.location.href = '/#/';
                             }
                           }, function errorCallback(response) {
                                $rootScope.user = null;
                                $window.location.href = '/#/';
                         });
           }

    $scope.times = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
    $http({
         method: 'POST',
         url: $rootScope.url+'/getDataForRegistration',
         data: {"user" : $rootScope.user}
         }).then(function successCallback(response) {
              if(response.data != "")
              {
                    $scope.data = response.data;
                    $scope.possibleDates = new Array();
                    for(var i = 0; i < $scope.data.length; i++)
                    {
                        $scope.possibleDates.push($scope.data[i].date);
                    }
                    $('#dateField').datepicker({
                        dateFormat: "yyyy-mm-dd",
                        beforeShowDay: function(date){
                            dmy = date.yyyymmdd();
                              if ($.inArray(dmy, $scope.possibleDates) != -1) {
                                return [true, "","Available"];
                              } else {
                                return [false,"","unAvailable"];
                              }
                        },
                        onSelect: function (date) {
                            date = date.toString().substring(4, date.length);
                            for(var i = 0; i < $scope.possibleDates.length; i++)
                            {
                                if($scope.possibleDates[i] == date){
                                    $scope.times = $scope.data[i].times;
                                    $scope.$apply();
                                    break;
                                }
                            }
                            $('#dateField').val(date);
                        }
                    });
              }
              else
              {
                 alert("Serverio problema");
              }
              }, function errorCallback(response) {
                 if($rootScope.user != null)
                      alert("Problemos su interneto ryšiu");
              });

    $scope.register = function() {
           var name = $( "#nameField" ).val();
           var surname = $( "#surnameField" ).val();
           var phone = $( "#phoneField" ).val();
           var email = $( "#emailField" ).val();
           var unit =  $("#unitSelect").val();
           var date = $("#dateField").val();
           var time = $("#timeField").val();
           var topic = $("#topicSelect").val();
           var comment = $("#commentField").val();


           if(name.length == 0){
               $("#nameField").css("background-color","#FFB0B0");
               setTimeout(function(){ $("#nameField").css("background-color","#FFFFFF")}, 3000);
               //setTimeout(function(){ }, 3000);
               return;
               }
           else //reik kazkaip sugalvot kaip padaryt kad

           if(surname.length == 0){
                              $("#surnameField").css("background-color","#FFB0B0");
                              setTimeout(function(){ $("#surnameField").css("background-color","#FFFFFF")}, 3000);
                              //setTimeout(function(){ }, 3000);
                              return;
                              }
                      else //reik kazkaip sugalvot kaip padaryt kad kai jau iraso border line pavirsta paprasta pilka

//~~~~~~~~~~~~~~~~PAGAL KA DAR TIKRINT?
           if(!isValidPhonenumber(phone)){
                $("#phoneField").css("background-color","#FFB0B0")
                setTimeout(function(){ $("#phoneField").css("background-color","#FFFFFF")}, 3000);
                return;
           }


           if(unit == "Nepasirinkta"){
              $("#unitSelect").css("background-color","#FFB0B0");
              setTimeout(function(){ $("#unitSelect").css("background-color","#FFFFFF")}, 3000);
              // setTimeout(function(){ $("#topicSelect").css("border-color", "#C0C0C0")}, 3000);
              return;
           }

//~~~~~~~~~~~~~~NEZINAU KOKIA DEFAULTINE REIKSME
           if(!isValidDate(date)){
                $("#dateField").css("background-color","#FFB0B0")
                setTimeout(function(){ $("#dateField").css("background-color","#FFFFFF")}, 3000);
                return;
           }

           if(!isEmail(email) || email.length == 0  ){
               $("#emailField").css("background-color","#FFB0B0");
               setTimeout(function(){ $("#emailField").css("background-color","#FFFFFF")}, 3000);
               //setTimeout(function(){ }, 3000);
               return;
          }

           if(topic == "Nepasirinkta"){
                           $("#topicSelect").css("background-color","#FFB0B0");
                           setTimeout(function(){ $("#topicSelect").css("background-color","#FFFFFF")}, 3000);
                          // setTimeout(function(){ $("#topicSelect").css("border-color", "#C0C0C0")}, 3000);
                           return;
                      }




            $rootScope.regData = { "name":name, "lastName": surname, "phoneNumber":phone, "email": email, "unit":unit, "date": date,
            "time" : time, "topic": topic, "comment": comment, "user": $rootScope.user }
           $http({
               method: 'POST',
               url: $rootScope.url+'/createRegistration',
               data: $rootScope.regData
           }).then(function successCallback(response) {
                         if(response.data != null)
                         {
                            $window.location.href = '/#/registrationConfirm';  //siaip turetu eit i registration confirmation
                         }else
                         {
                            alert("Jūsų pasirinktą laiką spėjo užimti");
                         }
                       }, function errorCallback(response) {
                            if($rootScope.user != null)
                                alert("Problemos su interneto ryšiu");
                       });
    }
    $scope.cancel = function() {
           $window.location.href = '/#/overview';
    }
});

appControllers.controller('ContactUsController', function($scope, $http, $rootScope, $window) {
       if($rootScope.user == null)
              $window.location.href = '/#/';

       $scope.home = function(){
            $window.location.href = '/#/home';
       };

       $scope.logOff = function(){
            $http({
               method: 'POST',
               url: $rootScope.url+'/signOut',
               data: { "user":$rootScope.user}
                  }).then(function successCallback(response) {
                         if(response.data != "")
                         {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                         }else
                         {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                         }
                       }, function errorCallback(response) {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                     });
       }

       $scope.contact = function() {
               var topic = $("#topicSelect").val();
               var message = $("#messageField").val();
               var name = $( "#nameField" ).val();
               var lastName = $( "#lastnameField" ).val();
               var phone = $( "#phoneField" ).val();
               var email = $( "#emailField" ).val();
               var radio1 = $("responcephone").val();
               var radio2 = $("responceemail").val();
               var radio3 = $("responceboth").val();
               var radio;

//~`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~REIK PATIKRINT SITUOS
           if(topic == "Nepasirinkta"){
                $("#topicSelect").css("background-color","#FFB0B0");
                setTimeout(function(){ $("#topicSelect").css("background-color","#FFFFFF")}, 3000);
               // setTimeout(function(){ $("#topicSelect").css("border-color", "#C0C0C0")}, 3000);
                return;
           }


           if(message.length == 0){
                $("#messageField").css("background-color","#FFB0B0");
                setTimeout(function(){ $("#messageField").css("background-color","#FFFFFF")}, 3000);
                //setTimeout(function(){ }, 3000);
                return;
           }

           if(name.length == 0){
                $("#nameField").css("background-color","#FFB0B0");
                setTimeout(function(){ $("#nameField").css("background-color","#FFFFFF")}, 3000);
                //setTimeout(function(){ }, 3000);
                return;
           }

           if(lastName.length == 0){
                   $("#lastnameField").css("background-color","#FFB0B0");
                   setTimeout(function(){ $("#lastnameField").css("background-color","#FFFFFF")}, 3000);
                   //setTimeout(function(){ }, 3000);
                   return;
                   }
//~~~~~~~~~~~~~~~~PAGAL KA DAR TIKRINT? ///reik patikslint-----------------------
           if(!isValidPhonenumber(phone)){
                $("#phoneField").css("background-color","#FFB0B0");
                setTimeout(function(){ $("#phoneField").css("background-color","#FFFFFF")}, 3000);
                return;
           }

//~~~~~~~~~~~~~~~~~PAGAL KA DAR TIKRINT?
           if(!isEmail(email) || email.length == 0  ){
                $("#emailField").css("background-color","#FFB0B0");
                setTimeout(function(){ $("#emailField").css("background-color","#FFFFFF")}, 3000);
                //setTimeout(function(){ }, 3000);
                return;
           }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


               if(radio1 != null)
                radio = radio1;
               else if(radio2 != null)
                radio = radio2;
               else
                radio = radio3;

               $http({
                   method: 'POST',
                   url: $rootScope.url+'/createContactUs',
                   data: { "topic":topic, "message":message, "name":name, "lastName": lastName,
                   "phone":phone, "email": email, "radio":radio, "user": $rootScope.user}
                                  }).then(function successCallback(response) {
                             if(response.data != "")
                             {
                                $window.location.href = '/#/confirmation';
                             }else
                             {
                                alert("Įvyko klaida");
                             }
                           }, function errorCallback(response) {
                                if($rootScope.user != null)
                                    alert("Problemos su interneto ryšiu");
                         });

               };

       $scope.cancel = function() {
           $window.location.href = '/#/home';
       }
});

appControllers.controller('confirmationController', function($scope, $http, $rootScope, $window) {
    if($rootScope.user == null)
        $window.location.href = '/#/';
    $scope.conf = function() {
        $window.location.href = '/#/home';
  }
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

appControllers.controller('newUserController', function($scope, $http, $rootScope, $window) {
    $("#emailField").keypress(function() {
        if($( "#emailField" ).val().length > 50){
            $("#emailField").css("background-color","#FFB0B0")
            setTimeout(function(){ $("#emailField").css("background-color","#FFFFFF")}, 3000);
        }else{
            $("#emailField").css("background-color","#FFFFFF")
        }
    });

    $("#passwordField").keypress(function() {
            if($( "#passwordField" ).val().length > 20){
                $("#passwordField").css("background-color","#FFB0B0")
                  setTimeout(function(){ $("#passwordField").css("background-color","#FFFFFF")}, 3000);
            }else{
                $("#passwordField").css("background-color","#FFFFFF")
            }
          })

    $scope.ureg = function() {
           var email = $( "#emailField" ).val();
           var password = $( "#passwordField" ).val();
           if(!isEmail(email) || email > 50){
                $("#emailField").css("background-color","#FFB0B0")
                setTimeout(function(){ $("#emailField").css("background-color","#FFFFFF")}, 3000);
                return;
           }
           if(password.length > 20 || password.length < 8){
                $("#passwordField").css("background-color","#FFB0B0")
                setTimeout(function(){ $("#passwordField").css("background-color","#FFFFFF")}, 3000);
                return;
           }
           if($( "#repeatpasswordField" ).val() != password){
                $("#repeatpasswordField").css("background-color","#FFB0B0")
                setTimeout(function(){ $("#repeatpasswordField").css("background-color","#FFFFFF")}, 3000);
                return;
           }
           $http({
               method: 'POST',
               url: $rootScope.url+'/createUser',
               data: { "email": email, "pass": password}
           }).then(function successCallback(response) {
                         if(response.data != "")
                         {
                            $rootScope.user = response.data;
                            $window.location.href = '/#/home';
                         }else
                         {
                            alert("Jau egzistuoja toks vartotojas");
                         }
                       }, function errorCallback(response) {
                            if($rootScope.user != null)
                                 alert("Problemos su interneto ryšiu");
                       });
        }

$scope.cancel = function() {
        $window.location.href = '/#/';
        }
});

appControllers.controller('overviewController', function($scope, $http, $rootScope, $window) {
        if($rootScope.user == null)
                $window.location.href = '/';
        $scope.home = function(){
                    $window.location.href = '/#/home';
               };

       $scope.logOff = function(){
            $http({
               method: 'POST',
               url: $rootScope.url+'/signOut',
               data: { "user":$rootScope.user}
                  }).then(function successCallback(response) {
                         if(response.data != "")
                         {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                         }else
                         {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                         }
                       }, function errorCallback(response) {
                            $rootScope.user = null;
                            $window.location.href = '/#/';
                     });
       }
        $http({
         method: 'POST',
         url: $rootScope.url+'/getRegistrations',
         data: {"user": $rootScope.user}
         }).then(function successCallback(response) {
              if(response.data != "")
              {
                    $scope.products = response.data;
                    $rootScope.products = response.data;
              }
              else
              {
                $scope.products = new Array();
                 //alert("Registracijų neturite");
              }
              }, function errorCallback(response) {
                $scope.products = new Array();
                 if($rootScope.user != null)
                      alert("Problemos su interneto ryšiu");
              });

$scope.regi = function() {
        $window.location.href = '/#/newRegistration';
     }

$scope.regconf = function(date) {
        for(var i = 0; i < $rootScope.products.length; i++)
        {
            if($rootScope.products[i].date == date)
                $rootScope.products = $rootScope.products[i];
        }
        $window.location.href = '/#/registrationConfirm';
      }

$scope.cancel = function(date) {
         var r = confirm("Ar tikrai norite ištrinti šią reigstraciją? Data: "+date);
         if(!r)
             return;
         $http({
          method: 'POST',
          url: $rootScope.url+'/deleteRegistration',
          data: {"user": $rootScope.user, "date": date}
          }).then(function successCallback(response) {
               if(response.data != "")
               {
                    $http({
                             method: 'POST',
                             url: $rootScope.url+'/getRegistrations',
                             data: {"user": $rootScope.user}
                             }).then(function successCallback(response) {
                                  if(response.data != "")
                                  {
                                      $window.location.href = "/#/refreshOverview";
                                  }
                                  else
                                  {
                                     $window.location.href = "/#/refreshOverview";
                                  }
                                  }, function errorCallback(response) {
                                     if($rootScope.user != null)
                                         alert("Problemos su interneto ryšiu");
                                  });
               }
               else
               {
                    $http({
                             method: 'POST',
                             url: $rootScope.url+'/getRegistrations',
                             data: {"user": $rootScope.user}
                             }).then(function successCallback(response) {
                                  if(response.data != "")
                                  {
                                   $scope.products = response.data;
                                  }
                                  else
                                  {
                                     alert("Registracijų neturite");
                                  }
                                  }, function errorCallback(response) {
                                     alert("Problemos su interneto ryšiu");
                                  });
                        }
               }, function errorCallback(response) {
                  alert("Nepavyko ištrinti registracijos");
               });
     }
});

appControllers.controller('registrationConfirmController', function($scope, $http, $rootScope, $window) {
if($rootScope.user == null)
   $window.location.href = '/#/';
if($rootScope.regData == null || $rootScope.regData.date == "undefined")
{
    $rootScope.regData = { "name":$rootScope.products.name, "lastName": $rootScope.products.surname,
     "phoneNumber":$rootScope.products.phoneNumber, "email": $rootScope.products.email,
      "unit":$rootScope.products.banksection, "date": $rootScope.products.date,
     "topic": $rootScope.products.topic,
      "comment": $rootScope.products.comments };
}
document.getElementById("nameField").innerHTML = $rootScope.regData.name; //"Vardenis";
document.getElementById("surnameField").innerHTML = $rootScope.regData.lastName; //"Pavardenis";
document.getElementById("phoneField").innerHTML = $rootScope.regData.phoneNumber; //"+370 12345678";
document.getElementById("emailField").innerHTML = $rootScope.regData.email; //"pavardenis@gmail.com";
document.getElementById("unitSelect").innerHTML = $rootScope.regData.unit; //"ozo g. 25(PPC Akropolis)";
document.getElementById("dateField").innerHTML = $rootScope.regData.date; //"2016-03-19";
document.getElementById("topicSelect").innerHTML = $rootScope.regData.topic; //"PAskolos, lizingas";
document.getElementById("commentField").innerHTML = $rootScope.regData.comment; //"Paskolos suteikimas užsienyje studijuojnčiam studentui";

$scope.cancel = function() {
        $rootScope.regData == null
        $window.location.href = '/#/overview';
}
});