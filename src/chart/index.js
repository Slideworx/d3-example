export default function chart(selection, dataFunction) {
  selection
    .data(dataFunction);

  return selection;
}