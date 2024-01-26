const FormatNumber = (number: number): string => {
  const suffixes: string[] = ["", "k", "m", "b", "t"];
  const suffixNum: number = Math.floor(("" + number).length / 3);
  let shortValue: number | string = parseFloat(
    (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(
      2
    )
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};

export default FormatNumber;
