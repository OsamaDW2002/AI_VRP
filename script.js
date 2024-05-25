import {Vehicles} from "./Vehicle.js";
import {Locations} from "./Locations.js";
import {SimulatedAnnealing} from "./SimulatedAnnealing.js";
/*
*
* add constant location for the depot
*
*
* */


function drawNodes(ctx,x,y,weight){
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.zIndex = 5;
    ctx.fillStyle = 'lightgray';
    ctx.fill();
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(weight, x, y);
}
function drawDepot(img, ctx,src){
    img.onload = () => {
        ctx.drawImage(img,390,220,50,50);
    };
    img.src = src;
}
function drawPath(ctx, xdes, ydes, xsrc, ysrc){
    ctx.beginPath();
    ctx.zIndex = 0;
    ctx.moveTo(xsrc, ysrc);  // Move the pen to (100, 100)
    ctx.lineTo(xdes, ydes);
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawPathWithAnimation(ctx, xdes, ydes, xsrc, ysrc){
    let currentX = xsrc;
    let currentY = ysrc;

    function animate() {
        drawPath(ctx, xsrc, ysrc, currentX, currentY);

        // Update currentX and currentY towards xdes and ydes
        if (currentX < xdes) currentX++;
        if (currentY < ydes) currentY++;

        // Continue the animation if we haven't reached the destination
        if (currentX <= xdes && currentY <= ydes) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", function() {

    let vehicle = new Vehicles();
    let simAnneal = new SimulatedAnnealing();
    const initPath = document.getElementById("initPath");
    const canvasNodes = document.getElementById('canvasNodes');
    const ctxNodes = canvasNodes.getContext('2d');
    const canvasPath = document.getElementById('canvasPath');
    const ctxPath = canvasPath.getContext('2d');

    drawDepot(new Image(), ctxNodes, "Depot.jpg");
    canvasNodes.addEventListener('click', function(event) {
                const rect = this.getBoundingClientRect();
                // console.log(event.clientY +" " +rect.top)
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const weight = Math.floor(Math.random() * 51);
            if(vehicle.addLocationToVehicle(new Locations(0, x, y, 0, 0, weight))) {
                drawNodes(ctxNodes,x,y,weight);
            }else {
                /*show message that the node is out of boundaries demand or */
            }

    });


    initPath.addEventListener('click', ()=>{
        canvasNodes.style.zIndex = "1";
        simAnneal.drawInitialState(ctxPath, vehicle.vehicles);
        document.getElementById("initialDistance").innerHTML = simAnneal.calculateDistance(vehicle.vehicles);
    });
});

export {drawPath};