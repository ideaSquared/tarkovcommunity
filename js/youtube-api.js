// BSG YT ID: UC5QGploHhl9_XaxDiHZKamg
// TFG YT ID: UCA5LtT7kdG1Cts9DeSLdZ5w
// BSG MOST RECENT PLAYLIST: UULF5QGploHhl9_XaxDiHZKamg

// https://developers.google.com/youtube/v3/docs/playlistItems/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22maxResults%22%3A5%2C%22playlistId%22%3A%22UULF5QGploHhl9_XaxDiHZKamg%22%7D&apix=true#usage

// Script Source: https://stackoverflow.com/questions/30081301/getting-all-youtubevideos-of-a-channel-using-youtube-api/33767046#33767046



/*
function getVideos()

API_KEY = Supplied by Google
amountOfVideos = How many we returned from YouTube
*/

var videos = [];

function getVideos(amountofVideos) {
    try {
        amountofVideos++;

        if(typeof apiKey == "undefined") {
            apiKey = 'AIzaSyCn-MDrO-PXDQZh4uh1zfYADw-OqETCC2k';
            // Error with no direction to avoid searching for the API key
            console.log("Production key");
        }

        var youtubeData = getJSONData("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults="+amountofVideos+"&playlistId=UULF5QGploHhl9_XaxDiHZKamg&key="+apiKey);     
        var videoinfo = JSON.parse(youtubeData);

        var youtubevideos = videoinfo.items;

        if(typeof youtubevideos == "undefined") {
            console.log("No data returned by API");
            return;
        }
        
        for (var i = 0; i < youtubevideos.length - 1; i++) {

            // Set easier to remember and call variables from the JSON data.
            var videoid = youtubevideos[i].snippet.resourceId.videoId;
            var videothumbnail = youtubevideos[i].snippet.thumbnails;

            // If we have a max resolution thumbnail, display that otherwise use medium as this is the only other default non-black bar.
            if(videothumbnail.maxres) {
                videothumbnail = youtubevideos[i].snippet.thumbnails.maxres.url;
            }
            else {
                videothumbnail = youtubevideos[i].snippet.thumbnails.medium.url;
            }

            addToArray(i, videoid, videothumbnail);
        }
        
    } catch (ex) {
        alert(ex.message);
    }
}

function addToArray(i, videoid, videothumbnail) {

    // Add new object to the array or update.
    if(typeof videos[i] === 'undefined') {
        newObject = {id: videoid, thumbnail: videothumbnail};
        videos.push(newObject);
    }
    else {      
        videos[i].id = videoid;
        videos[i].thumbnail = videothumbnail;
    }
}

// On load set the URLs.
window.onload = function() {

    var youtubeURL = 'https://youtube.com/';
    var embedURL = 'embed/';
    var videoURL = 'watch?v=';
    var URL;
    
     for(var i = 0; i < videos.length - 1; i++) {
        if(i === 0){
            URL = youtubeURL+embedURL+videos[i].id;      
            document.getElementById("video"+i).src = URL;
        }
        else  {
            URL = youtubeURL+videoURL+videos[i].id; 
            document.getElementById("video"+i).src = videos[i].thumbnail;
            document.getElementById("video"+i+"link").href = URL;
        }
    }
};