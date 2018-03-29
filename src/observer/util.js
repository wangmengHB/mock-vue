import {
    ASSET_TYPES, 
    LIFECYCLE_HOOKS
} from '../constant'

import {
    extend,
    hasOwn,
    camelize,
    toRawType,
    capitalize,
    isBuiltInTag,
    isPlainObject
} from '../util'


export function def (obj, key, val, enumerable = false) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: enumerable,
        writable: true,
        configurable: true
    })
}

/*
    check if a string starts with $ or _
*/
export function isReserved (str) {
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
}

/*
parsePath is used to get nested property value (or undefined) of an object.
eg. an deep object: data.user.name.familyname = "Hello"
const getValue = parsePath('user.name.familyname')
getValue(data) === 'Hello'
*/
const bailRE = /[^\w.$]/
export function parsePath (path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return
            }
            obj = obj[segments[i]]
        }
        return obj
    }
}