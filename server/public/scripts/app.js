var personTracker = 0;
var theta;

$(document).ready(function(){

    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            // store into variable for readability
            theta = data.people;
            console.log(theta);

            createNav(data);
            putStuffIn(data);
            fades();

            $('#buttonContainer').on('click', '.next',  nextPerson);
            $('#buttonContainer').on('click', '.prev',  prevPerson);
            clearContainer();

        }

    });

});

// create prev and next buttons
function createNav(data) {
    $('#buttonContainer').append('<button class="prev">Prev</button>');

    $('#buttonContainer').append('<button class="next">Next</button>');
}

//go to next person from button click
function nextPerson() {
    personTracker++;
    if(personTracker >= theta.length){
        personTracker = 0;
    }
    fades();
    clearContainer();

}

// go to previous person
function prevPerson() {
    personTracker--;
    if(personTracker < 0){
        personTracker = theta.length -1;
    }

    fades();
    clearContainer();
}

// put class data into dom
function putStuffIn(data){

    for(var i = 0; i < theta.length; i++) {
        $('#peopleContainer').append('<div class="person-container' + i + '"></div>');
        var person = theta[i].name;
        var location = theta[i].location;
        var animal = theta[i].animal;
        $('.person-container' + i).append('<p class="person">' + person + '</p><p class="location">' + location + '</p><p class="animal">' + animal + '</p>');

    }
}

// fade in and out
function fades() {
    for(var i = 0; i < theta.length; i++) {
            $('.person-container' + i).fadeOut();


        if(i == personTracker) {
            $('.person-container' + i).fadeIn();
        }
    }
}

// attempt to clear dom for next person
function clearContainer() {


    for(var i = 0; i < theta.length; i++){
        if(i != personTracker){
            $('.person-container' + i).hide();

        }
    }
}