$(document).ready(function($){

	$('#search-form').submit(function(){
			event.preventDefault();
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');
			context.clearRect(0,0, canvas.width(), canvas.height());
			console.log(canvas.width);
			
	var weatherIconURL = 'http://openweathermap.org/img/w/'

	var apikey = '4da3240c969844c076db54d57304a83a';
	

	var location = $('#location-search').val()
		console.log(location);
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&APPID="+apikey;
		console.log(weatherUrl);

	$.getJSON(weatherUrl, function(weatherData){
		console.log(weatherData);
		currTemp = weatherData.main.temp;
	

		// var currTemp = 80.0;
		var canvas = $('#weather-canvas');
		var context = canvas[0].getContext('2d');
		var image = new Image;
		var icon = weatherIconURL + weatherData.weather[0].icon + '.png';
		image.src = icon;
		var condition = weatherData.weather[0].description;
		var area = weatherData.name;
		var lineWidth = 5;
		var outterRadius = 70;
		var innderRadius = outterRadius - lineWidth;
		var currPerc = 0; 
		var counterClockwise = false;
		var circ = Math.PI * 2;
		var quart = Math.PI / 2;
		var shadeColor;

		// if(currTemp < 32){
		// 	shadeColor = '#d4f0ff';
		// }else if ((currTemp >= 32)&&(currTemp < 59)){
		// 	shadeColor = '#129793'
		// }else if ((currTemp >= 59)&&(currTemp < 75)){
		// 	shadeColor = '#7cfc00'
		// }else if ((currTemp >= 79)&&(currTemp < 90)){
		// 	shadeColor = '#ff6600'
		// }else{
		// 	shadeColor = 'e3170d'
		// }

		function animate(current){

			if(currTemp < 32){
			shadeColor = '#d4f0ff';
			}else if ((currTemp >= 32)&&(currTemp < 59)){
				shadeColor = '#129793'
			}else if ((currTemp >= 59)&&(currTemp < 75)){
				shadeColor = '#7cfc00'
			}else if ((currTemp >= 79)&&(currTemp < 90)){
				shadeColor = '#ff6600'
			}else{
				shadeColor = 'e3170d'
			}

			context.fillStyle = "#ccc";
			context.beginPath();
			context.arc(155,75,innderRadius,0,2*Math.PI,true)
			context.closePath();
			context.fill();
			// context.stroke();

			context.lineWidth = 10;
			context.strokeStyle = shadeColor;
			context.beginPath();
			context.arc(155,75, outterRadius, -(quart),((circ) * current) - quart, false);
			context.stroke();
			context.font = "48px Myriad Pro";
			context.fillStyle = "Blue";
			context.textBaseline = "top";
			context.fillText(currTemp, 175 - outterRadius, 85 - outterRadius/2);
			context.drawImage(image, 130, 20);
			context.font = '12px Myriad Pro';
			context.fillText(condition,200-outterRadius, 135-outterRadius/2);
			context.font = '25px Myriad Pro';
			context.fillText(area,75-outterRadius, 35-outterRadius/2);
			currPerc++;
			if(currPerc < currTemp){
				requestAnimationFrame(function(){
				animate(currPerc/100);
				});
			}
			
		}


	animate();
	context.closePath();

	});
	});

});










