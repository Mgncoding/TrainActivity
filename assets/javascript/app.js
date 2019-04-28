$(document).ready(function() {
    function loop() {
        $('#train').css({right:0});
        $('#train').animate ({
            right: '+=1400',
        }, 5000, 'linear', function() {
            loop();
        });
    }
    loop();
});

var config = {
    apiKey: "AIzaSyCG3YuAXJnPbLeQxd3CJly5npSm3YOvmJw",
    authDomain: "trainhw-8f9a9.firebaseapp.com",
    databaseURL: "https://trainhw-8f9a9.firebaseio.com",
    projectId: "trainhw-8f9a9",
    storageBucket: "trainhw-8f9a9.appspot.com",
    messagingSenderId: "248965741057"
  };
  firebase.initializeApp(config);
//   create the database for firebase
var database = firebase.database()
//  values that need to be submitted
$('#submit').on("click", function(event){
    event.preventDefault()

    var trainName = $('#train-name').val().trim()
    var destination = $('#dest').val().trim()
    var firstTrain = $('#first-train').val().trim()
    var frequency = $('#freq').val().trim()
// pushing variables to database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        fristTrain: firstTrain,
        frequency: frequency,
    })
})

    database.ref().on("child_added", function(childSnapshot) {
        var sv = childSnapshot.val()
            trainName1 = sv.trainName
            destination1 = sv.destination
            firstTrain1 = sv.firstTrain
            frequency1 = sv.frequency
            // console logging each variable
            console.log(trainName1)
            console.log(destination1)
            console.log(firstTrain1)
            console.log(frequency1)

            // The assumption
            // tFrequency = 4

            // // Time is 04:00 am
            // firstTime = "04:30"

// This will be the first time. will subract 1 year to make sure it comes before current time
            startTime = moment(firstTrain1, "HH:mm").subtract(1, "years")
            console.log(startTime)
            // grabs current time
            currentTime = moment()
        // to pull difference in times
            diffTime = moment().diff(moment(startTime), "minutes")
            // This should calculate time apart, the remainder %
            theRemainder = diffTime % frequency1
            // This should help figure the minutes till the train
            theMinutesTime = frequency1 - theRemainder
            console.log(theMinutesTime)
            // Looking to create the next train
            nextTrain = moment().add(theMinutesTime, "minutes")
            catchTrain = moment(nextTrain).format("hh:mm")

            // Now to append all input information to the table
            $('#table-body').append(
                '<tr><td>' + trainName1 + 
                '</td><td>' + destination1 + 
                '</td><td>' + frequency1 +  
                '</td><td>' + catchTrain + 
                '</td><td>' + theMinutesTime + '</td></tr>')
                  // to help prevent no info from being added to table
                  $('#train-name, #dest, #first-train, #freq').val("")
                        return false
    
},
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code)
    })
    