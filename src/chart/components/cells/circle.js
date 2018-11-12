import {prop} from 'ramda';



/**
 * @function enter
 * @access protected
 *
 * @param {Selection} selection
 */
function enter(selection) {
  selection
    .attr(
      'opacity',
      prop('opacity')
    )
    .attr(
      'r',
      0
    )
    .transition()
    .attr(
      'r',
      prop('r')
    );
}

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
    );
}

/**
 * @function update
 * @access protected
 *
 * @param {Selection} selection
 */
function update(selection) {
  selection
    .transition()
    .attr(
      'opacity',
      prop('opacity')
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
    .call(enter)
    .call(enterAndUpdate);

  group
    .exit()
    .remove();

  group
    .call(enterAndUpdate)
    .call(update);
}