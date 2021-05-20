document.getElementById("randomSimpsons").addEventListener("click", randomsimpsons)

var seasonNo, episodeNo, pageURL, urlData;



if (seasonNo && episodeNo !== undefined) {
    
    getThumb() //get thumb from tmdb
    getInfo() //get info from trakt api
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == variable){return pair[1]
        
      }
    }
    console.log('Query variable %s not found', variable)
}

seasonNo = getQueryVariable('s');
episodeNo = getQueryVariable('e');

function randomsimpsons() {
    seasonNo = shuffle(32)

    switch (seasonNo) {
        case 1:
            episodeNo = shuffle(11);
            break;
        case 2:
            episodeNo = shuffle(22);
            break;
        case 3:
            episodeNo = shuffle(24);
            break;
        case 4:
            episodeNo = shuffle(22);
            break;
        case 5:
            episodeNo = shuffle(22);
            break;
        case 6:
            episodeNo = shuffle(25);
            break;
        case 7:
            episodeNo = shuffle(25);
            break;
        case 8:
            episodeNo = shuffle(25);
            break;
        case 9:
            episodeNo = shuffle(25);
            break;
        case 10:
            episodeNo = shuffle(23);
            break;
        case 11:
            episodeNo = shuffle(22);
            break;
        case 12:
            episodeNo = shuffle(21);
            break;
        case 13:
            episodeNo = shuffle(22);
            break;
        case 14:
            episodeNo = shuffle(22);
            break;
        case 15:
            episodeNo = shuffle(22);
            break;
        case 16:
            episodeNo = shuffle(21);
            break;
        case 17:
            episodeNo = shuffle(22);
            break;
        case 18:
            episodeNo = shuffle(22);
            break;
        case 19:
            episodeNo = shuffle(20);
            break;
        case 20:
            episodeNo = shuffle(21);
            break;
        case 21:
            episodeNo = shuffle(23);
            break;
        case 22:
            episodeNo = shuffle(22);
            break;
        case 23:
            episodeNo = shuffle(22);
            break;
        case 24:
            episodeNo = shuffle(22);
            break;
        case 25:
            episodeNo = shuffle(22);
            break;
        case 26:
            episodeNo = shuffle(22);
            break;
        case 27:
            episodeNo = shuffle(22);
            break;
        case 28:
            episodeNo = shuffle(22);
            break;
        case 29:
            episodeNo = shuffle(21);
            break;
        case 30:
            episodeNo = shuffle(23);
            break;
        case 31:
            episodeNo = shuffle(22);
            break;
        case 32:
            episodeNo = shuffle(22);
            break;
        default:
            break;
    }



    
    changeTitle() //Change Page Title
    changeURL() // Change Page URL
    getThumb() //get thumbnail TMDB API
    getInfo() //get episode info TRAKT API
  

}


function shuffle(episodeCount) {
    return Math.floor(Math.random() * episodeCount) + 1;
}

function getThumb() {
    var thumbRequest = new XMLHttpRequest()
    thumbRequest.open('GET', `https://api.themoviedb.org/3/tv/456/season/${seasonNo}/episode/${episodeNo}/images?api_key=c29a0be0a66ccb06d2f19299493690ea`);
    thumbRequest.onload = () => {
        var thumbData = JSON.parse(thumbRequest.responseText)
        var imgURL = `https://image.tmdb.org/t/p/original/${thumbData.stills['0'].file_path}`
        document.getElementById('thumbnail').src = imgURL
    }
thumbRequest.send()
}

function getInfo() {
    var request = new XMLHttpRequest()

    request.open('GET', `https://api.trakt.tv/shows/the-simpsons/seasons/${seasonNo}/episodes/${episodeNo}/?extended=full`)

    request.setRequestHeader('content-Type', 'application/json');
    request.setRequestHeader('trakt-api-version', '2');
    request.setRequestHeader('trakt-api-key', 'ffb1dde1bf1f8c7a5654f98802ffea6c08e5684f476b5b3c6a7d73beecf82070')

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText)
            document.getElementById('title').innerHTML = response.title;
            document.getElementById('runtime').innerHTML = `${response.runtime} mins`;
            document.getElementById('rating').innerHTML = `${(response.rating).toFixed(1)}/10`;
            document.getElementById('seasonInfo').innerHTML = response.season;
            document.getElementById('episodeInfo').innerHTML = response.number;
            document.getElementById('overview').innerHTML = response.overview;
            var element = document.getElementById('info')

            if (element.classList.contains('hiden') == true) {
                element.classList.toggle('hiden')
            }
        }
    }
    request.send()
}


function changeTitle() {
    var pageTitle = `Random Mifflin | Season ${seasonNo} Episode ${episodeNo}`;
    document.title = pageTitle;
    console.log(pageTitle);
  }

function changeURL() {

    history.pushState(null, '', `?s=${seasonNo}&e=${episodeNo}`)
    pageURL = `?s=${seasonNo}&e=${episodeNo}`
}