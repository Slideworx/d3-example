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
    );

  group
    .exit()
    .remove();
}