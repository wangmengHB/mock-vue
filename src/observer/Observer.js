

export function observe (value, asRootData = false) {
    if (!isObject(value)) {
        return
    }
    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    
    return ob
}


export class Observer {
    constructor (value) {
        this.value = value
        this.dep = new Dep()
    }

}