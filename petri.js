
particles = []
ids = [] // stores id of each type of particle
rules = []
ruleDivs = []
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

    var ruleDiv = createDiv("Rules");
    styleRule(ruleDiv)
    ruleDiv.style("font-weight", 'bold')

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
    styleDiv(div, newParticle[0].id)
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
    var ruleID = rules.length;
    var ida = document.getElementById("ida").value;
    var idb = document.getElementById("idb").value;;
    var g = document.getElementById("slider").value;
    rules.push([ids[ida], ids[idb], g, ruleID]);
    // var ruleDiv = createDiv([ids[ida][0], ids[idb][0], g])
    createRuleDiv()

}

function styleDiv(div, id) {
    div.style('font-size', '16px');
    div.style('font-family', fFamily)
    div.addClass(id)
    div.addClass("particle-id-div")

    div.parent('particle-holder')




    if (!(div.html() == "Particle ID")) {
        var btn = createButton('Remove')

        btn.addClass("close-button")
        btn.parent(div)
        btn.mousePressed(function () {
            //remove particle

            //remove every particle from particles with the id of id
            refreshParticles(id)

            //remove list of ids
            ids.splice(id, 1)

        })

    }


}

function styleRule(div, id1, id2) {
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
    if (!(div.class() == "undefined rule")) {
        var btn = createButton('Remove')
        btn.addClass("close-button")
        btn.parent(div)
        btn.mousePressed(function () {
            //remove particle
            //refreshRules(id1, id2, ruleDivs.indexOf(div))
            console.log(ruleDivs.indexOf(div))
            rules.splice([ruleDivs.indexOf(div)], 1)
            ruleDivs.splice([ruleDivs.indexOf(div)], 1)
            function removeDiv() {
                var els = document.getElementsByClassName("rule");
                for (var i = 0; i < els.length; i++) {
                    els[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        e.target.closest('div.rule').remove();
                    });
                }
            }
            removeDiv();
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


    var ruleDiv = createDiv(color1 + " >>> " + color2 + " " + round(g, 2) + 'g')
    //rules[0] is the first rule
    //[0][0][0] is the first particle in first rule
    //[0][0][1] is the second particle in first rule
    //[0][2] is the g  in first rule

    styleRule(ruleDiv, rules[rules.length - 1][0][0].id, rules[rules.length - 1][1][0].id)
    ruleDivs.push(ruleDiv)
    console.log(ruleDivs)
}

function refreshParticles(id) {
    //after particle is removed, we need to refresh
    var counter = 0
    for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].id == id) {

            particles.splice(i, 1)
            counter++
        }
    }

    const elements = document.getElementsByClassName(id);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

}


function refreshRules() {

    const rules = document.querySelectorAll('.rule:not(.undefined)');

    rules.forEach(box => {
        console.log()

        box.remove();
    });

    const particles = document.querySelectorAll('.particle-id-div:not(.undefined)');

    particles.forEach(box => {
        console.log()

        box.remove();
    });

}


// rules.forEach(rule => {
//     if (rule[0][0].id == id2 || rule[1][0].id == id2) {
//         rules.splice(rules.indexOf(rule), 1)

//         function setup() {
//             var els = document.getElementsByClassName("rule");
//             for (var i = 0; i < els.length; i++) {
//                 els[i].addEventListener('click', function (e) {
//                     e.preventDefault();
//                     e.target.closest('div.rule').remove();
//                     //e.target.closest('.image').remove();

//                     //this will not work on 2 last images cause parent div will be deleted 
//                     //leaving an empty <div class="image"></div> for each removed item

//                     //e.target.closest('div').remove();
//                 });
//             }
//         }
//         setup();
//     }
// })





//clear all particles and rules
// add new particles and new rules
// mechanism to switch between presets

//rules array that needs to be cleared
//particles array that needs to be cleared

//various arrays that act as presets that can be pushed into particle and rule arrays

function SwitchToPreset(preset) {
    //preset can be 0, 1, 2, 3, 4

    //First remove all particles, ids, and rules
    ClearArrays()
    refreshRules()


    //detect which case and assign new rules
    switch (preset) {
        case 0:
            /* Nucleus */
            pone = spawn(100, '#aa5042', 0)
            ptwo = spawn(100, '#d8bd8a', 1)
            rules.push([pone, pone, -0.1]);
            createRuleDiv()
            rules.push([pone, ptwo, -0.01]);
            createRuleDiv()
            rules.push([ptwo, pone, 0.01]);
            createRuleDiv()

            ids[0] = pone;
            ids[1] = ptwo;

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + pone[0].id + " (" + color + ")");
            styleDiv(div, pone[0].id)


            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + ptwo[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)


            break;
        case 1:
            /*flying machine shape*/
            pone = spawn(200, '#adc698', 0)
            ptwo = spawn(200, '#d0e3c4', 1)
            pthree = spawn(200, '#503047', 2)

            ids[0] = pone
            ids[1] = ptwo
            ids[2] = pthree

            rules.push([pone, pone, -0.32]);
            createRuleDiv()
            rules.push([pone, ptwo, -0.17]);
            createRuleDiv()
            rules.push([pone, pthree, 0.34]);
            createRuleDiv()
            rules.push([ptwo, ptwo, -0.10]);
            createRuleDiv()
            rules.push([pone, pone, -0.34]);
            createRuleDiv()
            rules.push([pthree, pthree, 0.15]);
            createRuleDiv()
            rules.push([pthree, pone, -0.20]);
            createRuleDiv()

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + pone[0].id + " (" + color + ")");
            styleDiv(div, pone[0].id)

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + ptwo[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)

            var match = ntc.name(ids[2][0].color);
            color = match[1];

            var div = createDiv("Particle #" + pthree[0].id + " (" + color + ")");
            styleDiv(div, pthree[0].id)
            break;

        case 2:
            // new creation hehe
            one = spawn(200, '#f4c92f' , 0)
            two = spawn(100, '#82da1c'  , 1)
            three = spawn(200, '#17ba6e' , 2)
            four = spawn(100, '#8499eb', 3)

            ids[0] = one;
            ids[1] = two;
            ids[2] = three;
            ids[3] = four;

            rules.push([one, two, 0.05]);
            createRuleDiv()
            rules.push([two, three, 0.05]);
            createRuleDiv()
            rules.push([three, four, 0.05]);
            createRuleDiv()
             rules.push([four, one, 0.05]);
             createRuleDiv()
            // rules.push([four, four, 0.04]);
            // createRuleDiv()
            // rules.push([three, three, 0.15]);
            // createRuleDiv()
            // rules.push([two, two, 0.01]);
            // createRuleDiv()

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + one[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + two[0].id + " (" + color + ")");
            styleDiv(div, two[0].id)

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + three[0].id + " (" + color + ")");
            styleDiv(div, three[0].id)

            var match = ntc.name(ids[2][0].color);
            color = match[1];

            var div = createDiv("Particle #" + four[0].id + " (" + color + ")");
            styleDiv(div, four[0].id)
            break;
        case 3:
            // new creation hehe
            one = spawn(200, '#f4c92f' , 0)
            two = spawn(100, '#82da1c'  , 1)
            three = spawn(200, '#17ba6e' , 2)
            four = spawn(100, '#8499eb', 3)

            ids[0] = one;
            ids[1] = two;
            ids[2] = three;
            ids[3] = four;

            rules.push([one, two, 0.05]);
            createRuleDiv()
            rules.push([two, three, 0.05]);
            createRuleDiv()
            rules.push([three, four, 0.05]);
            createRuleDiv()
             rules.push([four, one, 0.05]);
             createRuleDiv()
            // rules.push([four, four, 0.04]);
            // createRuleDiv()
            // rules.push([three, three, 0.15]);
            // createRuleDiv()
            // rules.push([two, two, 0.01]);
            // createRuleDiv()

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + one[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + two[0].id + " (" + color + ")");
            styleDiv(div, two[0].id)

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + three[0].id + " (" + color + ")");
            styleDiv(div, three[0].id)

            var match = ntc.name(ids[2][0].color);
            color = match[1];

            var div = createDiv("Particle #" + four[0].id + " (" + color + ")");
            styleDiv(div, four[0].id)
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            // new creation hehe
            one = spawn(200, '#f4c92f' , 0)
            two = spawn(100, '#82da1c'  , 1)
            three = spawn(200, '#17ba6e' , 2)
            four = spawn(100, '#8499eb', 3)

            ids[0] = one;
            ids[1] = two;
            ids[2] = three;
            ids[3] = four;

            rules.push([one, one, 0.05]);
            createRuleDiv()
            rules.push([two, two, 0.05]);
            createRuleDiv()
            rules.push([three, three, -0.05]);
            createRuleDiv()
             rules.push([four, four, -0.05]);
             createRuleDiv()
             rules.push([two, three, 0.1]);
             createRuleDiv()
             rules.push([three, three, 0.05]);
             createRuleDiv()
             rules.push([one, four, -0.1]);
             createRuleDiv()

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + one[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + two[0].id + " (" + color + ")");
            styleDiv(div, two[0].id)

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + three[0].id + " (" + color + ")");
            styleDiv(div, three[0].id)

            var match = ntc.name(ids[2][0].color);
            color = match[1];

            var div = createDiv("Particle #" + four[0].id + " (" + color + ")");
            styleDiv(div, four[0].id)
            break;
        case 6:
            /*Random*/
            one = spawn(random(2, 200), '#' + Math.floor(Math.random() * 16777215).toString(16), 0)
            two = spawn(random(2, 200), '#' + Math.floor(Math.random() * 16777215).toString(16), 1)
            three = spawn(random(2, 200), '#' + Math.floor(Math.random() * 16777215).toString(16), 2)
            four = spawn(random(50, 400), '#' + Math.floor(Math.random() * 16777215).toString(16), 3)

            ids[0] = one;
            ids[1] = two;
            ids[2] = three;
            ids[3] = four;

            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()
            rules.push([random(ids), random(ids), random(-1, 1)]);
            createRuleDiv()

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + one[0].id + " (" + color + ")");
            styleDiv(div, ptwo[0].id)

            var match = ntc.name(ids[0][0].color);
            color = match[1];

            var div = createDiv("Particle #" + two[0].id + " (" + color + ")");
            styleDiv(div, two[0].id)

            var match = ntc.name(ids[1][0].color);
            color = match[1];

            var div = createDiv("Particle #" + three[0].id + " (" + color + ")");
            styleDiv(div, three[0].id)

            var match = ntc.name(ids[2][0].color);
            color = match[1];

            var div = createDiv("Particle #" + four[0].id + " (" + color + ")");
            styleDiv(div, four[0].id)

    }
    console.log(preset)
}

function ClearArrays() {
    rules = []
    particles = []
    ids = []
}
