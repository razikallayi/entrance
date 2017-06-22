//-------------------------------------------------------------------------------------
//
// THIS FILE IS NOT A PART OF THE PLUGIN, IT'S ONLY FOR THE DEMO
//
//-------------------------------------------------------------------------------------
!(function(){
    'use strict';

	var numOfImages = window.location.search ? parseInt(window.location.search.match(/\d+$/)[0]) : 70,
		gallery = $('#gallery'),
		videos=[],
		photos=[];

	/* generate years image*/
	for(var i=1993; i<=2015; i++){
		videos.push({
				"title": i,
				"url": "e-brochure.pdf",
				"pdf" :"true",
				"thumb": "http://dummyimage.com/75.jpg&text="+i
		});
	}
	videos.push({
				"title": "Believe in yourself",
				"url": "https://www.youtube.com/embed/W_VQbtO3ChM",
				"thumb": "http://img.youtube.com/vi/W_VQbtO3ChM/2.jpg"
		});
	videos.push({
				"title": "You can be a hero too",
				"url": "https://www.youtube.com/embed/I5UBikauIQM",
				"thumb": "http://img.youtube.com/vi/I5UBikauIQM/2.jpg"
		});
	videos.push({
				"title": "Passion",
				"url": "https://www.youtube.com/embed/_mLn99CQubI",
				"thumb": "http://img.youtube.com/vi/_mLn99CQubI/2.jpg"
		});
	videos.push({
				"title": "You can do this",
				"url": "https://www.youtube.com/embed/SbJIi6nUs2s",
				"thumb": "http://img.youtube.com/vi/SbJIi6nUs2s/2.jpg"
		});
	//Get the number of files in the folder
		var filesCount = function(){
			var numberOfFiles=null;
			$.ajax({
				url:'numberoffiles.php',
				async:false, 
				success:function(data) {
					numberOfFiles=data;
				}
			});
			return numberOfFiles;
		}();
		//fetching photos
		for(var i=1; i<=filesCount; i++){
			photos.push({
				"id": i,
				"url": "quotes/("+i+")",
				"title": "Quote"+i
			});
		}
        var loadedIndex = 1, isVideo,isPdf;
		// add the videos to the collection
		photos = photos.concat(videos);
        $.each( photos, function(index, photo){
			isVideo = photo.thumb ? true : false;
			isPdf = photo.pdf ? true : false;
			// http://www.flickr.com/services/api/misc.urls.html
            var url = photo.url,
				img = document.createElement('img');
			// lazy show the photos one by one
			img.onload = function(e){
				img.onload = null;
				var link = document.createElement('a'),
				li = document.createElement('li')
				link.href = this.largeUrl;
				link.appendChild(this);

				if( this.isVideo ){
					link.rel = 'video';
					li.className = 'video';
				}
				if( this.isPdf ){
				//	link.rel = 'video';
					li.className = 'pdf';
				}
				li.appendChild(link);
				gallery[0].appendChild(li);
			
				setTimeout( function(){ 
					$(li).addClass('loaded');
				}, 25*loadedIndex++);
			};
			
			img['largeUrl'] = isVideo ? photo.url : url + '.jpg';
			img['isVideo'] = isVideo;
			img['isPdf'] = isPdf;
			img.src = isVideo ? photo.thumb : url + '.jpg';
			img.title = photo.title;
        });

		// finally, initialize photobox on all retrieved images
		$('#gallery').photobox('a', { thumbs:true, loop:false }, callback);
		// using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
		setTimeout(window._photobox.history.load, 2000);
		function callback(){
			console.log('callback for loaded content:', this);
		};
})();