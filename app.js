var clientId = 'c949c19103fe594d0013af94455a6052';
var auth     = '&client_id='+clientId;
var url      = 'https://api.soundcloud.com/';
var list     = document.querySelector('#track-list');
var form     = document.querySelector('#search-music');
var input    = document.querySelector('#keyword');


form.addEventListener('submit', function(event){
  event.preventDefault();
  list.innerHTML = '';
  
  var xhr = new XMLHttpRequest();
  var ul = document.createElement('ul');
  
  xhr.onreadystatechange = function(){
    if (xhr.readyState != 4) return;
    
    var tracks = JSON.parse(xhr.responseText);
  
    tracks.forEach(function(track){   
      var li = document.createElement('li');
      var audio = document.createElement('audio');

      var title = document.createElement('p');
      title.textContent = track.title;
      audio.controls = true;
      audio.autoplay = false;
      audio.preload = 'metadata';
      audio.src = track.stream_url+'?client_id='+clientId;
      li.appendChild(title);
      li.appendChild(audio);
      ul.appendChild(li);  
    });
    
    list.appendChild(ul);
    
  };
  
  xhr.open('GET', url + 'tracks?q=' + input.value + auth, true);
  xhr.send();
  
});

with(document){
  querySelectorAll('.open-voice-box').forEach(function(element, index) {
    element.onclick = function(){
      with (document){
        show(querySelector('.hider'));
        show(querySelector('.center'));
        show(querySelector('#search-music'));
      };

    };
  });

  querySelector('.close').onclick = function(){
    hide(querySelector('.hider'));
    hide(querySelector('.center'));
  };
}

function hide(e){
  with(e.classList){
    if (!contains('hidden'))
      add('hidden');
  }
};

function show(e){
  with(e.classList){
    if (contains('hidden'))
      remove('hidden');
  }
};

document.querySelector('#search').addEventListener('click', function(event){
  form.submit();
});


// SC.initialize({
//   client_id: clientId
// });

// SC.get('/tracks', {
//   q: 'd-pulse'
// }).then(function(tracks){
  
//   tracks.forEach(function(track){
    
//     tracksStreamUrl.push(track.stream_uri);
//     tracksId.push(track.id);
    
//     var li = document.createElement('li');
//     var audio = document.createElement('audio');

//     li.innerHTML = track.title;
//     audio.controls = true;
//     audio.autoplay = false;
//     audio.preload = 'none';
//     audio.src = track.stream_url+'?client_id='+clientId;
//     li.appendChild(audio);
//     list.appendChild(li);
    
//   });
  
// //   SC.stream('/tracks/'+tracksId[2]).then(function(player){
// //       player.play();
// //   });
  
// });
