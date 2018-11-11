import {getCells, getColumns, getFill, getR, getRows, getScaleX, getScaleY} from './utils';



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
  const scaleX = getScaleX(
    selection,
    data
  );

  const scaleY = getScaleX(
    selection,
    data
  );

  return getCells(data).map((cell) => ({
    fill: getFill(cell.strength),
    r: getR(cell.strength),
    x: scaleX(cell.defender),
    y: scaleY(cell.attacker),
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
  const scaleX = getScaleX(
    selection,
    data
  );

  return getColumns(data).map((column) => ({
    text: column,
    x: scaleX(column),
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
  const scaleY = getScaleY(
    selection,
    data
  );

  return getRows(data).map((row) => ({
    text: row,
    x: 0,
    y: scaleY(row),
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