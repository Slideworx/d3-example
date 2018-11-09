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
    );

  group
    .exit()
    .remove();
}