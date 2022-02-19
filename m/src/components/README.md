# Pasta 'components'

Use essa pasta para armazenar componentes. Lembre-se de criar um diretório para cada componente no formato PascoalCase. Além disso, você pode nomear componentes de mesmo 'contexto' prefixados para agrupa-los.

**Ruim**

```
|-- components
    |-- ActionListItem
    |-- Button
    |-- Container
    |-- ItemList
    `-- List
```

**Bom**

```
|-- components
    |-- Button
    |-- Container
    |-- List
    |-- ListItem
    `-- ListItemAction
```

## Componentes atômicos

Se você estiver utilizando _CSS-in-JS_ para construção de componentes (indicamos o uso do [StyledComponents](https://styled-components.com/)), agrupe os componentes atômicos utilizados para criar seu componente dentro de um arquivo `atoms.ts`.

## Testes

Cada componente contém seu diretório, que agrupa os arquivos necessários para construção daquele componente em específico. O arquivo de teste é um desses arquivos. Por padrão, nomeei-o com o sufixo `.test.ts`.
