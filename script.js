

//clean
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

leftButton.addEventListener('click', function() {
    this.disabled=true;
    rightButton.disabled=true;
    showRandomImage();
    fetchCatImage();
    setTimeout(() => {
        this.disabled=false;
        rightButton.disabled=false;
    },1200);
  
});

rightButton.addEventListener('click', function() {
    this.disabled=true;
    leftButton.disabled=true;
    setTimeout(() => {
        this.disabled=false;
        leftButton.disabled=false;
    },1200);
    showRandomImage(true);
    fetchCatImage();
  
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        document.getElementById('rightButton').click();
    }
    else if (event.key === 'ArrowRight' ) {
        document.getElementById('leftButton').click();      
    }
});

document.addEventListener("DOMContentLoaded", function(event) {fetchCatImage()})
function fetchCatImage() {
    const apiKey = 'live_bBbF7OFOfNn3WL4rQ2uwAicMz3I2AtfNC9PqPEcSt0QHF7SjwQVsjZ1sTj2xmJHM';
    const url = 'https://api.thecatapi.com/v1/images/search';

    fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const imageUrl = data[0].url; // Get the URL of the first image in the response
        document.getElementById('overlayImage').src = imageUrl;
    })
    .catch(error => {
        console.error('Error fetching image:', error);
    });
}

function randomBomb(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function startShakeAnimation() {
    var element = document.getElementById("overlayImage");
    element.classList.add("nukeEffect");
}
function stopShakeAnimation() {
    var element = document.getElementById("overlayImage");
    element.classList.remove("nukeEffect");
}


//Im tired
function showRandomImage(love) {
    const gifOverlay = document.getElementById('gifOverlay');
    const effect = document.getElementById('effect');
    var randomImagePath;
    var nukeEffect;
    if(!love){
        // Get a random image path for a bomb
        randomImagePath = 'media\\bomb' + randomBomb(1,5) + '.gif';
        startShakeAnimation();
    }
    else{
        // Get a random image path for hearts
         randomImagePath = 'media\\love' + randomBomb(1,5) + '.gif';
    }


    // Set the random image path as the source for the overlay image
    gifOverlay.src = randomImagePath;

    effect.style.display = 'flex';
    effect.style.z-index = '9999';

    // Automatically hide the overlay after 1.2 seconds
    setTimeout(function () {
        stopShakeAnimation();
        effect.style.display = 'none';
        effect.style.z-index = '-9999';
    }, 1200);
}

// custom cursor
var playground = [
  document.getElementById('overlayImage'),
  document.getElementById('gifOverlay'),
];

var cursorArray = ['url("cursor/0.gif"), auto',
                   'url("cursor/1.gif"), auto',
                   'url("cursor/2.gif"), auto',
                   'url("cursor/3.gif"), auto',
                   'url("cursor/4.gif"), auto',];
i = 0;
(function cursor(){
  playground[0].style.cursor  = cursorArray[i];
  playground[1].style.cursor  = cursorArray[i];
  i++;
  if(i == cursorArray.length){
    i = 0; 
  }
   setTimeout(cursor, 50);
})();