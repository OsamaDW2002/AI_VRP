
class Locations{
    constructor(id, x, y, before, after, demand) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._before = before;
        this._after = after;
        this._demand = demand;
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get before() {
        return this._before;
    }

    set before(value) {
        this._before = value;
    }

    get after() {
        return this._after;
    }

    set after(value) {
        this._after = value;
    }

    get demand() {
        return this._demand;
    }

    set demand(value) {
        this._demand = value;
    }

}
export {Locations}