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
    src: nft.avatar,
    caption: `${nft.collectionname} #${nft.id}`,
    alt: `${nft.collectionname} #${nft.id}`,
  };
}

export function imageWithCaptionFromGroup(group: IGROUP): IImageWithCaption {
  return {
    src: group.avatar,
    caption: group.name,
    alt: group.name,
  };
}
