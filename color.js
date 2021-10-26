let time = 20;
//width and height for the game
let width = 600;
let height = 600;
//click button color list
let colorList = [
	null,
	"#609F60",
	"#EEEE00",
	"#FFB3FF",
	"#C0C0C0",
	"#22DDB8",
	"#FFCCCC",
	"#008888",
	"#BF9FDF",
	"#B7879F",
	"#FF9F40",
	"#ff6347",
	"#f5deb3",
	"#191970",
	"#e6e6fa",
	"#EEEE00",
	"#FFB3FF",
	"#C0C0C0",
	"#22DDB8",
	"#FFCCCC",
	"#008888",
	"#BF9FDF",
	"#B7879F",
	"#FF9F40",
	"#ff6347",
	"#f5deb3",
	"#191970",
	"#e6e6fa",
	"#EEEE00",
	"#FFB3FF",
	"#C0C0C0",
	"#22DDB8",
];
//background color list
let backgroundColorIndex = 0;
let backgroundColor = [
	"rgb(78, 133, 78)",
	"rgb(228, 240, 66)",
	"rgb(218, 132, 218)",
	"rgb(179, 177, 177)",
	"rgb(33, 211, 175)",
	"rgb(235, 187, 187)",
	"#079494",
	"rgb(181, 145, 218)",
	"rgb(170, 123, 146)",
	"rgb(252, 169, 87)",
	"#eb6750",
	" #f0d39d",
	"#2a2a80",
	"#d5d5f7",
	"rgb(228, 240, 66)",
	"rgb(218, 132, 218)",
	"rgb(179, 177, 177)",
	"rgb(33, 211, 175)",
	"rgb(235, 187, 187)",
	" #079494",
	"rgb(181, 145, 218)",
	"rgb(170, 123, 146)",
	"rgb(252, 169, 87)",
	" #eb6750",
	"#f0d39d",
	"#2a2a80",
	"#d5d5f7",
	"rgb(228, 240, 66)",
	"rgb(218, 132, 218)",
];
//define the right button index for each level
let chooseNum = [
	null,
	3,
	7,
	10,
	19,
	31,
	6,
	30,
	6,
	28,
	1,
	4,
	50,
	102,
	120,
	225,
	220,
	150,
	35,
	55,
	100,
	10,
	88,
	220,
	55,
	130,
	200,
	99,
	100,
	200,
	350,
];

//create a list holding ids for buttons in each level
let idIndexList = [];
for (i = 1; i < 300; i++) {
	idIndexList.push(i);
}

var className = 1; //className by level, levelN's className is "classN"
var numberSquare = 2; //the square value is number of blocks to be created in each level

//show count down
show_time = function show_time() {
	document.getElementById("time").style.visibility = "visible";
};

//hide start button
hide_game = function hide_game() {
	document.getElementById("startButton").style.visibility = "hidden";
};

//every time a level is started, create buttons,
//then update classname and number of buttons to be created in next level.
//then update backgroundColorIndex(next level background's index in backgroundColor list)
//And add clickLevel functon to one right button
start = function start() {
	console.log("start");
	createButton(numberSquare, className); //first, create buttons.
	className += 1; //
	numberSquare += 1;
	backgroundColorIndex += 1;
	clickLevel(); //by clicking the right one, remove children and start next level.
};
restart = function restart() {
	s.innerHTML = time;
	backgroundColorIndex = 0;
	className = 1; //className by level, levelN's className is "classN"
	numberSquare = 2; //the square value is number of blocks to be created in each level
	document.getElementById("box").style.visibility = "visible";
	document.getElementById("startButton").style.visibility = "hidden";
};
//create buttons, number of buttons=numberSquare*numberSquare
//level1 4 buttons，level2 9，level3 16...
createButton = function createButton(numberSquare, className) {
	parent = document.getElementById("box");
	for (var i = 0; i < numberSquare * numberSquare; i++) {
		let input = document.createElement("input");
		input.type = "button";
		input.id = idIndexList[i]; //id=1,2,3,4...
		let cName = "buttons" + className;
		input.className = cName; //each level's class is: "buttons1","buttons2","buttons3"...
		parent.appendChild(input);
		///update background color and size of input
		input.style.backgroundColor = backgroundColor[backgroundColorIndex];
		input.style.width = width / numberSquare + "px";
		input.style.height = height / numberSquare + "px";
	}
	//update color of the button of clickLevel(the right button)
	document.getElementById(chooseNum[className]).style.backgroundColor =
		colorList[className];
};

//when the right button is clicked, remove all previous level,
//and continue to next level
clickLevel = function clickLevel() {
	var level = document.getElementById(chooseNum[className - 1]); //choose a button as clickLevel object(the right button)
	level.addEventListener("click", removeChild);
	level.addEventListener("click", start);
};

//remove all previous  level buttons
removeChild = function removeChild() {
	parent = document.getElementById("box");
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
};

//count down clock
//when count to 0, stop the game and give result
function countdown() {
	var s = document.getElementById("clock");
	// when 0, change to restart and show the button
	if (s.innerHTML == 0) {
		document.getElementById("box").style.visibility = "hidden";
		document.getElementById("startButton").style.visibility = "hidden";
		document.getElementById("restartButton").style.visibility = "visible";
		// if(className<=5)
		document.getElementById("result_color").innerHTML =
			"You have finished " + className + " levels! <br>Out of 30 levels!";
		// else if(className<10)
		//    document.getElementById("result_color").innerHTML="Just So So!";
		// else if(className>=10 && className<=20)
		//   document.getElementById("result_color").innerHTML="You did an awesome job!";
		//  else
		// document.getElementById("result_color").innerHTML="You are really sensitive with colors!"
		clearInterval(run); //取消由 setInterval() 设置的 timeout，，这里数字暂停在0这里，否则时间会继续往下减会出现负数。
	}
	s.innerHTML = s.innerHTML - 1; //the value if clock minus 1
}
//every one second run countDown()
function runCountdown() {
	setInterval("countdown();", 1000);
}
