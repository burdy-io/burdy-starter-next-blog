import React from 'react';
import ThemeUtil from '../utils/theme.util';

interface ITypographyProps extends React.HTMLProps<HTMLParagraphElement | HTMLHeadingElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  color?: keyof typeof ThemeUtil.colors | 'inherit'
}

const Typography: React.FC<ITypographyProps> = ({
  color = 'black',
  variant = 'p',
  style,
  ...props
}) => {
  const Element = `${variant}` as any;
  return <Element style={{color: ThemeUtil.colors[color], ...style}} {...props} />;
}

export default Typography;
