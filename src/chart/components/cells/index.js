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
    );

  group
    .exit()
    .remove();
}