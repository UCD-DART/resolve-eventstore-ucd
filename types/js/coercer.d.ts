export default coercer;
declare function coercer({
  intValue,
  stringValue,
  bigIntValue,
  longValue,
  booleanValue,
  ...rest
}: {
  [x: string]: any;
  intValue: any;
  stringValue: any;
  bigIntValue: any;
  longValue: any;
  booleanValue: any;
}): string | number | boolean;
