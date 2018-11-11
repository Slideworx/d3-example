import {getCells, getColumns, getFill, getR, getRows, getScaleX, getScaleY} from './utils';



/**
 * @function createCells
 * @access protected
 *
 * @param {Selection} selection
 * @param {Object} data
 * @param {Object} config
 *
 * @returns {Object}
 */
function createCells(selection, data, config) {
  const scaleX = getScaleX(
    selection,
    data,
    config
  );

  const scaleY = getScaleY(
    selection,
    data,
    config
  );

  return getCells(data).map(({attacker, defender, strength}) => ({
    fill: getFill(strength),
    r: getR(strength),
    x: scaleX(defender),
    y: scaleY(attacker),
  }));
}

/**
 * @function createColumns
 * @access protected
 *
 * @param {Selection} selection
 * @param {Object} data
 * @param {Object} config
 *   @param {Object} config.margin
 *     @param {number} config.margin.top
 *
 * @returns {Object}
 */
function createColumns(selection, data, config) {
  const scaleX = getScaleX(
    selection,
    data,
    config
  );

  return getColumns(data).map((column) => ({
    text: column,
    x: scaleX(column),
    y: config.margin.top / 2,
  }));
}

/**
 * @function createRows
 * @access protected
 *
 * @param {Selection} selection
 * @param {Object} data
 * @param {Object} config
 *   @param {Object} config.margin
 *     @param {number} config.margin.left
 *
 * @returns {Object}
 */
function createRows(selection, data, config) {
  const scaleY = getScaleY(
    selection,
    data,
    config
  );

  return getRows(data).map((row) => ({
    text: row,
    x: config.margin.left / 2,
    y: scaleY(row),
  }));
}



/**
 * @function createModel
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 * @param {Object} config
 *
 * @returns {Function}
 */
export default function createModel(selection, dataFunction, config) {
  return (datas) => {
    return dataFunction(datas).map((data) => ({
      cells: createCells(
        selection,
        data,
        config
      ),
      columns: createColumns(
        selection,
        data,
        config
      ),
      rows: createRows(
        selection,
        data,
        config
      ),
    }));
  };
}