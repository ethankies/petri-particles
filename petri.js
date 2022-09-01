
particles=[]

particle = (x,y,c) =>{
    return{"x":x, "y": y, "vx":0, "vy":0, "color":c}
}

//randomly set intial position of particles
 randomPos=()=>{
    return Math.random()*400+50
 }
spawn=(num, color)=>{
    //create new set of particles
    console.log("breakpoint")
    group = []
    for(let i = 0; i < num; i++){
        group.push(particle(randomPos(), randomPos(), color))
        particles.push(group[i])
    }
    return group;
}

rule=(particleA, particleB, gravity)=>{
    for(let i = 0; i < particleA.length; i++){
        fx = 0;
        fy = 0;
        for(let j = 0; j < particleB.length; j++){
            a = particleA[i]
            b = particleB[j]
            dx = a.x - b.x
            dy = a.y - b.y
        
            d = Math.sqrt(dx*dx + dy*dy)
        
            if(d > 0 && d < 80){ //limit force to 80
                F = gravity * 1/d
                fx += (F * dx)
                fy += (F * dy)
            }
        
        }
            //increment velocity by applied force
            a.vx = (a.vx + fx) * 0.5
            a.vy = (a.vy + fy) * 0.5
            //update position
            a.x += a.vx
            a.y += a.vy

            //prevent particles from leaving screen
            if(a.x <= 0 || a.x >= 500){a.vx *= -1}
            if(a.y <= 0 || a.y >= 500){a.vy *= -1}
    }
   

   
}


function setup() {
   var cnv = createCanvas(500, 500);
    cnv.parent("canvas-container"); 
    yellow = spawn(50, "yellow")
    green = spawn(50, "green")    
   

  }
 
  function draw() {
    noStroke()
    rule(yellow, yellow, 1)
    rule(green, yellow, -1)


    background('lightcoral')
        particles.forEach(element=>{
            fill(element.color)
            circle(element.x, element.y, 10)
            
        }) 

  }

  //showcase capabilities : tutorial
function AttractTutorial(){
    rule(yellow, yellow, -1)
}

function RepelTutorial(){
    rule(yellow, yellow, 1)
}

//Reset reloads the page
var reset = document.getElementById("reset")
console.log("Found:"+reset)
reset.onclick = function(){
    console.log("Reload window...")
    window.location.reload();
}

//Restart puts the particles at random places
var restart = document.getElementById("restart")
console.log("Found:"+restart)
restart.onclick = function(){
    console.log("Restarting particles")
    for(var i = 0; i < particles.length; i++){    
        particles[i].x = randomPos();
        particles[i].y = randomPos();
    }
}

function getNewParticle(){
    var color = document.getElementById("color-picker").value;
    var numParticles  = document.getElementById("number-particles-add").value;
    var newParticle = spawn(numParticles, color);
    
    createDiv('this is some text');
div.style('font-size', '16px');
div.position(10, 0);
    console.log(newParticle);
}