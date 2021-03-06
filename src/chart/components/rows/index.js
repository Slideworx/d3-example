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
 * @function rows
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function rows(selection, dataFunction) {
  const group = selection
    .selectAll('.rows')
    .data(dataFunction);

  group
    .enter()
    .append('g')
    .classed(
      'rows',
      true
    )
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate)
}