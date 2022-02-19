import React, { useState, useEffect } from 'react';
import { SomaIcon } from '@soma/react';
import Input from '../Input';
import { Wrapper, CustomIcon } from './Styles';
import useDebounce from '../../hooks/useDebounce';
import utilFilter from '../../utils/filters';
import utilGoogleAnalitycs from '../../utils/ga';

export type TSearch = {
  setFilter: (property: string, value: string) => void;
  origin?: string;
};

const Search = ({ setFilter, origin }: TSearch) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(false);
  }, []);

  return (
    <Wrapper isEnabled={isEnabled}>
      <CustomIcon onClick={() => setIsEnabled(!isEnabled)}>
        <SomaIcon size="sm" icon="search" color="#6D7D98" />
      </CustomIcon>
      <Input
        field="ticker"
        placeholder="Buscar ativo"
        data-testid="search-input"
        onChange={(property: string, value: string) => useDebounce
          .dispatch(() => {
            utilGoogleAnalitycs.setGA(
              'event',
              `Pesquisa na ${origin || 'Tabela Principal do RUN'}`,
              `Valor do campo: ${value}`,
            );
            utilFilter.setFilter('Search', value);
            setFilter(property, value);
          })}
        isEnabled={isEnabled}
      />
    </Wrapper>
  );
};

export default Search;
