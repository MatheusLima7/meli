import React from 'react';
import { SomaIcon } from '@soma/react';
import { Wrapper, Icon } from './Styles';
import Search from '../Search';
import storage from '../../utils/storage';
import constants from '../../config/constants';
import utilExcel from '../../utils/export';
import { SVGDownload } from '../SvgImages';
import utilGoogleAnalitycs from '../../utils/ga';

export type TBlotterOptions = {
  setSearch: (property: string, value: string) => void;
  setVisibility: (open: boolean) => void;
  open: boolean;
  exportRouteName: string;
  fileName: string;
};

const BlotterOptions = ({
  setVisibility,
  setSearch,
  open,
  exportRouteName,
  fileName,
}: TBlotterOptions) => {
  const { API } = constants;
  const { get: getSessionStorage } = storage('sessionStorage');

  return (
    <Wrapper data-testid="blotter-options-wrapper">
      <Search origin="Blotter" setFilter={setSearch} />
      <Icon
        onClick={() => {
          const url = `${API}/api/tradesExporter/${exportRouteName}`;
          const token = getSessionStorage('access_token');

          utilGoogleAnalitycs.setGA(
            'event',
            'Download Excel Blotter',
            `url: ${url}`,
          );

          utilExcel.exportExcel({
            token,
            url,
            filename: fileName,
          });
        }}
      >
        <SVGDownload color="#B7CBEC" />
      </Icon>
      <Icon
        data-testid="blotter-options-icon-action"
        onClick={() => {
          utilGoogleAnalitycs.setGA(
            'event',
            'Ocultar Blotter',
            !open ? 'Ocultada' : 'Visível',
          );
          setVisibility(!open);
        }}
      >
        <SomaIcon size="sm" icon={`eye${open ? '-off' : ''}`} color="#B7CBEC" />
      </Icon>
    </Wrapper>
  );
};

export default BlotterOptions;
