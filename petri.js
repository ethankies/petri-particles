
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
                F = (gravity * 1) / d
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


var fFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

function setup() {
   var cnv = createCanvas(500, 500);

   console.log(color(random(0,255), random(0,255), random(0,255)).toString())
//spawn can only take a hex or a string
    cnv.parent("canvas-container"); 
    pone = spawn(200, '#' + Math.floor(Math.random()*16777215).toString(16), 0)
    ptwo = spawn(200, '#' + Math.floor(Math.random()*16777215).toString(16), 1)    
    ids[0] = pone;
    ids[1] = ptwo;
    //Add elems to div
    var div = createDiv("Particle ID");
    div.style('font-weight', 'bold')
    styleDiv(div);
    for(var i = 0; i < ids.length; i++){
    var match = ntc.name(ids[i][0].color);
    color = match[1];

    var div = createDiv("Particle #" + i + " (" + color +")");
       styleDiv(div)

    }

   // rule(yellowP, yellowP, 1)
   // rule(greenP, yellowP, 1)

    var ruleDiv = createDiv("Rules");
    styleRule(ruleDiv)
    ruleDiv.style("font-weight", 'bold')

   // rules.push([yellowP, yellowP, (random() - 0.25)]);
    
    //createRuleDiv()

    //rules.push([greenP, yellowP, random() - 0.5]);
    //createRuleDiv()

    /* Nucleus */
    rules.push([pone, pone, -0.1]);
    createRuleDiv()
    rules.push([pone, ptwo, -0.01]);
    createRuleDiv()
    rules.push([ptwo, pone, 0.01]);
    createRuleDiv()


    /*flying machine shape*/
    // pthree = spawn(50, '#' + Math.floor(Math.random()*16777215).toString(16), 2)
    // ids[2]
    // rules.push([pone, pone, -0.32]);
    // createRuleDiv()
    // rules.push([pone, ptwo, -0.17]);
    // createRuleDiv()
    // rules.push([pone, pthree, 0.34]);
    // createRuleDiv()
    // rules.push([ptwo, ptwo, -0.10]);
    // createRuleDiv()
    // rules.push([pone, pone, -0.34]);
    // createRuleDiv()
    // rules.push([pthree, pthree, 0.15]);
    // createRuleDiv()
    // rules.push([pthree, pone, -0.20]);
    // createRuleDiv()
    
  }
 
  function draw() {
    noStroke()
    rules.forEach(element => {
        rule(element[0], element[1], element[2])
    });
    //array of rules
    //arr[0] = {yellowP, yellowP, 1}
    //foreach rule(arr[i][0])
    background('rgb(28, 28, 30)')
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

//clear reloads the page
var clearButton = document.getElementById("clear-button")
clearButton.onclick = function(){
    console.log("Reload window...")
    window.location.reload();
}

//reset puts the particles at random places
var resetButton = document.getElementById("reset")
resetButton.onclick = function(){
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
    console.log(color)
    if(color.charAt(0) == '#'){
        //convert from hex to string with ntc
        var match = ntc.name(color);
        color = match[1];

    
      }
  //  var n_match = ntc.name(color);

    var div = createDiv("Particle #" + newParticle[0].id + " (" + color + ")");
    styleDiv(div)
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
   // var ruleDiv = createDiv([ids[ida][0], ids[idb][0], g])
   createRuleDiv()

}

function styleDiv(div){
    div.style('font-size', '16px');
    div.style('font-family', fFamily)
    
    div.style('color', '#3D3D3D')
    div.parent('particle-holder')
}

function styleRule(div){
    div.style('font-size', '16px');
    div.style('font-family', fFamily)

    div.style('border-bottom', '3px dotted rgb(0, 122, 255)')
    div.style('padding-bottom', '5px')
    div.style('color', '#3D3D3D')
    div.parent('rule-holder')
}

function createRuleDiv(){
 var g = rules[rules.length-1][2]

  var color1 = rules[rules.length-1][0][0].color
  var color2 = rules[rules.length-1][1][0].color
  if(color1.charAt(0) == '#'){
    //convert from hex to string with ntc
    var match = ntc.name(color1);
    color1 = match[1];

  }
  if(color2.charAt(0) == '#'){
    //convert from hex to string with ntc
    var match = ntc.name(color2);
    color2 = match[1];

  }


   var ruleDiv = createDiv(color1 + " <> "  + color2 + " " + round(g, 2)+'g')
    //rules[0] is the first rule
    //[0][0][0] is the first particle in first rule
    //[0][0][1] is the second particle in first rule
    //[0][2] is the g  in first rule
    styleRule(ruleDiv)
}
