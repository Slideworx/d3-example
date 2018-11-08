import {createModel} from './utils';



/**
 * @function chart
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 *
 * @returns {Selection}
 */
export default function chart(selection, dataFunction) {
  selection
    .data(
      createModel(
        selection,
        dataFunction
      )
    );

  return selection;
}