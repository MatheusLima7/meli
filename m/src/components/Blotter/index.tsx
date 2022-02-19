import React, {
  useState, useContext, useEffect, memo,
} from 'react';
import { Wrapper } from './Styles';
import MyBusiness from '../MyBusiness';
import MarketBusiness from '../MarketBusiness';
import MarketBusinessFromTrader from '../MarketBusinessFromTrader';
import TabBar from '../TabBar';
import { AuthContext } from '../../hooks/useAuthenticate';
import { TABS } from '../../utils/enum';
import { ACCESS_TYPES, verifyAccess } from '../../utils/access';

import DEFAULT_TABS, { TTab } from '../../mocks/tabs';
import SplitPanes, { TDimensions } from '../SplitPanes';
import storage from '../../utils/storage';

type TBlottler = {
  open: boolean;
  setVisibility: (state: boolean) => void;
};

const Blottler = ({ open, setVisibility }: TBlottler) => {
  const { set: setLocalStorage, get: getLocalStorage } = storage('localStorage');
  const [search, setSearch] = useState<string>('');
  const [tabs, setTabs] = useState<TTab[]>([]);

  const auth = useContext(AuthContext);
  const isBroker = verifyAccess(auth.user, ACCESS_TYPES.BROKER.value);
  const setSearchValue = (property: string, value: string) => {
    setSearch(value || '');
  };

  useEffect(() => {
    setTabs(isBroker ? DEFAULT_TABS.filter(
      (item) => item.name !== TABS.MY_BUSINESS,
    ) : DEFAULT_TABS);
  }, [isBroker]);

  const MktBusiness = isBroker ? MarketBusiness : MarketBusinessFromTrader;

  const getDefaultDimensions = () => {
    let defaultHeight = 200;
    const newSize: TDimensions = JSON.parse(getLocalStorage('BlotterDimensions'));
    if (newSize && newSize.y > 50) defaultHeight = newSize.y;
    return { defaultHeight };
  };

  return (
    <Wrapper data-testid="wrapper-blotter" open={!!open}>
      <SplitPanes
        handlerChange={(size: TDimensions) => setLocalStorage('BlotterDimensions', JSON.stringify(size))}
        setVisibility={setVisibility}
        {...getDefaultDimensions()}
        maxHeight={300}
        minHeight={50}
        open={open}
      >
        <TabBar
          setSearch={setSearchValue}
          setVisibility={() => setVisibility(!open)}
          defaultTab={0}
          tabs={tabs}
          open={open}
        >
          {({ activeTab }: any) => (
            <>
              <MyBusiness
                active={activeTab === TABS.MY_BUSINESS}
                search={search}
                open={open}
              />
              <MktBusiness
                active={activeTab === TABS.MARKET_BUSINESS}
                search={search}
                open={open}
              />
            </>
          )}
        </TabBar>
      </SplitPanes>
    </Wrapper>
  );
};

const areEqual = (prevProps: any, nextProps: any) => (
  prevProps.open === nextProps.open && prevProps.setVisibility === nextProps.setVisibility
);

export default memo(Blottler, areEqual);
