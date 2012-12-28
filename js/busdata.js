var busData = {

	var stopID, busTimes = {};

	predictionURL: function(){
		// http://proximobus.appspot.com/agencies/mbta/stops/02848/predictions.js?callback=jsonp1353455032487
		return "http://proximobus.appspot.com/agencies/mbta/stops/" + this.stopID + "/predictions.js?callback=?";
	}
    
    fetchData: function(){
		$.getJSON(this.predictionURL(), function(data){
			var max = Math.min(5, data.items.length);
	        for (var i = 0; i < max; i++) {				
				var prediction = data.items[i];
				this.busTimes.push(prediction.minutes);
			}			          	
		}
	}
}

/*

function checkOurBus(){
	
	var content = "<b>Next Bus</b><br/>";
	var busTimes = Array();
	
	
	var prediction_url = "http://proximobus.appspot.com/agencies/mbta/stops/" + stopID + "/predictions.js?callback=?";
    $.getJSON(prediction_url, function(data) {
            		
		for (var i = 0; i < Math.min(5, data.items.length); i++) {
		
			var prediction = data.items[i];
			
			busTimes.push(prediction.minutes);
			
			if (prediction.seconds < 60){
				content += "<li>" + prediction.seconds + " seconds </li>";
			} else {
				content += "<li>" + prediction.minutes + " minutes </li>";
		    }
		          	
		}
		
		$("#status").html('');
		$("#status").html(content);
		busTimes.sort(function(a,b){return a - b})
		
		   
	    if(parseInt(busTimes[0]) <= 10){
	    	
			//$("#status").append('FFFFFUUUUUUU');
			$("#status").focus()
		    
		    u = "http://translate.google.com/translate_tts?tl=en&q=the bus is coming in " + busTimes[0].toString() + "minutes!";
	 			$("#embedPlayer").jPlayer("clearFile");
	 			$("#embedPlayer").jPlayer("setFile", u).jPlayer("play");
	 			
		 }   
  
	  		
	});
*/