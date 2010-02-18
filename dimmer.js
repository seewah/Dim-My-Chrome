var dimmerOverlayDivId = "chrome_dimmer_e592757f347a5f7558609639224dc38f";
var dimmerOverlay = $("<div/>", {"id": dimmerOverlayDivId});

/**
 * Attachs the dimmerOverlay div and sets opacity.
 */
function showDimmer(opacity) {
	if ($("#" + dimmerOverlayDivId).length == 0) {
		$("body").append(dimmerOverlay);
		dimmerOverlay.height($(window).height());
		dimmerOverlay.css("opacity", "0");
		dimmerOverlay.fadeTo("slow", opacity);
	}
}

/**
 * Removes dimmerOverlay from the document.
 */
function removeDimmer() {
	dimmerOverlay.remove();
}

/**
 * Tells the background.html to resetCountdown/Timer.
 */
function resetCountdown() {
	chrome.extension.sendRequest({"greeting": "resetCountdown"});
}

$(document).ready(function() {

	resetCountdown();

	$(document).mouseover(function(e) {
		removeDimmer();
	});

	$(document).mousemove(function(e) {
		resetCountdown();
	});

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    		if (request.greeting == "lightsOut") {
			showDimmer(request.opacity);
		} else if (request.greeting == "lightsOn") {
			removeDimmer();
		}
  	});
});