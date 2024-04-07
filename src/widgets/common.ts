export type IframeProps = {
  src: string;
  width?: string;
  height?: string;
  title?: string;
  frameBorder?: number;
  allowFullScreen?: boolean;
};

export function createIframe(props: IframeProps): string {
  const {
    src,
    width = "100%",
    height = "100%",
    title = "",
    frameBorder = 0,
    allowFullScreen = true,
  } = props;
  return `<iframe src="${src}" width="${width}" height="${height}" title="${title}" frameBorder="${frameBorder}" allowFullScreen="${allowFullScreen}"></iframe>`;
}
