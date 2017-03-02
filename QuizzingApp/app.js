angular.module('QuizApp', [])

.controller('quizController', ['$scope', '$http', 'LocalStorageService', function($scope, $http, LocalStorageService) {
    var qc = this;
    
    $http.get("questions.json")
    .then(function(response){
        qc.qb = [
            {
                name: "Ronald",
                lname: "Regalado"
            },
            {
                name:"a",
                lname:"b"
            }
            
            ];
        qc.questionBank = response.data;
        qc.text1 = qc.questionBank.question1.text;
        qc.q1w1 = qc.questionBank.question1.wrong1;
        qc.q1w2 = qc.questionBank.question1.wrong2;
        qc.q1a = qc.questionBank.question1.answer;
        qc.q1w3 = qc.questionBank.question1.wrong3;
        
        qc.text2 = qc.questionBank.question2.text;
        qc.q2w1 = qc.questionBank.question2.wrong1;
        qc.q2a = qc.questionBank.question2.answer;
        qc.q2w2 = qc.questionBank.question2.wrong2;
        qc.q2w3 = qc.questionBank.question2.wrong3;
        
        qc.text3 = qc.questionBank.question3.text;
        qc.q3w1 = qc.questionBank.question3.wrong1;
        qc.q3w2 = qc.questionBank.question3.wrong2;
        qc.q3w3 = qc.questionBank.question3.wrong3;
        qc.q3a = qc.questionBank.question3.answer;
        
        console.log(qc.questionBank);
        console.log(qc.qb);
    });
    
    

    LocalStorageService.setData('my-storage', qc.questionBank);
    // qc.quiz1 = LocalStorageService.getData('my-storage');
    // qc.number = Math.floor((Math.random() * qc.questionBank.length - 1) + 1);
    // qc.question = qc.quiz1[qc.number];
    //console.log(qc.questionBank.text);

}])

.factory("LocalStorageService", function($window, $rootScope) {

    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });

    return {
        setData: function(key, val) {

            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {

            var val = $window.localStorage && $window.localStorage.getItem(key);

            var data = angular.fromJson(val);

            return data;
        }
    };
});
