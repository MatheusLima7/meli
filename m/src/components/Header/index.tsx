import React, {
  useContext,
  useEffect,
  useState,
  memo,
} from 'react';
// import { SomaIcon } from '@soma/react';
import {
  ContentRight,
  ContentLeft,
  Wrapper,
  Button,
  Image,
  Icon,
} from './Styles';
import { AuthContext } from '../../hooks/useAuthenticate';
import { ACCESS_TYPES, verifyAccess } from '../../utils/access';
import storage from '../../utils/storage';
import XPInc from '../../assets/xp.png';
import Onboarding from '../Onboarding';
import utilGoogleAnalitycs from '../../utils/ga';

const Header = () => {
  const [onboardingIsOpen, setOnboardingIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const isTrader = verifyAccess(auth?.user, ACCESS_TYPES.TRADER.value);

  const closeOnboarding = () => {
    const { set: setSessionStorage } = storage('localStorage');
    setSessionStorage('first_access', false);
    setOnboardingIsOpen(false);
  };

  useEffect(() => {
    const { get: getSessionStorage } = storage('localStorage');
    const firstAccess = getSessionStorage('first_access');
    setOnboardingIsOpen(isTrader && firstAccess !== false && firstAccess !== 'false');
  }, [isTrader]);

  return (
    <Wrapper data-testid="header-component-wrapper">
      <ContentLeft>
        {/* <Icon className="menu">
        <span />
        <SomaIcon size="sm" icon="menu" color="#FFFFFF" />
      </Icon> */}
        <Icon>
          <Image src={XPInc} />
        </Icon>
      </ContentLeft>
      <ContentRight>
        {isTrader && (
        <Button onClick={() => {
          utilGoogleAnalitycs.setGA(
            'event',
            'Como Operar?',
            'Abrindo modal',
          );
          setOnboardingIsOpen(true);
        }}
        >
          Como operar?
        </Button>
        )}
      </ContentRight>
      <Onboarding isOpen={onboardingIsOpen} closeModal={closeOnboarding} />
    </Wrapper>
  );
};

export default memo(Header, () => true);
