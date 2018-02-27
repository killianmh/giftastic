
var gifs = {

	topics: ["Recess","Arthur","Pepper Ann","Gargoyles","Batman","Animaniacs"],

	gifArray : [],

	searchGifs: function(thing){
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+thing+"&limit=10&api_key=Tmm7vUjTXN1BGkl3TU4bII4npI9HM4lQ";
		$.ajax({
		url: queryURL,
		method: "GET",
		}).then(function(response){
		console.log(response);

		gifs.populateGifArray(response);

		// console.log(response.data[0].id);

	})
	},

	populateGifArray: function(responseArray){
		for(i = 0; i < 10; i++){
			this.gifArray.push(responseArray.data[i]);
			
		};
		console.log(this.gifArray);
		gifs.displayStaticGifs(responseArray);
	},

	displayStaticGifs: function(responseArray){
		for(i = 0; i<10; i++){
			var url = responseArray.data[i].images.fixed_width_still.url;
			var img = $("<img class = 'stillGif'>");
			img.attr("src",url);
			img.attr("data-name",i);
			$(".currentItemGifs").append(img);
		};
		this.animateGif();
		
	},

	animateGif: function(){
		$(".stillGif").on("click",function(){
			var index = $(this).attr("data-name");
			var animURL = gifs.gifArray[index].images.fixed_width.url
			$(this).attr("src", animURL);
		})
	},


	itemClk: function(){
		$(".itemBtn").on("click",function(){
			gifs.gifArray.length = 0;
			console.log("poop");
			$(".currentItemGifs").empty();
			var item = $(this).attr("data-name");
			console.log(item);
			gifs.searchGifs(item);
	})
	}

};



window.onload = function(){
	$(".autoLoadButtons").empty();
	for(i = 0; i<gifs.topics.length; i++){
		var btn = $("<button class = 'btn itemBtn'>");
		btn.attr("data-name",gifs.topics[i]);
		btn.text(gifs.topics[i]);
		$(".autoLoadButtons").append(btn);
	};

	// gifs.searchGifs("robot");

	gifs.itemClk();

	
	// console.log($(this).data-name);
};

