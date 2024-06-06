import {Locations} from "./Locations.js";
class Vehicles{
     constructor() {
         this.maxCapacity = new Array(10).fill(0);
         this.vehicles = new Array(10).fill(null).map(() => []);
         this._locationID = 1;
     }
     #isFull(vehicleNumber, demand){
         return this.maxCapacity[vehicleNumber] + demand > 100;
     }

     #connectWithLastNode(vehicleNum, location) {
         this.vehicles[vehicleNum][this.vehicles[vehicleNum].length - 1].after = this._locationID - 1;
     }
     #getBefore(location, vehicleNum){

         if(this.vehicles[vehicleNum].length === 0){
            return 0;
        }else{
            this.#connectWithLastNode(vehicleNum, location);
            return this.vehicles[vehicleNum][this.vehicles[vehicleNum].length - 1].id;
        }
     }
    printc() {
        // for (let i = 0; i < 10; i++) {
        //     for (const vehicleKey of this.vehicles[i]) {
        //         console.log( "array num "+i+"----"+vehicleKey.id +"-----"+vehicleKey.x +"-----"+vehicleKey.y + "-------" + vehicleKey.before + "-----" + Number(vehicleKey.after) + "------" + vehicleKey.demand);
        //         // console.log(vehicleKey.id)
        //     }
        //     console.log("\n");
        // }
        // console.log(this.vehicles)
        return true;
    }

    addLocationToVehicle = (location)=>{
         // console.log(location);
         for (let i=0 ; i < 10 ; i++){
            if(!this.#isFull(i, location.demand)){
                this.vehicles[i].push(new Locations(this._locationID++, location.x, location.y, this.#getBefore(location,i), 0, location.demand));
                this.maxCapacity[i] += location.demand;
                this.printc();
                return true;
            }
        }
        return false;
    }


}
export {Vehicles}