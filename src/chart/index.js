import {of, prop} from 'ramda';

import {cells, columns, rows} from './components';
import createModel from './model';



/**
 * @function enterAndUpdate
 * @access protected
 *
 * @param {Selection} selection
 */
function enterAndUpdate(selection) {
  selection
    .call(
      cells,
      of(
        prop('cells')
      )
    )
    .call(
      columns,
      of(
        prop('columns')
      )
    )
    .call(
      rows,
      of(
        prop('rows')
      )
    );
}



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
      )
      .call(enterAndUpdate);

    group
      .exit()
      .remove();

    group
      .call(enterAndUpdate);
}