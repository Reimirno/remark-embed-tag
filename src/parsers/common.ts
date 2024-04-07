export default function parseArgs(
  input: string,
  tagName: string
): string[] | null {
  /* 
  look for this pattern: {% tagName arg0 arg1 arg2 ... %}
  if found, then return an array of the arguments
  if not, then return null
  there could be 0 args too, in which case return an empty array, i.e. [], not null
  there can be any number of whitespace between the tag name, and arguments
  whitespaces inside quotation marks should be preserved, but those quotes should be removed
  */
  const escapedTagName = tagName.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(`{\\%\\s*${escapedTagName}\\s*([^%]*)\\s*%}`, "i");
  const match = pattern.exec(input);
  if (!match) return null;
  if (!match[1]) return [];
  const args =
    match[1]
      .trim()
      .match(/(?:[^\s"]+|"[^"]*")+/g)
      ?.filter((arg) => arg !== "")
      .map((arg) => arg.replace(/^"|"$/g, "")) ?? [];
  return args;
}
