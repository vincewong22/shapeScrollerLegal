
	

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


}
