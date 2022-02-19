import styled from 'styled-components';

export const Wrapper = styled.div``;

type TTitle = {
  className?: string;
}

export const Title = styled.div<TTitle>`
  padding: 0.625rem 0rem;
  border-bottom: rgba(183, 203, 236, 0.4) solid 1px;
  h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 0.875rem;
    line-height: 1rem;
    text-align: center;
    color: #262d3f;
  }

  &.danger {
    h1 { color: #DB2B2B; }
  }
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem 1.625rem;
`;
export const ContentSection = styled.div`
  margin-bottom: 1.125rem;
`;
export const ActionSection = styled.div`
  justify-content: space-between;
  margin-bottom: 1.125rem;
  flex-direction: row;
  display: flex;
  width: 100%;
`;
export const Descrition = styled.p`
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: #262d3f;
  margin-bottom: 0.5rem;
`;

type TButton = {
  styleType: 'primary' | 'secondary';
  className?: string
};

export const Button = styled.button<TButton>`
  border: ${({ styleType }) => (
    styleType === 'primary' ? 'none' : '2px solid #2E374D'
  )};
  background-color: ${({ styleType }) => (
    styleType === 'primary' ? '#2E374D' : '#FFF'
  )};
  color: ${({ styleType }) => (styleType === 'primary' ? '#FFF' : '#2E374D')};
  border-radius: 2px;
  font-style: normal;
  width: 130px;
  height: 32px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  ${({ className }) => !!className && `
    &.danger{
      background-color: #DB2B2B;
    }
  `}
`;

export const ListIten = styled.div`
  margin-bottom: 0.3rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #262d3f;
  width: 50%;
  span {
    font-weight: 500;
  }
`;

export const ModalList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
