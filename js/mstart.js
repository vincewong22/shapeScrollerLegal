//initial values
var id = [];
var level_shapes = [[], [], []], user_shapes = [[], [], []];
var level = 1;
var lives = 3;
var showInput = true;

var usedTimer = false;
var usedClue = false;
var incorrect = true;
var INCORRECT_LEVEL = 2;
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

function updateStyleSheet(filename) {
 
    newstylesheet = "css/style_" + filename + ".css";
    if ($("#dynamic_css").length == 0) {
        $("head").append("<link>")
        css = $("head").children(":last");
        css.attr({
          id: "dynamic_css",
          rel:  "stylesheet",
          type: "text/css",
          href: newstylesheet
        });
    } else {
        $("#dynamic_css").attr("href",newstylesheet);
    }
 
}
function setAchievment(){
//never used timer and got past level 3
//used no clues and got past level 3
//no incorrects past level 5
if(level > 3 && !usedTimer)
	$("#award1").html('award 1 gained, never used timer and got past level 3');
if(level > 3 && !usedClue)
	$("#award2").html('award 2 gained, used no clues and got past level 3');
if(level > 5 && !incorrect)
	$("#award3").html('award 3 gained, 5 in a row -no incorrets past level 5');
}



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
            if (audioElement.paused == false) {
      audioElement.pause();
      //alert('music paused');
  } else {
      audioElement.play();
      //alert('music playing');
  }
        });

}

//starts game off
function startmain() {
	updateStyleSheet('normal');
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
		
		$("#input").show();
        loadInput();	
    });
	$("#borderChange").click(function(){
		borderChange();
		updateStyleSheet('blind');
	});
    $("#input_click").click(function () {
		$("#input").toggle();
		user_shapes = getUserContent(4);
	
        if (user_shapes.toString() == level_shapes.toString()) {
			if(level == INCORRECT_LEVEL)
				incorrect = false;
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
		usedClue = true;
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

	function borderChange(){
	$('.colorRed').css('border-style','solid');
		$('.colorGreen').css('border-style','solid');
		$('.colorBlue').css('border-style','solid');
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
		drawHearts();
        $("#lives").html("Lives: " + lives);
    }
}
//ends game
function gameOver() {
	$("#hearts").empty();
	for(i=0; i <3;i++)
		$("#hearts").append("<img src='images/whiteHeart.png'/>");
	setAchievment();
	$("#messageBox").hide();
    $("#lives").html("lives: 0");
    $("#gameOver").slideDown();
    $("#randomGenerator").remove();
    $("#input").remove();
    $('input[name=level]').val(level);
}
function drawHearts(){
$("#hearts").empty();
	for(i=0; i <lives; i++)
		$("#hearts").append("<img src='images/heart.png'/>");
	var whiteLives = 3 - lives;
	for(i=0; i <whiteLives;i++)
		$("#hearts").append("<img src='images/whiteHeart.png'/>");
			
}
//updates lives and level counters
function updateCounters() {
	//$("#stats").append("<img src="images/heart.png">");
	drawHearts();
    $("#lives").html("Lives: " + lives);
    $("#levelCounter").html("Level: " + level);
}
//hide generation panels when input is called by timer
function hideInput() {
	usedTimer = true;
    if (lives != 0)
        $("#randomGenerator").hide();
	if(showInput)
		$("#input").show();
}
//starts off timer
function startTimer() {
	seconds = (level *2) +7;
    var countdown = $("#countdown").countdown360({
        radius: 40,
        seconds: seconds,
        fontColor: '#FFFFFF',
        autostart: false,
        onComplete: function () {
           loadInput();
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