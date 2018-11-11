import {identity} from 'ramda';

import text from './text';



/**
 * @function enterAndUpdate
 * @access protected
 *
 * @param {Selection} selection
 */
function enterAndUpdate(selection) {
  selection
    .call(
      text,
      identity
    );
}



/**
 * @function columns
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function columns(selection, dataFunction) {
  const group = selection
    .selectAll('.columns')
    .data(dataFunction);

  group
    .enter()
    .append('g')
    .classed(
      'columns',
      true
    )
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate);
}