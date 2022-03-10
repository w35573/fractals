window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //canvas settings
    ctx.fillStyle = "green";
    //round edges
    ctx.lineCap = "round";
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxLevel = 4;
    const branches = 2;

    let sides = 5;
    //determines depth of the fractal
    let scale = 0.5;
    let spread = 0.1;
    let color = 'hsl('+ Math.random()* 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders();
        drawFractal();
    });
    
    const slider_sides = document.getElementById('sides');
    const label_slides = document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders();
        drawFractal();
    });

/*
    //saves the recent copy of the canvas
    ctx.save();

    //to translate axis position
    //NOTE: All these properties when used many times will add up and give respective size
    ctx.translate(canvas.width / 2, canvas.height / 2);

    //scales the rectangle towards axis position
    //less value of any coordinates will result in more shifting towards axis and smaller size
    ctx.scale(1,1);

    //rotation point is top left corner
    ctx.rotate(0);
    //generates a rectangle
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
*/
    function drawBranch(level) {
        if(level > maxLevel) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        for (let index = 0; index < branches; index++) {
            ctx.save();
            ctx.translate(size - (size / branches) * index, 0);
            ctx.scale(scale, scale);
            
            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        }
    }

    function drawFractal() {
        //clears canvas every time we draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        }
        //restores the most recent copy of the canvas
        ctx.restore();
        randomizeButton.style.backgroundColor = color;
    }

    drawFractal();

/*
    for (let i = 0; i < sides; i++) {
        ctx.beginPath();
        //init position
        ctx.moveTo(0, 0);
        //final position
        ctx.lineTo(size, 0);
        //outlines the current path with current stroke fillStyle
        ctx.stroke();
        //rotates the canvas ==> takes value in radians
        ctx.rotate((Math.PI*2)/sides);
    }
*/


    function randomizeFractal() {
        sides = Math.floor(Math.random() * 7 + 2);
        //determines depth of the fractal
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
        lineWidth = Math.floor(Math.random() * 20 + 10);
    }

    randomizeButton.addEventListener('click', function () {
        randomizeFractal();
        updateSliders();
        drawFractal();
    });

    function resetFractals() {
        sides = 5;
        //determines depth of the fractal
        scale = 0.5;
        spread = 0.7;
        color = 'hsl(290, 100%, 50%)'
        lineWidth = 15;
    }
    resetButton.addEventListener('click', function () {
        resetFractals();
        updateSliders();
        drawFractal();
    });

    function updateSliders() {
        slider_spread.value = spread;
        label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);
        slider_sides.value = sides;
        label_slides.innerText = 'Slides: ' + sides;
    }

});