
particles=[]
ids = [] // stores id of each type of particle
rules = []
particle = (x,y,c, id) =>{
    return{"x":x, "y": y, "vx":0, "vy":0, "color":c, "id":id}
}

//randomly set intial position of particles
 randomPos=()=>{
    return Math.random()*400+50
 }
spawn=(num, color, id)=>{
    //create new set of particles
    group = []
    for(let i = 0; i < num; i++){
        group.push(particle(randomPos(), randomPos(), color, id))
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
   textFont('-apple-system');
    cnv.parent("canvas-container"); 
    yellowP = spawn(50, "yellow", 0)
    greenP = spawn(50, "green", 1)    
    ids[0] = yellowP;
    ids[1] = greenP;
    //Add elems to div
    for(var i = 0; i < ids.length; i++){

        var div = createDiv("Particle #" + i + " (" + ids[i][0].color+")");
        div.style('font-size', '16px');
        div.parent('particle-holder')

    }

   // rule(yellowP, yellowP, 1)
   // rule(greenP, yellowP, 1)

    rules.push([yellowP, yellowP, 1]);
    rules.push([greenP, yellowP, 1]);

   

  }
 
  function draw() {
    noStroke()
    rules.forEach(element => {
        rule(element[0], element[1], element[2])
    });
    //array of rules
    //arr[0] = {yellowP, yellowP, 1}
    //foreach rule(arr[i][0])
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
var resetButton = document.getElementById("reset-button")
resetButton.onclick = function(){
    console.log("Reload window...")
    window.location.reload();
}

//Restart puts the particles at random places
var restart = document.getElementById("restart")
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
    if(numParticles < 1 || numParticles == null){
        console.log("Enter valid number of particles")
        return;
    }
    var newParticle = spawn(numParticles, color, ids.length);
    
    var n_match = ntc.name(color);

  

    var div = createDiv("Particle #" + newParticle[0].id + " (" + n_match[1] + ")");
    div.style('font-size', '16px');
    div.parent('particle-holder')
   
    ids.push(newParticle)
}


function removeParticle(){
    var particleID;// = document.getElementById("color-picker").value;
    //ids.splice(particleID);
}
var addRuleButton = document.getElementById("submit-rule")
addRuleButton.onclick = function(){
    getNewRule()
}
function getNewRule(){
    var ida = document.getElementById("ida").value;
    var idb = document.getElementById("idb").value;;

    

    var g = document.getElementById("slider").value;


    rules.push([ids[ida], ids[idb], g]);
}