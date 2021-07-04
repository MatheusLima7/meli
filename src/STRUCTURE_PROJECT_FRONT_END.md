# Meli versão web

## Estrutura do projeto

```
    - @components                      -> Componentes gerais
        - ${component}                 -> Pasta com o nome do componente
          index.js                     -> Arquivo index com o código do componente
          styles.module.scss           -> Estilo referente ao componente
        index.js                       -> Na raiz da pasta componentes pode ter um index para exportação dos components (opcional)
        ...
    - @hooks                           -> Pasta destinada aos hooks que serão compartilhados
        - ${component}                 -> Pasta com o nome do componente em que os hooks serão utilizados
          {name}.js                    -> Nome descritivo referente a utilização dos hooks
        ...
    - @pages                           -> Pasta dos arquivos, screens e api do next.js
        - api                          -> Pasta de rotas do next.js
            - items                    -> Pasta genérica de rotas
                [parameter].js         -> Arquivo para geração rotas dinâmicas com parâmetro name
            - {route}.js               -> Arquivo para gerar rota estática
        {screen}.js                    -> Arquivo para gerar screens no next.js
        ...
    - @redux
        - ${name}                      -> Pasta de Actions, Reducers, Sagas, Selectors e Types referente ao nome
            actions.js
            reducers.js
            sagas.js
            selectors.js
            types.js
        configureStore.js
        rootReducer.js
        rootSaga.js
            index                      -> Arquivo de configuração do middleware
        ...
    - @services
        ...
    - @styles
        _mixins.scss                   -> Contém as medias queries adotadas
        global.scss                    -> Estilo global da aplicação
        variables.scss                 -> Variáveis adotadas no estilo
        ...
    - @utils
        - ${name}                      -> Pasta referenciando a utilidade
```

### Components

- [Logo](components/logo/LOGO.md)
- [Price](components/price/PRICE.md)
