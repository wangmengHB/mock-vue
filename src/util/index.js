export const emptyObject = Object.freeze({})

export function isUndef (v) {
    return v === undefined || v === null
}

export function isDef (v) {
    return v !== undefined && v !== null
}

export function isTrue (v) {
    return v === true
}

export function isFalse (v) {
    return v === false
}

export function isPrimitive (v) {
    return (
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'symbol' ||
        typeof v === 'boolean'
    )
}

export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString

/*
  Array, RegExp, Function, Date, Math, String, Number, Boolean,
  Undefined, Null
*/
export function toRawType (v) {
    return _toString.call(v).slice(8, -1)
}

export function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
}

/*
 Here, let obj = new Class(),  obj is an plain object here.
 But in some other library, 
 "plain object" mean not created by any Class except Object 
 for example, redux.js
*/
export function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}

export function isValidArrayIndex (val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(n)
}

/*
 toString is used to output logs
*/
export function toString (val) {
    return val == null
        ? ''
        : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
}

export function toNumber (val) {
    const n = parseFloat(val)
    return isNaN(n) ? val: n
}



export function makeMap (str, expectsLowerCase = false) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}

export const isBuiltInTag = makeMap('slot,component', true)

export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

export function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}



