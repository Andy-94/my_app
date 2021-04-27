export default [
  {
    title: 'Home', 
    key: 'home', 
    disabled:true,
  },
  {
    title: 'Product',
    key: 'prod_about',
    children: [ 
      {
        title: 'Category',
        key: 'category',
      },
      {
        title: 'Manager',
        key: 'product',
      },
    ]
  },

  {
    title: 'User',
    key: 'user',
  },
  {
    title: 'Role',
    key: 'role',
  },

  {
    title: 'Charts',
    key: 'charts',
    children: [
      {
        title: 'Bar Chart',
        key: 'bar',
      },
      {
        title: 'Line Chart',
        key: 'line',
      },
      {
        title: 'Pie Chart',
        key:  'pie',
      },
    ]
  },
]
