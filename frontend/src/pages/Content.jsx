import { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import { Plus, Send } from 'lucide-react';

export default function Content() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContent();
  }, [filter]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getAll({ status: filter });
      setContents(response.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform) => {
    const colors = {
      linkedin: 'bg-blue-100 text-blue-800',
      twitter: 'bg-sky-100 text-sky-800',
      discord: 'bg-indigo-100 text-indigo-800',
      telegram: 'bg-cyan-100 text-cyan-800',
      reddit: 'bg-orange-100 text-orange-800',
      facebook: 'bg-blue-100 text-blue-800',
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const badges = {
      draft: 'badge-warning',
      scheduled: 'badge-info',
      posted: 'badge-success',
      failed: 'badge-danger'
    };
    return `badge ${badges[status] || 'badge-info'}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-1 text-gray-600">Create and manage social media content</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Generate Content
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <select
          className="input sm:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="posted">Posted</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {contents.map((content) => (
            <div key={content.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`badge ${getPlatformColor(content.platform)}`}>
                    {content.platform}
                  </span>
                  <span className={getStatusBadge(content.status)}>
                    {content.status}
                  </span>
                </div>
                {content.status === 'posted' && content.post_url && (
                  <a
                    href={content.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Post →
                  </a>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{content.content_text}</p>
              </div>

              {content.hashtags && (
                <div className="mt-4 text-sm text-primary-600">
                  {content.hashtags}
                </div>
              )}

              {content.scheduled_time && content.status === 'scheduled' && (
                <div className="mt-4 text-sm text-gray-500">
                  Scheduled for: {new Date(content.scheduled_time).toLocaleString()}
                </div>
              )}

              {content.posted_time && content.status === 'posted' && (
                <div className="mt-4 text-sm text-gray-500">
                  Posted: {new Date(content.posted_time).toLocaleString()}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button className="btn btn-secondary">Edit</button>
                {content.status === 'draft' && (
                  <button className="btn btn-primary flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Post Now
                  </button>
                )}
              </div>
            </div>
          ))}

          {contents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No content found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
