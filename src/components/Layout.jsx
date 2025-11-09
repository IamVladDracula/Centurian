import { Box, Container, Flex, IconButton, useDisclosure, HStack, VStack, Button } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'
import { useAccount, useBalance } from 'wagmi'
import { Logo } from './Logo'

const NavLink = ({ children, to, isActive }) => (
  <RouterLink to={to}>
    <Button
      variant={isActive ? 'solid' : 'ghost'}
      size="md"
      width="full"
    >
      {children}
    </Button>
  </RouterLink>
)

export const Layout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Blackjack', path: '/blackjack' },
    { name: 'Poker', path: '/poker' },
    { name: 'Roulette', path: '/roulette' },
  ]

  return (
    <Box minH="100vh" bg="background.primary">
      {/* Navigation */}
      <Box
        as="nav"
        position="fixed"
        w="100%"
        bg="background.secondary"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <Flex py={4} justify="space-between" align="center">
            {/* Logo */}
            <RouterLink to="/">
              <Logo size="md" />
            </RouterLink>

            {/* Desktop Navigation */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>

            {/* Wallet Connection */}
            <HStack spacing={4}>
              {address && balance && (
                <Box
                  display={{ base: 'none', md: 'block' }}
                  px={4}
                  py={2}
                  bg="background.tertiary"
                  borderRadius="full"
                >
                  {parseFloat(balance?.formatted).toFixed(4)} ETH
                </Box>
              )}
              <Web3Button />
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onToggle}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </HStack>
          </Flex>

          {/* Mobile Navigation */}
          {isOpen && (
            <VStack
              display={{ base: 'flex', md: 'none' }}
              py={4}
              spacing={2}
              alignItems="stretch"
            >
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </VStack>
          )}
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pt="80px" pb={8}>
        <Box
          borderRadius="2xl"
          bg="background.secondary"
          p={6}
          boxShadow="xl"
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}