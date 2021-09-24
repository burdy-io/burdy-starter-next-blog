import { createUseStyles } from 'react-jss';
import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import ThemeUtil from '../utils/theme.util';


const useStyles = createUseStyles({
  button: {
    padding: '0.35rem 1.5rem',
    border: 'none',
    color: ThemeUtil.colors.white,
    boxShadow: '1px 0 0 0 rgba(0,0,0,0.08)',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: 4,
    '&[disabled]': {
      filter: 'grayscale(0.5) opacity(0.8)',
      cursor: 'not-allowed'
    }
  },
  primary: {
    backgroundColor: ThemeUtil.colors.primary,
  },
  secondary: {
    backgroundColor: ThemeUtil.colors.white,
    color: ThemeUtil.colors.black
  },
  blank: {
    backgroundColor: '#eaeaea',
    color: ThemeUtil.colors.black
  }
});

interface IButtonProps extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  color?: 'primary' | 'secondary' | 'blank';
  wrapperClassName?: string;
}

const Button = forwardRef<any, IButtonProps>(({
  color = 'primary',
  wrapperClassName = '',
  href,
  className,
  ...props
}, ref) => {
  const classes = useStyles();
  const isAnchor = useMemo(() => typeof href === 'string', [href]);
  const Element = (isAnchor ? 'a' : 'button') as any;

  const buttonClass = useMemo<React.CSSProperties>(() => (classes as any)[color], [color, classes]);

  return <Element className={classNames(classes.button, buttonClass, className)} ref={ref} {...props} href={href} />;
});

export default Button;
