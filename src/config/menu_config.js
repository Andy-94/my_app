import {
  HomeOutlined,
  AppstoreOutlined,
  AlignCenterOutlined,
  ToolOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MailOutlined,
} from '@ant-design/icons';

export default [
  {
    title: 'Home', 
    key: 'home', 
    icon: HomeOutlined,
    path: '/admin/home'
  },
  {
    title: 'Product',
    key: 'prod_about',
    icon: AppstoreOutlined,
    children: [ 
      {
        title: 'Category',
        key: 'category',
        icon: AlignCenterOutlined,
        path: '/admin/prod_about/category'
      },
      {
        title: 'Manager',
        key: 'product',
        icon: ToolOutlined,
        path: '/admin/prod_about/product'
      },
    ]
  },

  {
    title: 'User',
    key: 'user',
    icon: UserOutlined,
    path: '/admin/user'
  },
  {
    title: 'Role',
    key: 'role',
    icon: UsergroupAddOutlined,
    path: '/admin/role'
  },

  {
    title: 'Charts',
    key: 'charts',
    icon: MailOutlined,
    children: [
      {
        title: 'Bar Chart',
        key: 'bar',
        icon: BarChartOutlined,
        path: '/admin/charts/bar'
      },
      {
        title: 'Line Chart',
        key: 'line',
        icon: LineChartOutlined,
        path: '/admin/charts/line'
      },
      {
        title: 'Pie Chart',
        key:  'pie',
        icon: PieChartOutlined,
        path: '/admin/charts/pie'
      },
    ]
  },
]
