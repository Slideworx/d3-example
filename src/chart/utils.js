import * as d3 from 'd3';
import {flatten, identity, map, pipe, sortBy, uniqBy} from 'ramda';



/**
 * @function getViewBox
 * @access protected
 *
 * @param {Selection} selection
 *
 * @returns {Object}
 */
function getViewBox(selection) {
  const [
    ,
    ,
    width,
    height,
  ] = selection
    .attr('viewBox')
    .split(' ')
    .map(Number);

  return {
    height,
    width,
  };
}



/**
 * @function getCalcFill
 * @access public
 *
 * @returns {Function}
 */
export function getCalcFill() {
  const scale = d3
    .scaleOrdinal()
    .domain(
      [
        0,
        0.5,
        1,
        2,
      ]
    )
    .range(
      [
        '#000',
        '#c00',
        '#fff',
        '#0c0',
      ]
    );

  return (cell) => scale(cell.strength);
}



/**
 * @function getCalcR
 * @access public
 *
 * @returns {Function}
 */
export function getCalcR() {
  const scale = d3
    .scaleOrdinal()
    .domain(
      [
        0,
        0.5,
        1,
        2,
      ]
    )
    .range(
      [
        5,
        5,
        5,
        10,
      ]
    );

  return (cell) => scale(cell.strength);
}



/**
 * @function getCalcX
 * @access public
 *
 * @param {Selection} selection
 * @param {Object} data
 *
 * @returns {Function}
 */
export function getCalcX(selection, data) {
  const {
    width,
  } = getViewBox(selection);

  return d3
    .scalePoint()
    .domain(
      getColumns(data)
    )
    .padding(0.5)
    .range(
      [
        0,
        width,
      ]
    );
}



/**
 * @function getCalcY
 * @access public
 *
 * @param {Selection} selection
 * @param {Object} data
 *
 * @returns {Function}
 */
export function getCalcY(selection, data) {
  const {
    height,
  } = getViewBox(selection);

  return d3
    .scalePoint()
    .domain(
      getRows(data)
    )
    .padding(0.5)
    .range(
      [
        0,
        height,
      ]
    );
}



/**
 * @function getCells
 * @access public
 *
 * @param {Object} data
 *
 * @returns {Array<Object>}
 */
export function getCells(data) {
  return flatten(
    Object
      .entries(data)
      .map(([attacker, defenders]) => {
        return Object
          .entries(defenders)
          .map(([defender, strength]) => ({
            attacker,
            defender,
            strength,
          }));
      })
  );
}



/**
 * @function getColumns
 * @access public
 *
 * @param {Object} data
 *
 * @returns {Array<string>}
 */
export const getColumns = pipe(
  Object.entries,
  map(
    ([, defenders]) => Object.keys(defenders)
  ),
  flatten,
  uniqBy(identity),
  sortBy(identity)
);




/**
 * @function getRows
 * @access public
 *
 * @param {Object} data
 *
 * @returns {Array<string>}
 */
export const getRows = pipe(
  Object.keys,
  uniqBy(identity),
  sortBy(identity)
);