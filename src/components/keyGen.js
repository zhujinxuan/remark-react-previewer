function keyGen(node) {
  let { start, end } = node.position;
  return "start" + keyGenPos(start) + "-end" + keyGenPos(end);
}

function keyGenPos(pos) {
  return `-${pos.line}-${pos.column}`;
}
export default keyGen;
