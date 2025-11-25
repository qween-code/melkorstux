import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import { TrendingUp, DollarSign, Target, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [revenueStats, setRevenueStats] = useState(null);
  const [platformPerformance, setPlatformPerformance] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [revenue, platforms] = await Promise.all([
        analyticsAPI.getRevenueStats(),
        analyticsAPI.getPlatformPerformance()
      ]);

      setRevenueStats(revenue.data);
      setPlatformPerformance(platforms.data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Process platform data for pie chart
  const platformData = platformPerformance.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.platform);
    if (existing) {
      existing.value += curr.count;
    } else {
      acc.push({ name: curr.platform, value: curr.count });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-gray-600">Track your performance and revenue</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">
                ${revenueStats?.summary?.total_revenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 text-green-600">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid Revenue</p>
              <p className="text-3xl font-bold mt-2">
                ${revenueStats?.summary?.paid_revenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Revenue</p>
              <p className="text-3xl font-bold mt-2">
                ${revenueStats?.summary?.pending_revenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50 text-yellow-600">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hires</p>
              <p className="text-3xl font-bold mt-2">
                {revenueStats?.summary?.total_hires || 0}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 text-purple-600">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Platform Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
          {platformData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No data available</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue Breakdown</h3>
          <div className="space-y-4">
            {revenueStats?.monthly?.slice(0, 6).map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">{month.month}</div>
                  <div className="flex-1 ml-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary-600 h-full"
                        style={{
                          width: `${Math.min((month.revenue / 10000) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-4 text-sm font-semibold">
                  ${month.revenue.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Earning Jobs */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Top Earning Jobs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Job Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Hires</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {revenueStats?.top_jobs?.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{job.title}</td>
                  <td className="py-3 px-4 text-sm">{job.company}</td>
                  <td className="py-3 px-4 text-sm text-right">{job.total_hires}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold">
                    ${job.total_revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!revenueStats?.top_jobs || revenueStats.top_jobs.length === 0) && (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
