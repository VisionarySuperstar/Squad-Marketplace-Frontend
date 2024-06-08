import { IGROUP, INFT } from ".";

export interface IImage {
  src: string;
  alt: string;
}

export interface IImageWithCaption extends IImage {
  caption: string;
}

export function imageWithCaptionFromNFT(nft: INFT): IImageWithCaption {
  return {
    src: nft.content,
    caption: `${nft.name}`,
    alt: `${nft.description}`,
  };
}

export function imageWithCaptionFromGroup(group: IGROUP): IImageWithCaption {
  return {
    src: group.avatar,
    caption: group.name,
    alt: group.name,
  };
}
