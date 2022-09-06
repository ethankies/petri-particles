
particles = []
ids = [] // stores id of each type of particle
rules = []
particle = (x, y, c, id) => {
    return { "x": x, "y": y, "vx": 0, "vy": 0, "color": c, "id": id }
}

//randomly set intial position of particles
randomPos = () => {
    return Math.random() * 400 + 50
}
spawn = (num, color, id) => {
    //create new set of particles
    group = []
    for (let i = 0; i < num; i++) {
        group.push(particle(randomPos(), randomPos(), color, id))
        particles.push(group[i])
    }
    return group;
}

rule = (particleA, particleB, gravity) => {
    for (let i = 0; i < particleA.length; i++) {
        fx = 0;
        fy = 0;
        for (let j = 0; j < particleB.length; j++) {
            a = particleA[i]
            b = particleB[j]
            dx = a.x - b.x
            dy = a.y - b.y

            d = Math.sqrt(dx * dx + dy * dy)

            if (d > 0 && d < 80) { //limit force to 80
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
        if (a.x <= 0 || a.x >= 500) { a.vx *= -1 }
        if (a.y <= 0 || a.y >= 500) { a.vy *= -1 }
    }



}


var fFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

function setup() {
    //create canvas
    var cnv = createCanvas(500, 500);


    //spawn can only take a hex or a string
    cnv.parent("canvas-container");

    pone = spawn(200, '#' + Math.floor(Math.random() * 16777215).toString(16), 0)
    ptwo = spawn(200, '#' + Math.floor(Math.random() * 16777215).toString(16), 1)
    ids[0] = pone;
    ids[1] = ptwo;

    //Add elems to div
    var div = createDiv("Particle ID");
    div.style('font-weight', 'bold')
    styleDiv(div);
    for (var i = 0; i < ids.length; i++) {
        var match = ntc.name(ids[i][0].color);
        color = match[1];

        var div = createDiv("Particle #" + i + " (" + color + ")");
        styleDiv(div, i)
        

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
    // rules.push([pone, pone, -0.1]);
    // createRuleDiv()
    // rules.push([pone, ptwo, -0.01]);
    // createRuleDiv()
    // rules.push([ptwo, pone, 0.01]);
    // createRuleDiv()


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
    particles.forEach(element => {
        fill(element.color)
        circle(element.x, element.y, 10)

    })

}

//showcase capabilities : tutorial
function AttractTutorial() {
    rule(yellow, yellow, -1)
}

function RepelTutorial() {
    rule(yellow, yellow, 1)
}

//clear reloads the page
// var clearButton = document.getElementById("clear-button")
// clearButton.onclick = function(){
//     console.log("Reload window...")
//     window.location.reload();
// }

//reset puts the particles at random places
var resetButton = document.getElementById("reset")
resetButton.onclick = function () {

    for (var i = 0; i < particles.length; i++) {
        particles[i].x = randomPos();
        particles[i].y = randomPos();
    }

}

function getNewParticle() {

    var color = document.getElementById("color-picker").value;
    var numParticles = document.getElementById("number-particles-add").value;
    if (numParticles < 1 || numParticles == null) {
        console.log("Enter valid number of particles")
        return;
    }
    var newParticle = spawn(numParticles, color, ids.length);
    console.log(color)
    if (color.charAt(0) == '#') {
        //convert from hex to string with ntc
        var match = ntc.name(color);
        color = match[1];


    }

    var div = createDiv("Particle #" + newParticle[0].id + " (" + color + ")");
    styleDiv(div,newParticle[0].id)
    ids.push(newParticle)
    
    
}


function removeParticle() {
    var particleID;// = document.getElementById("color-picker").value;
    //ids.splice(particleID);
}
var addRuleButton = document.getElementById("submit-rule")
addRuleButton.onclick = function () {
    getNewRule()
}
function getNewRule() {
    var ida = document.getElementById("ida").value;
    var idb = document.getElementById("idb").value;;
    var g = document.getElementById("slider").value;
    rules.push([ids[ida], ids[idb], g]);
    // var ruleDiv = createDiv([ids[ida][0], ids[idb][0], g])
    createRuleDiv()

}

function styleDiv(div,id) {
    div.style('font-size', '16px');
    div.style('font-family', fFamily)
    div.addClass(id)


    div.parent('particle-holder')

  

    console.log(div.html() == "Particle ID")
    if(!(div.html() == "Particle ID")){
        var btn = createButton('x')
        btn.parent(div)
        btn.mousePressed(function(){
            //remove particle
            alert(id)
        
            //remove every particle from particles with the id of id
            refreshParticles(id)  
            
            //remove list of ids
            ids.splice(id,1)

        })

    }

 
}

function styleRule(div,id1, id2) {
    div.style('font-size', '16px');
    div.style('font-family', fFamily)

    div.style('border-bottom', '3px dotted rgb(0, 122, 255)')
    div.style('padding-bottom', '5px')
    //   div.style('color', '#3D3D3D')
    div.parent('rule-holder')
    div.addClass(id1)
    div.addClass(id2)
    div.addClass("rule")

    console.log(rules)
    if(!(div.class() == "undefined")){
        var btn = createButton('x')
        btn.parent(div)
        btn.mousePressed(function(){
            //remove particle
          
        
            refreshRules(id1, id2)

        })

    }
   
}

function createRuleDiv() {
    var g = rules[rules.length - 1][2]

    var color1 = rules[rules.length - 1][0][0].color
    var color2 = rules[rules.length - 1][1][0].color
    if (color1.charAt(0) == '#') {
        //convert from hex to string with ntc
        var match = ntc.name(color1);
        color1 = match[1];

    }
    if (color2.charAt(0) == '#') {
        //convert from hex to string with ntc
        var match = ntc.name(color2);
        color2 = match[1];

    }


    var ruleDiv = createDiv(color1 + " <> " + color2 + " " + round(g, 2) + 'g')
    //rules[0] is the first rule
    //[0][0][0] is the first particle in first rule
    //[0][0][1] is the second particle in first rule
    //[0][2] is the g  in first rule

    styleRule(ruleDiv, rules[rules.length - 1][0][0].id,  rules[rules.length - 1][1][0].id)

}

function refreshParticles(id){
    //after particle is removed, we need to refresh
    var counter = 0
    for(var i =  particles.length -1; i >= 0; i--){
        if(particles[i].id == id){

            particles.splice(i, 1)
           counter++       
        }
    }

    const elements = document.getElementsByClassName(id);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    
}


function refreshRules(id1, id2){
    

    rules.forEach(rule =>{
        if(rule[0][0].id == id1 || rule[1][0].id == id1 ){
            rules.splice(rules.indexOf(rule),1)

            const elements = document.getElementsByClassName("rule"+id);
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    })

    
    rules.forEach(rule =>{
        if(rule[0][0].id == id2 || rule[1][0].id == id2){
            rules.splice(rules.indexOf(rule),1)
        }
    })


}