import {getCalcFill, getCalcR, getCalcX, getCalcY, getCells, getColumns, getRows} from './utils';



/**
 * @function createCells
 * @access protected
 *
 * @param {Selection} selection
 * @param {Object} data
 *
 * @returns {Object}
 */
function createCells(selection, data) {
  const calcFill = getCalcFill();
  const calcR = getCalcR();

  const calcX = getCalcX(
    selection,
    data
  );

  const calcY = getCalcY(
    selection,
    data
  );

  return getCells(data).map((cell) => ({
    fill: calcFill(cell),
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
 *
 * @returns {Object}
 */
function createColumns(selection, data) {
  const calcX = getCalcX(
    selection,
    data
  );

  return getColumns(data).map((column) => ({
    text: column,
    x: calcX(column),
    y: 0,
  }));
}

/**
 * @function createRows
 * @access protected
 *
 * @param {Selection} selection
 * @param {Object} data
 *
 * @returns {Object}
 */
function createRows(selection, data) {
  const calcY = getCalcY(
    selection,
    data
  );

  return getRows(data).map((row) => ({
    text: row,
    x: 0,
    y: calcY(row),
  }));
}



/**
 * @function createModel
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 *
 * @returns {Function}
 */
export default function createModel(selection, dataFunction) {
  return (datas) => {
    return dataFunction(datas).map((data) => ({
      cells: createCells(
        selection,
        data
      ),
      columns: createColumns(
        selection,
        data
      ),
      rows: createRows(
        selection,
        data
      ),
    }));
  };
}