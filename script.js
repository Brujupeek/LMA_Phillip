window.onload = function() {
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);

    setTimeout(function() {
        document.getElementById('greeting').classList.add('hidden');
        var nameElement = document.getElementById('name');
        nameElement.classList.remove('hidden');
        nameElement.style.fontSize = '5em';
        var colors = ['green', 'purple', 'red', 'blue', 'yellow', 'orange', 'pink', 'cyan', 'magenta', 'lime'];
        var i = 0;
        var colorChangeInterval = 500;
        var colorChange = setInterval(function() {
            nameElement.style.color = colors[i % colors.length];
            i++;
            if (colorChangeInterval > 50) {
                colorChangeInterval -= 50;
                clearInterval(colorChange);
                colorChange = setInterval(function() {
                    nameElement.style.color = colors[i % colors.length];
                    i++;
                }, colorChangeInterval);
            }
        }, colorChangeInterval);

        // Start the background image cycle
        startBackgroundImageCycle();
        startPhotoCycle(); // Start the photo cycle

        // Hide the arrow when "PHILLIP" appears
        var arrowElement = document.getElementById('arrow');
        arrowElement.style.opacity = '0';

        // Play the songs when the user clicks anywhere on the page
        var songs = ['song1.mp3', 'song2.mp3', 'song3.wav', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3'];
        var playSongs = function() {
            songs.forEach(function(song, index) {
                var audio = new Audio(song);
                audio.volume = (index + 1) / songs.length; // Increase volume for each song
                audio.play();
            });
            // Remove the event listener after the songs have been played
            document.body.removeEventListener('click', playSongs);
        };
        document.body.addEventListener('click', playSongs);
    }, 1800);

    document.getElementById('enterButton').addEventListener('click', function() {
        var audio = document.getElementById('confettiSound');
        audio.play();
    });
};

function startBackgroundImageCycle() {
    var images = ['img/img1.png', 'img/img2.png', 'img/img3.png', 'img/img4.png', 'img/img5.png', 'img/img6.png', 'img/img7.png', 'img/img8.png', 'img/img9.png'];
    var backgroundElement = document.getElementById('backgroundImage');
    var imageIndex = 0;

    function changeBackgroundImage() {
        backgroundElement.style.backgroundImage = 'url(' + images[imageIndex] + ')';
        imageIndex = (imageIndex + 1) % images.length;
    }

    changeBackgroundImage(); // Set the initial background image

    setInterval(changeBackgroundImage, 2000); // Change the background image every 2 seconds
}

function startPhotoCycle() {
    var photos = document.getElementsByClassName('photo');
    var photoDelay = 300;
    var photoIndex = 0;
    var photoInterval = setInterval(function() {
        photos[photoIndex].classList.remove('hidden');
        photoIndex++;
        if (photoIndex >= photos.length) {
            clearInterval(photoInterval);
        }
    }, photoDelay);
}
