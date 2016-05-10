
	


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
