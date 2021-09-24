const ThemeUtil = {
  colors: {
    primary: '#776cef',
    secondary: '#ea8587',
    white: '#fff',
    black: '#080808',
    blank: '#fafafa',
    green: '#43cb83',
    terminalGreen: '#33FF33',
    light: '#656565',
  },
  makeBreakpoint: (size: number) => `@media (max-width: ${size}px)`,
  mobileBreakpoint: () => ThemeUtil.makeBreakpoint(720),
  components: {
    link: {
      hoverBackground: 'rgb(237, 235, 233)',
      activeBackground: 'rgb(225, 223, 221)'
    }
  }
}

export default ThemeUtil;
