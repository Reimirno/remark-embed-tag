export const VALID_IFRAME_PROPERTY_KEYS = [
  "width",
  "height",
  "title",
  "frameBorder",
  "loading",
  "allowFullScreen",
] as const;

export type ValidIframePropertyKey =
  (typeof VALID_IFRAME_PROPERTY_KEYS)[number];
export type ValidIframePropertyDictionary = Record<
  ValidIframePropertyKey,
  string
>;

export type WithIframeProperties<T> = T & {
  properties: ValidIframePropertyDictionary;
};

export type IframeProps = {
  src: string;
  properties?: ValidIframePropertyDictionary;
};

export default function createIframe(props: IframeProps): string {
  const { src, properties = {} as ValidIframePropertyDictionary } = props;
  const width = properties.width ?? "100%";
  const height = properties.height ?? "100%";
  const title = properties.title ?? "";
  const frameBorder = properties.frameBorder ?? "0";
  const loading = properties.loading === "lazy" ? "lazy" : "eager";
  const allowFullScreen = properties.allowFullScreen ? "true" : "false";
  return `<iframe src="${src}" width="${width}" height="${height}" title="${title}" frameBorder="${frameBorder}" loading="${loading}" allowFullScreen="${allowFullScreen}"></iframe>`;
}
