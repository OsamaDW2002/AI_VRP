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

    getFullInfo(location,vehicle){
        let locBeforeAddress,locAfterAddress;
        if(vehicle[location].before === 0){
            locBeforeAddress = -1;
        }else if(vehicle[location].after === 0){
            locAfterAddress = -1;
        }
        for (let i = 0; i < vehicle.length; i++) {
            if(vehicle[i].id === vehicle[location].before){
                locBeforeAddress = i;
            }else if(vehicle[i].id === vehicle[location].after){
                locAfterAddress = i;
            }
        }
        return [locBeforeAddress , locAfterAddress];
    }

    drawOptimzeState(ctx, vehciles){
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < vehciles[i].length; j++) {
                const [locBeforeAddress, locAfterAddress]=this.getFullInfo( j , vehciles[i]);
                if(locBeforeAddress === -1 || locAfterAddress === -1){
                    drawPath(ctx,390,220,vehciles[i][j].x,vehciles[i][j].y);
                }
                if(locBeforeAddress > -1){
                    drawPath(ctx,vehciles[i][locBeforeAddress].x,vehciles[i][locBeforeAddress].y,vehciles[i][j].x,vehciles[i][j].y);
                }
                if(locAfterAddress > -1){
                    drawPath(ctx,vehciles[i][locAfterAddress].x,vehciles[i][locAfterAddress].y,vehciles[i][j].x,vehciles[i][j].y);
                }

            }
        }

    }

    drawInitialState(ctx, vehciles){
        for(let i = 0 ; i <= 10 ; i++){
           if(vehciles[i]){
               if (vehciles[i].length === 1){
                   drawPath(ctx,390,220,vehciles[i][0].x,vehciles[i][0].y);
               } else{
                   vehciles[i].sort((a, b) => a.before - b.before);
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
        }
        this.initialDistance = this.calculateDistance(vehciles);
        // console.log(this.initialDistance)

    }
    #distanceBetweenTwoPoints(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
    }
    calculateDistance(vehciles){
        let distance = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < vehciles[i].length; j++) {
                let [addressBefore, addressAfter] = this.getFullInfo(j, vehciles[i]);
                // console.log(addressAfter +'svsvs'+ addressBefore);
                if(addressBefore === -1 || addressAfter === -1){
                   distance += this.#distanceBetweenTwoPoints(390,220, vehciles[i][j].x, vehciles[i][j].y);
                }else {
                    distance += this.#distanceBetweenTwoPoints(vehciles[i][addressAfter].x, vehciles[i][addressAfter].y, vehciles[i][j].x, vehciles[i][j].y);
                }

            }
        }
        return distance;
    }
    chooseRandomVehcile(vehcile){
        let value = -1;
        do{
            value = Math.floor(Math.random() * 10);
        }while (vehcile[value].length >= 0 && vehcile[value].length <= 2)
        return value;
    }
    chooseRandomlyInSameVehcile(vehciles, vehcileNum){

        let value1 = Math.floor(Math.random() * vehciles[vehcileNum].length);
        let value2;
        do {
            value2 = Math.floor(Math.random() * vehciles[vehcileNum].length);

        if (value1 > value2) {
            [value1, value2] = [value2, value1];
        }
        } while (value1 === value2  || vehciles[vehcileNum][value1].after === vehciles[vehcileNum][value2].id || vehciles[vehcileNum][value2].before === vehciles[vehcileNum][value1].id || vehciles[vehcileNum][value1].before === vehciles[vehcileNum][value2].id || vehciles[vehcileNum][value2].after === vehciles[vehcileNum][value1].id);
        return [value1, value2];
    }
    // chooseDifferentValuesInDifferentVehciles(vehicle){
    //     if (!vehicle || vehicle.length === 0) return null;
    //     let index1, index2, value1, value2;
    //     do {
    //         index1 = Math.floor(Math.random() * vehicle.length);
    //         index2 = Math.floor(Math.random() * vehicle.length);
    //
    //         if (index1 !== index2 && vehicle[index1].length > 0 && vehicle[index2].length > 0) {
    //             value1 = vehicle[index1][Math.floor(Math.random() * vehicle[index1].length)];
    //             value2 = vehicle[index2][Math.floor(Math.random() * vehicle[index2].length)];
    //         }
    //     } while (value1 !== value2);
    //     return [value1, value2, index1, index2];
    // }
    switchLocationInSameVehicles(firstLocation, secondLocation, vehicle, vehcileNum){
        //
        // if( firstLocation !== 0) {
        //     vehicle[vehcileNum][vehicle[vehcileNum][firstLocation].before - 1].after = Number(vehicle[vehcileNum][vehicle[vehcileNum][firstLocation].after - 1].id) ?? Number(0);
        //     vehicle[vehcileNum][vehicle[vehcileNum][firstLocation].after - 1].before = Number(vehicle[vehcileNum][vehicle[vehcileNum][firstLocation].before - 1].id) ?? Number(0);
        //
        // }else{
        //     vehicle[vehcileNum][vehicle[vehcileNum][firstLocation].after - 1].before = 0;
        // }
        //
        // vehicle[vehcileNum][vehicle[vehcileNum][secondLocation].before - 1].after = Number(vehicle[vehcileNum][firstLocation].id) ;
        // vehicle[vehcileNum][firstLocation].before = vehicle[vehcileNum][secondLocation].before;
        //
        // vehicle[vehcileNum][firstLocation].after = Number(vehicle[vehcileNum][secondLocation].id) ;
        // vehicle[vehcileNum][secondLocation].before = Number(vehicle[vehcileNum][firstLocation].id);
        // console.log(vehicle)
        // return vehicle;
        const [firstLocBeforeAddress, firstLocAfterAddress]=this.getFullInfo(firstLocation , vehicle[vehcileNum]);
        const [secondLocBeforeAddress, secondLocAfterAddress]=this.getFullInfo(secondLocation , vehicle[vehcileNum]);

        const firstLocBefore = vehicle[vehcileNum][firstLocation].before;
        const secondLocBefore = vehicle[vehcileNum][secondLocation].before;

        const firstLocAfter = vehicle[vehcileNum][firstLocation].after;

        const firstLocId = vehicle[vehcileNum][firstLocation].id;
        const secondLocId = vehicle[vehcileNum][secondLocation].id;

        if(firstLocBefore === 0){
            vehicle[vehcileNum][firstLocAfterAddress].before = 0;
        }else{
            vehicle[vehcileNum][firstLocAfterAddress].before = firstLocBefore;
            vehicle[vehcileNum][firstLocBeforeAddress].after = firstLocAfter;
        }
        // console.log(secondLocBeforeAddress);
        if(secondLocBeforeAddress === -1){
            vehicle[vehcileNum][firstLocation].before = 0;
        }else {
            vehicle[vehcileNum][secondLocBeforeAddress].after = firstLocId;
            vehicle[vehcileNum][firstLocation].before = secondLocBefore;
        }

        vehicle[vehcileNum][firstLocation].after = secondLocId;
        vehicle[vehcileNum][secondLocation].before = firstLocId;

        // console.log("new order")
        // console.log(vehicle)
        return vehicle
    }


}
class coolingSys{
    constructor() {
        this._T = 1000;
        this._coolingRate = 0.9;
        this._minT = 0;

    }
    set minT(value) {
        this._minT = value;
    }
    get coolingRate() {
        return this._coolingRate;
    }

    set coolingRate(value) {
        this._coolingRate = value;
    }

    get minT() {
        return this._minT;
    }
    get T() {
        return this._T;
    }

    set T(value) {
        this._T = value;
    }

    coolingSystem(){
        this.T *= this.coolingRate;
    }

    checkIfDone(){
        return this.minT >=Math.floor(this.T);
    }


}

export {SimulatedAnnealing , coolingSys}