var id = [];
var level_shapes = [[], [], []], user_shapes = [[], [], []];
var level=1;

$(document).ready(function () {
    level = localStorage.getItem("level",level);
    if(level == null){
        localStorage.setItem("level",1);
    }
    $("#levelCounter").text("Level: "+level);
    var difficulty = level;
    generateBoard(level);
//Set all elements with init id with block class drag enabled
    init();
//button that checks the
    $( "#click" ).click(function() {
        getListContent();
    });

    $( "#reset" ).click(function() {
        console.log("reset");
        localStorage.setItem("level",1);
        $("#levelCounter").text("resetting!!!!: "+level);
        window.location.href = "start.html";
    });
//button that checks the
    $("#start_click").click(function () {
        loadInput();
        //level_shapes = getUserContent(0);
        //localStorage.setItem("level_shapes",level_shapes.toString());
        //
        //window.location.href = "input.html";
    });
    $("#input_click").click(function () {
        user_shapes = getUserContent(4);
        //alert(document.cookie);

        var level_shapes_str = localStorage.getItem("level_shapes");
        console.log(user_shapes.toString());
        if((user_shapes.toString()) == level_shapes_str){
            //alert(level_shapes_str+"  mAtCh!"+user_shapes.toString());
            level++;
            localStorage.setItem("level",level);
            console.log("level: "+level);
            window.location.href = "start.html";
        }
        else {
            var helpTip = localStorage.getItem("level shapes user");
            alert(helpTip +"\n Sorry, no match, try inputing the above!");
        }
    });
    window.loadInput = function(){
        level_shapes = getUserContent(0);
        localStorage.setItem("level_shapes",level_shapes.toString());
        localStorage.setItem("level shapes user","row1="+level_shapes[0].toString()+"\nrow2="+level_shapes[1].toString()+"\nrow3="+level_shapes[2].toString())
        window.location.href = "input.html";
    }

    //gets the shapes from the 3 lists
    //offset for shapelists 0,1,2 and shaplists 4,5,6
    function getUserContent(offset) {
        var myClass;
        var shapelist0 = [], shapelist1 = [], shapelist2 = [];
        var shapeArray = [shapelist0, shapelist1, shapelist2];
        for (i = 0+offset,j=0; i < shapeArray.length+offset; i++,j++) {
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
});//end of ready

function startTimer(){

    var countdown =  $("#countdown").countdown360({
        radius      : 90,
        seconds     : 10,
        fontColor   : '#FFFFFF',
        autostart   : false,
        onComplete : function() {window.loadInput()

           // window.location = "input.html"

        }
        <!--onComplete  : function() { console.log('done') } -->
    });
    countdown.start();
    console.log('countdown360 ',countdown);
}

function init(){
    $("#init .block").draggable({ helper: "clone",
        connectToSortable: ".list",
        drop: function (event, ui) {

        }
    });
    sortList();
}

function decideShape(numShapes){
    var shapeNum = Math.floor( Math.random() * numShapes );
    switch(shapeNum){
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
function decideRow(){
    return Math.floor( (Math.random() * 3) );
}
function decideColor(numColors){
    var shapeNum = Math.floor( Math.random() * numColors);
    switch(shapeNum){
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

function generateBoard(level){
    var row,shape,styleShape,source,shapeClass;
    for(i=0; i<level; i++) {
        row = "shapelist"+decideRow();
        shape = decideShape(decideNumShapes());
        path = "images/"+shape+".jpg";
        source="images/circle.jpg";
        shapeClass = "block "+decideColor(decideNumColors())+" ui-draggable";

        var img = $('<img />', {
            id: shape,
            src: path,
            class: shapeClass
        });
        img.appendTo($("#"+row));
    }
}

function decideNumColors(){
    console.log("level from num colors:"+level);
    if(level > 5)
    return 2;
return 0;
}
function decideNumShapes(){
    console.log("level from num shapes:"+level);
    if(level > 3)
        return 2;
    if(level > 4)
        return 3;
    return 1;
}
function sortList(){
    //Connect empty sorted lists with draggable elements
    $(".list").sortable({

        connectWith: ".list",
        receive: function(event,ui) {
            var id = ui.item.attr("id");
            if(id == "box")
                $(newItem).attr({style: "content:url(images/box.jpg)" });
            if(id == "triangle")
                $(newItem).attr({style: "content:url(images/triangle.jpg)" });
            if(id == "circle")
                $(newItem).attr({style: "content:url(images/circle.jpg)" });
            //check to see if your dragging out a new shape, if so, then give it a color, if check was not here
            //old shapes would have color overridden
            if(($(this).hasClass("colorBlue") ||$(this).hasClass("colorRed")||$(this).hasClass("colorGreen")))
                var colorClass = $("input:radio[name='color']:checked").val();
            $(newItem).addClass(colorClass);

        },
        beforeStop: function (event, ui) {
            newItem = ui.item;
        }
    });
}