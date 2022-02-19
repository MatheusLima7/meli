const mockColumns = [
  {
    Header: 'Emissão',
    accessor: 'emission'
  },
  {
    Header: 'Rating',
    accessor: 'rating'
  },
  {
    Header: 'Compra',
    columns: [
      {
        Header: 'Volume indicativo',
        accessor: 'indicativeVolumeAsk'
      },
      {
        Header: 'Ask',
        accessor: 'ask'
      }
    ]
  }
]

export default mockColumns
