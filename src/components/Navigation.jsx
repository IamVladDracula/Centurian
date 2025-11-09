import { useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { useAccount, useBalance } from 'wagmi'
import { Web3Button } from '@web3modal/react'

const NavLink = ({ children, to }) => (
  <RouterLink to={to}>
    <Text
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Text>
  </RouterLink>
)

const Links = [
  { name: 'Home', to: '/' },
  { name: 'Blackjack', to: '/blackjack' },
  { name: 'Poker', to: '/poker' },
  { name: 'Roulette', to: '/roulette' },
  { name: 'Baccarat', to: '/baccarat' },
  { name: 'Craps', to: '/craps' },
]

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} position="fixed" w="100%" zIndex={999}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold">Casino</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>{link.name}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'} gap={4}>
          {address && (
            <Text display={{ base: 'none', md: 'block' }}>
              Balance: {balance?.formatted.slice(0, 6)} ETH
            </Text>
          )}
          <Web3Button />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>{link.name}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}