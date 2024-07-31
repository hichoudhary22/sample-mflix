export function toHHMM(min: number) {
  const HH = Math.floor(min / 60);
  const MM = min - HH * 60;
  let timeHHMM = "";
  timeHHMM += HH.toString() + " Hrs ";
  if (MM < 9) timeHHMM += "0";
  timeHHMM += MM.toString() + " Min";
  return timeHHMM;
}

export function readableDate(isoString: string) {
  const date = new Date(isoString).toLocaleString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return date;
}
