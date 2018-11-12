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
      'x',
      prop('x')
    )
    .attr(
      'y',
      prop('y')
    )
    .on(
      'click',
      (d) => d.onClick()
    )
    .text(
      prop('text')
    );
}



/**
 * @function text
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function text(selection, dataFunction) {
  const group = selection
    .selectAll('.row')
    .data(dataFunction);

  group
    .enter()
    .append('text')
    .classed(
      'row',
      true
    )
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate);
}