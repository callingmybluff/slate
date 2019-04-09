import isPlainObject from 'is-plain-object'
import { Map, Seq } from 'immutable'
import Operation from './operation.js'

/**
 * Data.
 *
 * This isn't an immutable record, it's just a thin wrapper around `Map` so that
 * we can allow for more convenient creation.
 *
 * @type {Object}
 */

class Data {
  /**
   * Create a new `Data` with `attrs`.
   *
   * @param {Object|Data|Map} attrs
   * @return {Data} data
   */

  static create(attrs = {}) {
    if (Map.isMap(attrs)) {
      return attrs
    }

    if (isPlainObject(attrs)) {
      return Data.fromJSON(attrs)
    }

    throw new Error(
      `\`Data.create\` only accepts objects or maps, but you passed it: ${attrs}`
    )
  }

  /**
   * Create a `Data` from a JSON `object`.
   *
   * @param {Object} object
   * @return {Data}
   */

  static fromJSON(object) {
    return new Map(object)
  }

  /**
   * Create a `Data` from a JSON `object`.
   *
   * @param {Object} object
   * @return {Data}
   */

  static fromJS(object) {
    return typeof object !== 'object' || object === null ? object :
      Seq(object).map(Data.propertyFromJS).toMap()
  }

  /**
   * Create `Data`'s property from a JSON `object`.
   *
   * @param {Object} object
   * @return {Data}
   */

  static propertyFromJS(object) {
    return typeof object !== 'object' || object === null ? object :
    Array.isArray(object) ? 
      Seq(object).map(Data.propertyFromJS).toList() :
      Operation.fromJSON(object);
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

export default Data
