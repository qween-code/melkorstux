import { useState, useEffect } from 'react';
import { analyticsAPI, jobsAPI, contentAPI } from '../services/api';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  FileText,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StatCard({ title, value, icon: Icon, change, color = 'primary' }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-yellow-50 text-yellow-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [jobStats, setJobStats] = useState(null);
  const [contentStats, setContentStats] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardData, jobs, content] = await Promise.all([
        analyticsAPI.getDashboard(),
        jobsAPI.getStats(),
        contentAPI.getStats()
      ]);

      setDashboard(dashboardData.data);
      setJobStats(jobs.data);
      setContentStats(content.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Active Jobs',
      value: jobStats?.active || 0,
      icon: Briefcase,
      change: 12,
      color: 'primary'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboard?.revenue?.total_revenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      change: 23,
      color: 'success'
    },
    {
      title: 'Impressions',
      value: dashboard?.funnel?.impression?.toLocaleString() || 0,
      icon: Eye,
      change: 8,
      color: 'info'
    },
    {
      title: 'Clicks',
      value: dashboard?.funnel?.click?.toLocaleString() || 0,
      icon: MousePointerClick,
      change: 15,
      color: 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your referrals.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Stats Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboard?.daily || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Impressions', value: dashboard?.funnel?.impression || 0 },
              { name: 'Clicks', value: dashboard?.funnel?.click || 0 },
              { name: 'Applications', value: dashboard?.funnel?.application || 0 },
              { name: 'Interviews', value: dashboard?.funnel?.interview || 0 },
              { name: 'Hires', value: dashboard?.funnel?.hire || 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Jobs Overview */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Jobs Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium">Active Jobs</span>
              </div>
              <span className="text-lg font-bold">{jobStats?.active || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium">Total Jobs</span>
              </div>
              <span className="text-lg font-bold">{jobStats?.total || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="text-sm font-medium">Filled</span>
              </div>
              <span className="text-lg font-bold">{jobStats?.filled || 0}</span>
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Content Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium">Total Content</span>
              </div>
              <span className="text-lg font-bold">{contentStats?.total || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium">Posted</span>
              </div>
              <span className="text-lg font-bold">{contentStats?.posted || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="text-sm font-medium">Scheduled</span>
              </div>
              <span className="text-lg font-bold">{contentStats?.scheduled || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
