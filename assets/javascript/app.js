
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
		var displayGifRow0 = $("<div class = 'row displayGifRow0'>");
		var displayGifRow1 = $("<div class = 'row displayGifRow1'>");
		var displayGifRow2 = $("<div class = 'row displayGifRow2'>");

		$(".currentItemGifs").append(displayGifRow0);
		$(".currentItemGifs").append(displayGifRow1);
		$(".currentItemGifs").append(displayGifRow2);

		for(i = 0; i<10; i++){
			var url = this.gifArray[i].images.fixed_width_still.url;
			var thumbNail = $("<div class = 'thumbnail'>");
			var img = $("<img class = 'stillGif'>");
			var caption = $("<div class = 'caption'>");
			img.attr("src",url);
			img.attr("data-name",i);
			img.attr("data-anim",false);
			caption.text(this.gifArray[i].rating);
			$(thumbNail).append(img);
			$(thumbNail).append(caption);

			if(i<4){
				$(displayGifRow0).append(thumbNail);
			}

			if(i<8&&i>3){
				$(displayGifRow1).append(thumbNail);
			}

			if(i<10&&i>7){
				$(displayGifRow2).append(thumbNail);
			}
		};
	},

	refresh: function(){
		$(".autoLoadButtons").empty();
		for(i = 0; i<gifs.topics.length; i++){
			var btn = $("<button class = 'btn itemBtn'>");
			btn.attr("data-name",gifs.topics[i]);
			btn.text(gifs.topics[i]);
			$(".autoLoadButtons").append(btn);
		};
	},

	submitClick: function(){
		$(".submitBtn").on("click", function(){
			event.preventDefault();
			var newGif = $(".searchText").val().trim();
			var btn = $("<button class = 'btn itemBtn'>");
			btn.attr("data-name",newGif);
			btn.text(newGif);
			$(".userChoiceButtons").append(btn);
	})
	}

};



window.onload = function(){
	gifs.refresh();
	gifs.submitClick();

	$(document).on("click", ".itemBtn",function(){
			gifs.gifArray.length = 0;
			console.log("poop");
			$(".currentItemGifs").empty();
			var item = $(this).attr("data-name");
			console.log("this is the " + item);
			gifs.searchGifs(item);
		})

	$(document).on("click","img",function(){
			if($(this).attr("data-anim") === "false"){
				$(this).attr("data-anim",true);
				var index = $(this).attr("data-name");
				var animURL = gifs.gifArray[index].images.fixed_width.url
				$(this).attr("src", animURL);
			}
			else{
				$(this).attr("data-anim",false);
				var index = $(this).attr("data-name");
				var animURL = gifs.gifArray[index].images.fixed_width_still.url
				$(this).attr("src", animURL);
			}
		})
};

