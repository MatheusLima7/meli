import styled from 'styled-components';

type TWrapper = {
  isOpenedTabBar?: boolean;
};

export const Wrapper = styled.div<TWrapper>`
  width: 100%;
  background: #262d3f;
  list-style: none;
  height: ${({ isOpenedTabBar }) => (isOpenedTabBar ? '2.5rem' : 'auto')};
  position: relative;
  transition: all 0.5s ease;


  @media (max-width: 710px)
  {
    height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TabList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;

  @media (max-width: 710px)
  {
    width: 240px;
  }
`;

type TTab = {
  active?: boolean
}

export const Tab = styled.li<TTab>`
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#FFFFFF' : '#B8B8B8')};
  border-bottom: solid 2px ${({ active }) => (active ? '#ffc70a' : '#262d3f')};
  height: 40px;
  line-height: 40px;
  display: inline-block;
  padding: 0 40px;
  text-transform: uppercase;
  font-style: normal;

  @media (max-width: 710px)
  {
    display: block;
    padding: 0 15px;
  }
`;
