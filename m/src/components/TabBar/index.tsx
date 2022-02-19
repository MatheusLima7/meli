import React,
{
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import {
  Wrapper,
  TabList,
  Header,
  Tab,
} from './Styles';
import BlotterOptions from '../BlotterOptions';
import { AuthContext } from '../../hooks/useAuthenticate';
import { ACCESS_TYPES, verifyAccess } from '../../utils/access';
import { TABS } from '../../utils/enum';
import { createFileName } from '../../utils/file';
import utilGoogleAnalitycs from '../../utils/ga';

type TTab = {
  name: string;
  label: string;
};

type TTabBar = {
  defaultTab: number;
  tabs: TTab[];
  setVisibility: () => void;
  children: (activeComponent: string) => void;
  setSearch: (property: string, value: string) => void;
  open: boolean;
};

const TabBar = ({
  defaultTab,
  tabs,
  setVisibility,
  children,
  setSearch,
  open,
}: TTabBar) => {
  const auth = useContext(AuthContext);
  const isBroker = verifyAccess(auth.user, ACCESS_TYPES.BROKER.value);
  const [activeTab, setActiveTab] = useState<string>('');
  const [excelRouteName, setExcelRouteName] = useState<string>('');
  const [excelFileName, setExcelFileName] = useState<string>('');

  useEffect(() => {
    if (tabs.length) {
      setActiveTab(tabs[0].name);
    }
  }, [tabs, defaultTab]);

  const Child = useMemo(() => children({ activeTab } as any), [
    children,
    activeTab,
  ]);
  const [isOpenedTabBar, setIsOpenedTabBar] = useState(true);

  useEffect(() => {
    const exportRouteByMarketBusiness = `export${isBroker ? '' : '-public'}-market-trades-csv`;
    const isTabMyBusiness = activeTab === TABS.MY_BUSINESS;
    setExcelRouteName(isTabMyBusiness ? 'export-trader-trades-csv' : exportRouteByMarketBusiness);
    setExcelFileName(isTabMyBusiness ? createFileName('Meus-Negocios-XP') : createFileName('Negocios-De-Mercado-XP'));
  }, [activeTab, isBroker]);

  return (
    <>
      <Wrapper isOpenedTabBar={isOpenedTabBar}>
        <Header>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab
                active={activeTab === tab.name}
                key={`tab-${index.toString()}`}
                onClick={() => {
                  utilGoogleAnalitycs.setGA(
                    'event',
                    'Alterando aba da Blotter',
                    `${tab.label}`,
                  );
                  setActiveTab(tab.name);
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <BlotterOptions
            exportRouteName={excelRouteName}
            fileName={excelFileName}
            setSearch={setSearch}
            setVisibility={(isOpen: boolean) => {
              setVisibility();
              setIsOpenedTabBar(isOpen);
            }}
            open={open}
          />
        </Header>
      </Wrapper>
      {Child}
    </>
  );
};

export default TabBar;
