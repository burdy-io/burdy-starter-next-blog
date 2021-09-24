import { IBurdyImage } from '../types/burdy-cms';
import React, { HTMLProps } from 'react';
import classNames from 'classnames';

export interface IImageProps extends HTMLProps<HTMLImageElement> {
  image: IBurdyImage;
}

const Image: React.VoidFunctionComponent<IImageProps> = ({image, className, ...props}) => (
  <img
    src={image.src}
    width={image.width}
    height={image.height}
    alt={image?.alt ?? ''}
    className={classNames('image', className)}
    {...props as any}
  />
);

export default Image;
