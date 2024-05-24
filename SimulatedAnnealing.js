import {Vehicles} from "./Vehicle.js";
import {drawPath} from "./script.js";
class SimulatedAnnealing{
    constructor(){

        this._initialDistance = 0;
        this._currentDistance = 0;
        this._bestDistance = 0;
        this._nextDistance = 0;
    }
    get initialDistance() {
        return this._initialDistance;
    }

    set initialDistance(value) {
        this._initialDistance = value;
    }

    get currentDistance() {
        return this._currentDistance;
    }

    set currentDistance(value) {
        this._currentDistance = value;
    }

    get bestDistance() {
        return this._bestDistance;
    }

    set bestDistance(value) {
        this._bestDistance = value;
    }

    get nextDistance() {
        return this._nextDistance;
    }

    set nextDistance(value) {
        this._nextDistance = value;
    }

    drawInitialState(ctx, vehciles){
        for(let i = 0 ; i <= 10 ; i++){
           if(vehciles[i]){
                vehciles[i].sort((a,b) => {a.before - b.before});
                // console.log(vehciles[i])
                for (let j = 0; j < vehciles[i].length; j++) {
                    if(vehciles[i][j].before === 0){
                        drawPath(ctx,390,220,vehciles[i][j].x,vehciles[i][j].y);
                        drawPath(ctx,vehciles[i][j + 1].x,vehciles[i][j + 1].y,vehciles[i][j].x,vehciles[i][j].y);

                    }else if(vehciles[i][j].after === 0){
                        drawPath(ctx,vehciles[i][j - 1].x,vehciles[i][j - 1].y,vehciles[i][j].x,vehciles[i][j].y);
                        drawPath(ctx,390,220,vehciles[i][j].x,vehciles[i][j].y);
                    } else{
                        drawPath(ctx,vehciles[i][j + 1].x,vehciles[i][j + 1].y,vehciles[i][j].x,vehciles[i][j].y);
                        drawPath(ctx,vehciles[i][j - 1].x,vehciles[i][j - 1].y,vehciles[i][j].x,vehciles[i][j].y);
                    }
                }
           }
        }
        this.calculateDistance(vehciles);
    }
    #distanceBetweenTwoPoints(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
    }
    calculateDistance(vehciles){
        for (let i = 0; i < 10; i++) {
            for (let j = 1; j < vehciles[i].length; j++) {

                this.initialDistance += this.#distanceBetweenTwoPoints(vehciles[i][j].x, vehciles[i][j].y, vehciles[i][j-1].x, vehciles[i][j-1].y);
                if(j ===vehciles[i][vehciles[i].length - 1]) this.initialDistance += this.#distanceBetweenTwoPoints(vehciles[i][j].x, vehciles[i][j].y, 390, 220);

            }
        }
        this.currentDistance = this.initialDistance;
        return this.initialDistance;
    }

}


export {SimulatedAnnealing}