import {identity} from 'ramda';

import circle from './circle';



/**
 * @function enterAndUpdate
 * @access protected
 *
 * @param {Selection} selection
 */
function enterAndUpdate(selection) {
  selection
    .call(
      circle,
      identity
    );
}



/**
 * @function cells
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function cells(selection, dataFunction) {
  const group = selection
    .selectAll('.cells')
    .data(dataFunction);

  group
    .enter()
    .append('g')
    .classed(
      'cells',
      true
    )
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate);
}