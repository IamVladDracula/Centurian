import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#cbb2ff',
      200: '#a480ff',
      300: '#7c4dff',
      400: '#551bff',
      500: '#3b01e6',
      600: '#2d00b4',
      700: '#200082',
      800: '#130051',
      900: '#070021',
    },
    background: {
      primary: '#0A0B0D',
      secondary: '#16181D',
      tertiary: '#1E2026',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'background.primary',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: 'medium',
      },
      variants: {
        solid: {
          bg: 'brand.300',
          color: 'white',
          _hover: {
            bg: 'brand.400',
          },
          _active: {
            bg: 'brand.500',
          },
        },
        outline: {
          borderColor: 'brand.300',
          color: 'brand.300',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'background.secondary',
          borderRadius: 'xl',
          boxShadow: 'lg',
        },
      },
    },
  },
})

export default theme