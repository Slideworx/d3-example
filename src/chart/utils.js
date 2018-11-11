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
 * @function getFill
 * @access public
 *
 * @param {number} strength
 *
 * @returns {string}
 */
export const getFill = d3
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



/**
 * @function getR
 * @access public
 *
 * @param {number} strength
 *
 * @returns {number}
 */
export const getR = d3
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



/**
 * @function getScaleX
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
export function getScaleX(selection, data, config) {
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
 * @function getScaleY
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
export function getScaleY(selection, data, config) {
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