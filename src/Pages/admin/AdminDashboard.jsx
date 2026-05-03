import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaBox, FaShoppingCart, FaUsers, FaChartLine } from "react-icons/fa";
import Loader from "../../Components/Loader";

const COLORS = ["#FF9013", "#334443", "#F5F1DC", "#8884d8", "#82ca9d"];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [lowStock, setLowStock] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [prodRes, orderRes, userRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/api/Product"),
          axios.get(import.meta.env.VITE_API_URL + "/api/Orders", { headers }),
          axios.get(import.meta.env.VITE_API_URL + "/api/User/all", { headers }),
        ]);

        const products = prodRes.data;
        const orders = orderRes.data;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: userRes.data.length,
          revenue: totalRevenue,
        });

        setRecentOrders(orders.slice(0, 4));

        // Low stock
        setLowStock(products.filter(p => p.stock < 10).slice(0, 3));

        // Top Products (by sales count in orders)
        const productSales = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
          });
        });
        const sortedProducts = Object.keys(productSales)
          .map(name => ({ name, sales: productSales[name] }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 3);
        setTopProducts(sortedProducts);

        // Category data
        const catCounts = products.reduce((acc, p) => {
          acc[p.catagory] = (acc[p.catagory] || 0) + 1;
          return acc;
        }, {});
        setCategoryData(Object.keys(catCounts).map(cat => ({ name: cat, value: catCounts[cat] })));

        // Prepare chart data (Group revenue by date)
        const groupedData = orders.reduce((acc, order) => {
          const date = new Date(order.date).toLocaleDateString();
          acc[date] = (acc[date] || 0) + order.total;
          return acc;
        }, {});

        const formattedChartData = Object.keys(groupedData).map((date) => ({
          name: date,
          revenue: groupedData[date],
        })).sort((a, b) => new Date(a.name) - new Date(b.name)).slice(-7); // Last 7 days

        setChartData(formattedChartData);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-3 animate-fadeIn">
      <div className="flex justify-between items-end border-b border-secondery/5 pb-2">
        <h1 className="text-2xl font-bold text-secondery">Dashboard Overview</h1>
        <div className="text-[10px] text-secondery/50 uppercase tracking-wider">
          Sync: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FaBox className="text-blue-500" />}
          title="Total Products"
          value={stats.products}
          color="border-blue-500"
          link="/admin/products"
        />
        <StatCard
          icon={<FaShoppingCart className="text-green-500" />}
          title="Total Orders"
          value={stats.orders}
          color="border-green-500"
          link="/admin/orders"
        />
        <StatCard
          icon={<FaUsers className="text-purple-500" />}
          title="Total Users"
          value={stats.users}
          color="border-purple-500"
          link="/admin/users"
        />
        <StatCard
          icon={<FaChartLine className="text-accent" />}
          title="Total Revenue"
          value={`LKR ${stats.revenue.toLocaleString()}`}
          color="border-accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-lg border border-secondery/5">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            Revenue Trend
          </h2>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9013" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#FF9013" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#334443', fontSize: 10}}
                    dy={5}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#334443', fontSize: 10}}
                />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px'}}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF9013"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-secondery/5">
          <h2 className="text-sm font-semibold mb-2">Categories</h2>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-secondery/5 flex flex-col justify-between">
          <h2 className="text-sm font-semibold mb-2">Recent Orders</h2>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.orderId} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-primary/30 transition text-[11px]">
                <div>
                  <p className="font-medium text-secondery truncate max-w-[80px]">{order.customername}</p>
                  <p className="text-[10px] text-secondery/60">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">LKR {order.total}</p>
                  <span className="text-[9px] uppercase font-bold text-secondery/40">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/orders" className="w-full mt-2 py-1 text-accent font-medium hover:underline text-[11px] text-center block">
            View All
          </Link>
        </div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Low Stock Alerts */}
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-red-50/50 flex items-center gap-4">
          <div className="bg-red-50 p-2 rounded-xl text-red-500 text-lg">
            <FaBox />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-[10px] font-bold text-secondery uppercase tracking-wider mb-1">Low Stock Alerts</h3>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {lowStock.map(p => (
                <div key={p.productId} className="bg-red-50/50 border border-red-100 px-2 py-0.5 rounded text-[9px] text-red-600 font-medium whitespace-nowrap">
                  {p.name}: {p.stock}
                </div>
              ))}
              {lowStock.length === 0 && <p className="text-[9px] text-green-600">All stock levels healthy</p>}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-green-50/50 flex items-center gap-4">
          <div className="bg-green-50 p-2 rounded-xl text-green-500 text-lg">
            <FaChartLine />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-[10px] font-bold text-secondery uppercase tracking-wider mb-1">Top Selling Products</h3>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {topProducts.map(p => (
                <div key={p.name} className="bg-green-50/50 border border-green-100 px-2 py-0.5 rounded text-[9px] text-green-600 font-medium whitespace-nowrap">
                  {p.name} ({p.sales})
                </div>
              ))}
              {topProducts.length === 0 && <p className="text-[9px] text-secondery/40">No sales data yet</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/20 flex items-center justify-between px-6">
        <div className="flex gap-6">
          <QuickAction icon={<FaBox />} label="Add Product" link="/admin/add-product" />
          <QuickAction icon={<FaShoppingCart />} label="View Orders" link="/admin/orders" />
          <QuickAction icon={<FaUsers />} label="Manage Users" link="/admin/users" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-secondery/40 font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          System Live
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, link }) => (
  <Link to={link} className="flex items-center gap-2 text-secondery/70 hover:text-accent transition group">
    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-secondery/5 group-hover:border-accent/30 transition">
      {icon}
    </div>
    <span className="text-[11px] font-semibold">{label}</span>
  </Link>
);

const StatCard = ({ icon, title, value, color, link }) => {
  const content = (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-gray-50 text-2xl">{icon}</div>
      <div>
        <p className="text-secondery/60 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-secondery mt-1">{value}</h3>
      </div>
    </div>
  );

  const className = `bg-white p-4 rounded-2xl shadow-lg border-l-4 ${color} transition transform hover:scale-105 cursor-pointer`;

  return link ? (
    <Link to={link} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default AdminDashboard;
