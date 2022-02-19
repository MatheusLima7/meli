import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-direction: row;
  display: flex;
  height: 364px;
`;

type TTitle = {
  className?: string;
}

export const CloseButton = styled.div`
  position: absolute;
  top: 1.4rem;
  right: 1rem;
  font-size: 36px;
  cursor: pointer;
`;

export const Title = styled.div<TTitle>`
  padding: 1rem 2rem;
  position: relative;
  h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 1.25rem;
    line-height: 130%;
    text-align: left;
    color: #262d3f;
    margin: 0rem;
  }
`;
export const Body = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 0rem 2rem;
  display: flex;
  height: 100%;
`;
export const ContentsSection = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Contents = styled.div`
  p {
    font-style: normal;
    line-height: 150%;
    font-size: 11px;
  }
`;

export const ContentsList = styled.div`
  p {
    margin-left: 2.25rem;
    margin-bottom: 1rem;
  }
`;

export const ContentsRow = styled.div`
  flex-direction: row;
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  p {
    margin: 0rem;
  }
`;

export const TextWithIcon = styled.div`
  flex-direction: row;
  display: flex;
  font-style: normal;
  line-height: 150%;
  font-size: 11px;
  .row-icon {
    margin: 0rem 0.25rem;
  }
  .flex-column {
    flex-direction: column;
    display: flex;
  }
  .flex-row {
    flex-direction: row;
    display: flex;
  }
`;

export const SVGContainer = styled.div`
  transform: translateY(-3px);
  max-height: 1rem;
`;

export const DotNumber = styled.div`
    justify-content: center;
    margin-right: 0.8rem;
    background: #262D3F;
    align-items: center;
    min-width: 1.125rem;
    border-radius: 50%;
    font-size: 0.75rem;
    height: 1.125rem;
    display: flex;
    color: #FFF;
`;

export const ImageSection = styled.div`
  align-items: center;
  max-height: 364px;
  max-width: 443px;
  overflow: hidden;
  display: flex;
  img {
    width: 443px;
    height: 364px;
    transform: scale(1.02);
  }
`;

export const ActionSection = styled.div`
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-direction: row;
  display: flex;
  width: 100%;
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-right: 3rem;
`;
export const Step = styled.span<{ active: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#262D3F' : '#C8CACD')};
  cursor: ${({ active }) => (active ? 'auto' : 'pointer')};
`;

export const BodyTitle = styled.h2`
  margin: 0rem;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 124%;
  color: #262D3F;
`;

export const Button = styled.button`
  border: none;
  background-color: #2E374D;
  color: #FFF;
  border-radius: 2px;
  font-style: normal;
  width: 130px;
  height: 32px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`;
