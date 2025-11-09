import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: { icon: '24px', text: 'lg' },
    md: { icon: '32px', text: 'xl' },
    lg: { icon: '48px', text: '2xl' },
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <MotionBox
        width={sizes[size].icon}
        height={sizes[size].icon}
        borderRadius="lg"
        bg="brand.300"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <Box
          position="absolute"
          width="70%"
          height="70%"
          borderRadius="md"
          border="3px solid white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={size === 'lg' ? 'xl' : 'md'}
          >
            B
          </Text>
        </Box>
      </MotionBox>
      <Text
        bgGradient="linear(to-r, white, brand.100)"
        bgClip="text"
        fontSize={sizes[size].text}
        fontWeight="bold"
        letterSpacing="tight"
      >
        BaseCasino
      </Text>
    </Box>
  )
}