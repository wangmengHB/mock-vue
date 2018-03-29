import {remove, isObject} from '../util'
import {parsePath} from './util.js'
import Dep, {pushTarget, popTarget} from './Dep.js'


let uid = 0

export default class Watcher {
    constructor (
        vm,
        expOrFn,
        cb,
        options = {},
        isRenderWatcher = false
    ) {
        this.id = uid++
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.deps = []
        this.newDeps = []

        this.active = true

    }

    addDep (dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    cleanupDeps () {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    update () {
        if (this.computed) {
            if (this.dep.subs.length === 0) {
                this.dirty = true
            } else {
                this.getAndInvoke(() => {
                    this.dep.notify()
                })
            }
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }


}
