import React, { useContext, createContext } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/authetication';
import { SignoutIcon } from '../primitives';
import { getForegroundColor, useLogoDimension } from '../helpers';
import { mq } from '../helpers/media';
import { colors, fontSizes, fontWeight, gridSize } from '../theme';
import AuthModal from './auth/modal';

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const NavAnchor = (props) => {
  const paddingHorizontal = [gridSize, gridSize, gridSize * 3];
  const paddingVertical = gridSize;

  return (
    <a
      css={mq({
        position: 'relative',
        fontFamily: 'Avenir',
        fontWeight: fontWeight.bold,
        color: colors.white,
        display: 'inline-block',
        fontSize: fontSizes.md,
        marginLeft: paddingHorizontal,
        marginRight: paddingHorizontal,
        paddingBottom: paddingVertical,
        paddingTop: paddingVertical,
        textDecoration: 'none',

        ':after': {
          background: 'none repeat scroll 0 0 transparent',
          bottom: 0,
          content: '""',
          display: 'block',
          height: '3px',
          left: '50%',
          position: 'absolute',
          backgroundColor: colors.white,
          transition: 'width 0.3s ease 0s, left 0.3s ease 0s',
          width: 0,
        },
        ':hover:after': {
          width: '100%',
          left: 0,
        },
      })}
      {...props}
    />
  );
};
const NavLink = ({ href, as, ...props }) => (
  <Link href={href} as={as} passHref>
    <NavAnchor {...props} />
  </Link>
);
const NavButton = ({ href, as, ...props }) => (
  <Link href={href} as={as} passHref>
    <a
      css={mq({
        position: 'relative',
        fontFamily: 'Avenir',
        display: 'inline-block',
        fontSize: fontSizes.md,
        textDecoration: 'none',
        backgroundColor: colors.white,
        border: 'none',
        borderRadius: 8,
        color: colors.dark,
        fontWeight: fontWeight.bold,
        lineHeight: 1,
        marginRight: [0, 0],
        padding: '1rem 2rem',
      })}
      {...props}
    />
  </Link>
);

const NavText = (props) => {
  const { foreground } = useTheme();
  return <span css={{ color: foreground, fontSize: fontSizes.sm }} {...props} />;
};

export const HEADER_GUTTER = [gridSize * 2, gridSize * 6];

const Nav = (props) => {
  return (
    <nav
      css={mq({
        alignItems: 'center',
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        padding: HEADER_GUTTER,
      })}
      {...props}
    />
  );
};

const hideOnMobile = mq({
  display: ['none', 'none', 'initial'],
});

// TODO: Implement log out
const UserActions = ({ user }) => {
  const { signout } = useAuth();
  const onSignout = (event) => {
    event.preventDefault();
    signout();
  };

  return (
    <div>
      {user.isAdmin && (
        <NavAnchor css={hideOnMobile} href="/admin" target="_blank">
          Dashboard
        </NavAnchor>
      )}
      <span css={{ alignItems: 'center', display: 'inline-flex' }}>
        <NavText css={hideOnMobile}>
          <strong>{user.name}</strong>
        </NavText>
        <NavLink href="/signout" title="Sign Out" onClick={onSignout}>
          <SignoutIcon />
        </NavLink>
      </span>
    </div>
  );
};

const AnonActions = () => {
  return (
    <div>
      {/* <AuthModal mode="signin">
        {({ openModal }) => (
          <NavLink href="/signin" onClick={openModal}>
            Sign in
          </NavLink>
        )}
      </AuthModal> */}
      <AuthModal mode="signup">
        {({ openModal }) => (
          <NavButton href="/signup" onClick={openModal}>
            Join Us
          </NavButton>
        )}
      </AuthModal>
    </div>
  );
};

const Navbar = ({ background = 'white', ...props }) => {
  const { isAuthenticated, user } = useAuth();
  const { logoWidth, logoHeight, logoWidthSm, logoHeightSm } = useLogoDimension();
  const foreground = getForegroundColor(background);

  return (
    <ThemeContext.Provider value={{ background, foreground }}>
      <Nav {...props}>
        <Link href="/" passHref>
          <a>
            <img
              src="/logo_muses.svg"
              width={logoWidth}
              height={logoHeight}
              alt="MusesCodeJS"
              css={mq({
                marginRight: [gridSize, gridSize * 2],
                width: [logoWidthSm, logoWidth],
                height: [logoHeightSm, logoHeight],
              })}
            />
          </a>
        </Link>
        <menu css={{ display: 'flex' }}>
          <NavLink href="/chapters">Chapters</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/resources">Resources</NavLink>
          <NavLink href="/sponsors">Sponsors</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {isAuthenticated ? <UserActions user={user} /> : <AnonActions />}
        </menu>
      </Nav>
    </ThemeContext.Provider>
  );
};

export default Navbar;
