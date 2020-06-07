export function roundNumber(rnum, rlength) {
  var newnumber =
    Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  return newnumber;
}
