import React from 'react';
import { SomaIcon } from '@soma/react';

import PaginaPrincipalGif from '../../assets/gifs/pagina-principal.gif';
import BuscarEditarGif from '../../assets/gifs/buscar-editar.gif';
import MeusNegociosGif from '../../assets/gifs/meus-negocios.gif';
import NegociacaoGif from '../../assets/gifs/negociacao.gif';
import FavoritosGif from '../../assets/gifs/favoritos.gif';
import FiltrosGif from '../../assets/gifs/filtros.gif';
import { SVGDownload } from '../SvgImages';

import {
  TextWithIcon,
  SVGContainer,
  ContentsList,
  ContentsRow,
  DotNumber,
} from './Styles';

const Steps: Array<any> = [
  {
    id: 'pagina-principal',
    img: {
      src: PaginaPrincipalGif,
      alt: 'Demonstração página inicial',
    },
    title: 'Página principal',
    contents: () => (
      <div data-testid="test-contents-component">
        <p>Nessa tela você encontra a lista dos principais ativos do mercado.</p>
        <p>
          {`Você pode refinar a sua busca através dos filtros e ainda 
            favoritar os ativos que acompanha mais de perto.`}
        </p>
      </div>
    ),
  },
  {
    id: 'favoritos',
    img: {
      src: FavoritosGif,
      alt: 'Demonstração ação de favoritar',
    },
    title: 'Favoritos',
    contents: () => (
      <ContentsList data-testid="test-contents-component">
        <p>Quando encontrar algum ativo que deseja acompanhar</p>
        <ContentsRow>
          <DotNumber>1</DotNumber>
          <TextWithIcon>
            Clique no ícone
            <SomaIcon
              className="row-icon"
              color="#262D3F"
              icon="star"
              size="sm"
            />
            para favoritá-lo
          </TextWithIcon>
        </ContentsRow>
        <ContentsRow>
          <DotNumber>2</DotNumber>
          <p>
            {`Para visualizar apenas seus favoritos, 
            clique na caixa de seleção ao lado de Favoritos`}
          </p>
        </ContentsRow>
      </ContentsList>
    ),
  },
  {
    id: 'buscar-editar',
    img: {
      src: BuscarEditarGif,
      alt: 'Demonstração ação de busca e edição',
    },
    title: 'Busca e Edição',
    contents: () => (
      <ContentsList data-testid="test-contents-component">
        <ContentsRow>
          <TextWithIcon>
            <div className="flex-column">
              <div className="flex-row">
                Clique
                <SomaIcon className="row-icon" size="sm" icon="search" color="#262D3F" />
                para buscar ativos pelo ticker ou
              </div>
              <div>
                pelo nome do emissor.
              </div>
            </div>
          </TextWithIcon>
        </ContentsRow>
        <ContentsRow>
          <TextWithIcon>
            <div className="flex-column">
              <div className="flex-row">
                Clique em
                <SomaIcon className="row-icon" size="sm" icon="settings" color="#262D3F" />
                para selecionar quais colunas
              </div>
              <div>
                deseja visualizar na sua tabela principal.
              </div>
            </div>
          </TextWithIcon>
        </ContentsRow>
      </ContentsList>
    ),
  },
  {
    id: 'filtro',
    img: {
      src: FiltrosGif,
      alt: 'Demonstração filtragem',
    },
    title: 'Filtros',
    contents: () => (
      <div data-testid="test-contents-component">
        <p>Defina os critérios para encontrar ativos com maior facilidade.</p>
      </div>
    ),
  },
  {
    id: 'negociacao',
    img: {
      src: NegociacaoGif,
      alt: 'Demonstração ação de negociação',
    },
    title: 'Negociação',
    contents: () => (
      <ContentsList data-testid="test-contents-component">
        <p>
          {`Para comprar e vender ativos da lista, basta clicar em NEGOCIAR. 
        Será aberta ao lado direito da tela uma aba com as principais informações sobre o ativo.`}
        </p>
        <ContentsRow>
          <DotNumber>1</DotNumber>
          <p>Clique na aba Comprar para comprar ativos da XP</p>
        </ContentsRow>
        <ContentsRow>
          <DotNumber>2</DotNumber>
          <p>Clique na aba Vender para vender ativos para a XP </p>
        </ContentsRow>
      </ContentsList>
    ),
  },
  {
    id: 'meus-negocios',
    img: {
      src: MeusNegociosGif,
      alt: 'Demonstração da tabela meus negócios',
    },
    title: 'Meus Negócios',
    contents: () => (
      <ContentsList data-testid="test-contents-component">
        <ContentsRow>
          <TextWithIcon>
            <div className="flex-column">
              <div className="flex-row">
                Clicando em
                <SomaIcon className="row-icon" size="sm" icon="search" color="#262D3F" />
                você pode buscar por ativos
              </div>
              <div>
                já negociados.
              </div>
            </div>
          </TextWithIcon>
        </ContentsRow>
        <ContentsRow>
          <TextWithIcon>
            <div className="flex-column">
              <div className="flex-row">
                Em
                <SVGContainer>
                  <SVGDownload color="#262D3F" />
                </SVGContainer>
                você pode baixar uma planilha com as
              </div>
              <div>
                informações das suas negociações confirmadas.
              </div>
            </div>
          </TextWithIcon>
        </ContentsRow>
        <ContentsRow>
          <TextWithIcon>
            <div className="flex-column">
              <div className="flex-row">
                Oculte e mostre Meus Negócios em
                <SomaIcon className="row-icon" size="sm" icon="eye-off" color="#262D3F" />
              </div>
              <div>
                sempre que precisar de mais espaço de tela.
              </div>
            </div>
          </TextWithIcon>
        </ContentsRow>
      </ContentsList>
    ),
  },
];

export default Steps;
