import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { Plus, Search, ExternalLink } from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('active');

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAll({ status: filter });
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      active: 'badge-success',
      filled: 'badge-primary',
      expired: 'badge-warning',
      archived: 'badge-danger'
    };
    return `badge ${badges[status] || 'badge-info'}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <p className="mt-1 text-gray-600">Manage your job listings and referrals</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="input pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <select
            className="input sm:w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="filled">Filled</option>
            <option value="expired">Expired</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-xl font-semibold text-gray-900 hover:text-primary-600"
                      >
                        {job.title}
                      </Link>
                      <p className="text-gray-600 mt-1">{job.company}</p>
                    </div>
                    <span className={getStatusBadge(job.status)}>{job.status}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tech_stack?.slice(0, 4).map((tech, index) => (
                      <span key={index} className="badge badge-info">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Salary:</span>{' '}
                      ${job.salary_min}-${job.salary_max}/hr
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {job.location}
                    </div>
                    <div>
                      <span className="font-medium">Level:</span> {job.experience_level}
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex gap-2">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  <a
                    href={job.referral_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
