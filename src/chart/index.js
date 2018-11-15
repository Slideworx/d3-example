import createModel from './model';



/**
 * @function chart
 * @access public
 *
 * @param {Selection} selection
 * @param {Function} dataFunction
 */
export default function chart(selection, dataFunction) {
  const group = selection
    .selectAll('.chart')
    .data(
      createModel(
        selection,
        dataFunction
      )
    );

    group
      .enter()
      .append('g')
      .classed(
        'chart',
        true
      );

    group
      .exit()
      .remove();
}