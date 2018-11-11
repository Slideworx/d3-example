import {prop} from 'ramda';



/**
 * @function enterAndUpdate
 * @access protected
 *
 * @param {Selection} selection
 */
function enterAndUpdate(selection) {
  selection
    .attr(
      'cx',
      prop('x')
    )
    .attr(
      'cy',
      prop('y')
    )
    .attr(
      'fill',
      prop('fill')
    )
    .attr(
      'r',
      prop('r')
    );
}



/**
 * @function circle
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function circle(selection, dataFunction) {
  const group = selection
    .selectAll('.cell')
    .data(dataFunction);

  group
    .enter()
    .append('circle')
    .classed(
      'cell',
      true
    )
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate);
}