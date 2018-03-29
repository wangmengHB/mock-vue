import {remove} from '../util'

let uid = 0

export default class Dep {
    constructor () {
        this.id = uid++
        this.subs = []
    }

    addSub (watcher) {
        this.subs.push(watcher)
    }
    
    removeSub (watcher) {
        remove(this.subs, watcher)
    }

    depend () {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify () {
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null

const targetStack = []

export function pushTarget (watcher) {
    if (Dep.target) {
        targetStack.push(watcher)
    }
    Dep.target = watcher
}

export function popTarget (watcher) {
    Dep.target = targetStack.pop()
}