export type IframeProps = {
  src: string;
  width?: string;
  height?: string;
  title?: string;
  frameBorder?: number;
  loading?: "lazy" | "eager";
  allowFullScreen?: boolean;
};

export default function createIframe(props: IframeProps): string {
  const {
    src,
    width = "100%",
    height = "100%",
    title = "",
    frameBorder = 0,
    loading = "lazy",
    allowFullScreen = true,
  } = props;
  return `<iframe src="${src}" width="${width}" height="${height}" title="${title}" frameBorder="${frameBorder}" loading="${loading}" allowFullScreen="${allowFullScreen}"></iframe>`;
}
