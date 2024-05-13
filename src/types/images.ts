export interface IImage {
  src: string;
  alt: string;
}

export interface IImageWithCaption extends IImage {
  caption: string;
};
