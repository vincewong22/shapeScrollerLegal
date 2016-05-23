//initial values
var id = [];
var level_shapes = [[], [], []], user_shapes = [[], [], []];
var level = 1;
var lives = 3;
var showInput = true;
//turn off non essential panels
$(document).ready(function () {
    $("#randomGenerator").toggle();
    $("#settingsPanel").toggle();
    $("#input").toggle();
    $("#gameOver").toggle();
    $("#stats").toggle();
    $("#countdown").toggle();
	$("#messageBox").toggle();
    startmain();

});//end of ready

function playMusic(){
 var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'sounds/FromHere.ogg');
        audioElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()

        $.get();

        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);

        $('.play').click(function() {
            audioElement.play();
        });

        $('.pause').click(function() {
            audioElement.pause();
        });
}

//starts game off
function startmain() {
	
    $("#play").click(function () {
		playMusic();
        $("#randomGenerator").toggle();
        $("#countdown").toggle();
        $("#mainPanel").toggle();
        $("#input").toggle();
        $("#stats").toggle();
        $("#countdown").toggle();
        playGame();
    });

}

//initial game loop
function playGame() {

    if (lives == 3) {
        $("#gameOver").hide();
        var difficulty = level;
        generateBoard(level);
    }
//Set all elements with init id with block class drag enabled
    init();
//button that checks the
    $("#click").click(function () {
        getListContent();
    });

    $("#reset").click(function () {

        window.location.href = "start.html";
    });
	$("#closeMessage").click(function () {
		$("#messageBox").toggle();
        $("#input").toggle();
    });
//button that checks the
    $("#start_click").click(function () {
        loadInput();
    });
    $("#input_click").click(function () {
		$("#input").toggle();
		user_shapes = getUserContent(4);
	
        if (user_shapes.toString() == level_shapes.toString()) {
			//$("message").innerHTML("no match");
            level++;
            generateBoard(level);
            //if (lives != 0)
              //  $("#input").slideUp();
            $("#shapelist4").empty();
            $("#shapelist5").empty();
            $("#shapelist6").empty();
            $("#randomGenerator").slideDown();
            startTimer();
            updateCounters();
        }
        else {
            //var helpTip = localStorage.getItem("level shapes user");
			$("#messageBox").toggle();
			$("#input").hide();
			showInput = false;
			$("#message").html('no match');
            //alert("no match");
            updateLives();
        }
    });
    $("#clue_click").click(function () {
        if (lives == 0) {

            gameOver();
        }
        else {
            $("#randomGenerator").slideDown();
			
           $("#input").toggle();
            startTimer();
            updateLives();
        }
    });

    window.loadInput = function () {
        level_shapes = getUserContent(0);
        hideInput();
    }

    //gets the shapes from the 3 lists
    //offset for shapelists 0,1,2 and shaplists 4,5,6
    function getUserContent(offset) {
        var myClass;
        var shapelist0 = [], shapelist1 = [], shapelist2 = [];
        var shapeArray = [shapelist0, shapelist1, shapelist2];
        for (i = 0 + offset, j = 0; i < shapeArray.length + offset; i++, j++) {
            var target = "#shapelist" + i + " img";
            console.log(target);
            $(target).each(function () {
                if ($(this).hasClass("colorRed"))
                    myClass = "_red"
                if ($(this).hasClass("colorGreen"))
                    myClass = "_green"
                if ($(this).hasClass("colorBlue"))
                    myClass = "_blue"
                console.log(this.id + myClass);
                shapeArray[j].push(this.id + myClass);
            });
        }
        return shapeArray;
    }

    startTimer();
    updateCounters();
    $("#input").slideUp();
}
//updates the stats
function updateLives() {
    if (lives == 1) {
        lives = 0;
        gameOver();
    }
    else {
        lives--;
        $("#lives").html("lives: " + lives);
    }
}
//ends game
function gameOver() {
	$("#messageBox").toggle();
    $("#lives").html("lives: 0");
    $("#gameOver").slideDown();
    $("#randomGenerator").remove();
    $("#input").remove();
    $('input[name=level]').val(level);
}

//updates lives and level counters
function updateCounters() {
    $("#lives").html("lives: " + lives);
    $("#levelCounter").html("level: " + level);
}
//hide generation panels when input is called by timer
function hideInput() {
    if (lives != 0)
        $("#randomGenerator").slideUp();
	if(showInput)
		$("#input").slideDown();
}
//starts off timer
function startTimer() {

    var countdown = $("#countdown").countdown360({
        radius: 40,
        seconds: 10,
        fontColor: '#FFFFFF',
        autostart: false,
        onComplete: function () {
            hideInput()
            //window.loadInput()

            // window.location = "input.html"

        }
        <!--onComplete  : function() { console.log('done') } -->
    });
    countdown.start();
    console.log('countdown360 ', countdown);
}
//initializes sortable
function init() {
    $("#init .block").draggable({
        helper: "clone",
        connectToSortable: ".list",
        drop: function (event, ui) {

        }
    });
    sortList();
}
//lets you customize what shapes to start game off with
function decideShape(numShapes) {
    var shapeNum = Math.floor(Math.random() * numShapes);
    switch (shapeNum) {
        case 0:
            return "circle";
            break;
        case 1:
            return "triangle";
            break;
        default:
            return "box";
    }
}
//decide which row to put random shape in
function decideRow() {
    return Math.floor((Math.random() * 3));
}
//decide on what color random shape should be
function decideColor(numColors) {
    var shapeNum = Math.floor(Math.random() * numColors);
    switch (shapeNum) {
        case 0:
            return "colorRed";
            break;
        case 1:
            return "colorBlue";
            break;
        default:
            return "colorGreen";
    }
}
//creates the levels
function generateBoard(level) {
    var row, shape, styleShape, source, shapeClass;
    for (i = 0; i < level; i++) {
        row = "shapelist" + decideRow();
        shape = decideShape(decideNumShapes());
        path = "images/" + shape + ".jpg";
        source = "images/circle.jpg";
        shapeClass = "block " + decideColor(decideNumColors()) + " ui-draggable";

        var img = $('<img />', {
            id: shape,
            src: path,
            class: shapeClass
        });
        img.appendTo($("#" + row));
    }
}
//lets you fine tune number of colors avaiable based on which level
//pre-condition level must be greater then 0
function decideNumColors() {
    console.log("level from num colors:" + level);
    if (level > 5)
        return 2;
    return 0;
}
//lets you fine tune number of shapes avaiable based on which level
//pre-condition level must be greater then 0
function decideNumShapes() {
    console.log("level from num shapes:" + level);
    if (level > 3)
        return 2;
    if (level > 4)
        return 3;
    return 1;
}

function sortList() {
    //Connect empty sorted lists with draggable elements
    $(".list").sortable({

        connectWith: ".list",
        receive: function (event, ui) {
            var id = ui.item.attr("id");
            if (id == "box")
                $(newItem).attr({style: "content:url(images/box.jpg)"});
            if (id == "triangle")
                $(newItem).attr({style: "content:url(images/triangle.jpg)"});
            if (id == "circle")
                $(newItem).attr({style: "content:url(images/circle.jpg)"});
            //check to see if your dragging out a new shape, if so, then give it a color, if check was not here
            //old shapes would have color overridden
            if (($(this).hasClass("colorBlue") || $(this).hasClass("colorRed") || $(this).hasClass("colorGreen")))
                var colorClass = $("input:radio[name='color']:checked").val();
            $(newItem).addClass(colorClass);

        },
        beforeStop: function (event, ui) {
            newItem = ui.item;
        }
    });
}