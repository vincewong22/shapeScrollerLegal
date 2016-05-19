// Retrieve <span> element for exiting
	var exit = document.getElementsByClassName("close")[0];

	// Retrieve <span> element for border icon
	var borderIco = document.getElementsByClassName("borderIcon")[0];

	// Retrieve <span> element for mute icon
	var muteIco = document.getElementsByClassName("muteIcon")[0];

	// Retrieve <span> element for border icon
	var themeIco = document.getElementsByClassName("themeIcon")[0];


	// If you click on span element aka the 'x'
	exit.onclick = function() {
    	$("#overlay").hide();
	}

	// If you click on change border icon
	borderIco.onclick = function() {
		localStorage.setItem('borderChange', 'clicked');
		alert("borderIcon pressed.");
	}

	// If you click on mute icon
	muteIco.onclick = function() {
		alert("muteIcon pressed.");
	}

	// If you click on change theme icon
	themeIco.onclick = function() {
		alert("themeIcon pressed.");
	}


	// Hides the settings div initially
	$("#overlay").hide();

	function play() {
		window.location.href = "onboarding.html"; // link to memorization screen
	}

	function tutorial() {
		window.location.href = "tutorial.html"; // link to tutorial
	}
	function onClick(){
		window.location.href = "main_easter.html"; // link to easter egg
	}
	
	function settingsPopUp() {
		// Show settings overlay
		$("#overlay").show();
	}