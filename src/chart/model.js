import {getCalcFill, getCalcOpacity, getCalcR, getCalcX, getCalcY, getCells, getColumns, getRows} from './utils';



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
  const calcFill = getCalcFill(config);
  const calcOpacity = getCalcOpacity(config);
  const calcR = getCalcR(config);

  const calcX = getCalcX(
    selection,
    data,
    config
  );

  const calcY = getCalcY(
    selection,
    data,
    config
  );

  return getCells(data).map((cell) => ({
    fill: calcFill(cell),
    opacity: calcOpacity(cell),
    r: calcR(cell),
    x: calcX(cell.defender),
    y: calcY(cell.attacker),
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
  const calcX = getCalcX(
    selection,
    data,
    config
  );

  return getColumns(data).map((column) => ({
    onClick: config.onClick.column.bind(null, column),
    text: column,
    x: calcX(column),
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
  const calcY = getCalcY(
    selection,
    data,
    config
  );

  return getRows(data).map((row) => ({
    onClick: config.onClick.row.bind(null, row),
    text: row,
    x: config.margin.left / 2,
    y: calcY(row),
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