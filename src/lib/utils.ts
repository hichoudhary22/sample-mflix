export function toHHMM(min: number) {
  const HH = Math.floor(min / 60);
  const MM = min - HH * 60;
  let timeHHMM = "";
  timeHHMM += HH.toString() + "h";
  if (MM < 9) timeHHMM += "0";
  timeHHMM += MM.toString() + "m";
  return timeHHMM;
}
