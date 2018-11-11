import {of, pipe, prop} from 'ramda';

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
      pipe(
        prop('cells'),
        of
      )
    )
    .call(
      columns,
      pipe(
        prop('columns'),
        of
      )
    )
    .call(
      rows,
      pipe(
        prop('rows'),
        of
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