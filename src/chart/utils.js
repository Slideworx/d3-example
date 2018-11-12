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
 * @function isSelected
 * @access protected
 *
 * @param {Object} config
 *   @param {Object} config.selected
 *     @param {?string} config.selected.column
 *     @param {?string} config.selected.row
 * @param {Object} cell
 *   @param {string} cell.attacker
 *   @param {string} cell.defender
 *
 * @returns {Object}
 */
function isSelected(config, cell) {
  return (
    (
      !config.selected.column &&
      !config.selected.row
    ) ||
    (
      cell.defender === config.selected.column ||
      cell.attacker === config.selected.row
    )
  );
}



/**
 * @function getCalcFill
 * @access public
 *
 * @param {Object} config
 *
 * @returns {Function}
 */
export function getCalcFill(config) {
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
 * @function getCalcOpacity
 * @access public
 *
 * @param {Object} config
 *
 * @returns {Function}
 */
export function getCalcOpacity(config) {
  return (cell) => isSelected(config, cell) ? 1 : 0.25;
}



/**
 * @function getCalcR
 * @access public
 *
 * @param {Object} config
 *
 * @returns {Function}
 */
export function getCalcR(config) {
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

  return (cell) => scale(isSelected(config, cell) ? cell.strength : 1);
}



/**
 * @function getCalcX
 * @access public
 *
 * @param {Selection} selection
 * @param {Object} data
 * @param {Object} config
 *   @param {Object} config.margin
 *     @param {number} config.margin.left
 *
 * @returns {Function}
 */
export function getCalcX(selection, data, config) {
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
        config.margin.left,
        width - config.margin.left,
      ]
    );
}



/**
 * @function getCalcY
 * @access public
 *
 * @param {Selection} selection
 * @param {Object} data
 * @param {Object} config
 *   @param {Object} config.margin
 *     @param {number} config.margin.top
 *
 * @returns {Function}
 */
export function getCalcY(selection, data, config) {
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
        config.margin.top,
        height - config.margin.top,
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