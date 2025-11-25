import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsAPI, analyticsAPI } from '../services/api';
import { ArrowLeft, ExternalLink, Eye, MousePointerClick, FileText } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const [jobData, analyticsData] = await Promise.all([
        jobsAPI.getById(id),
        analyticsAPI.getJobAnalytics(id)
      ]);

      setJob(jobData.data);
      setAnalytics(analyticsData.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Job not found</p>
        <Link to="/jobs" className="btn btn-primary mt-4">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/jobs" className="inline-flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Jobs
      </Link>

      {/* Job Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-2">{job.company}</p>
          </div>
          <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
            {job.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">Salary</p>
            <p className="mt-1 text-lg font-semibold">${job.salary_min}-${job.salary_max}/hr</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="mt-1 text-lg font-semibold">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="mt-1 text-lg font-semibold capitalize">{job.experience_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="mt-1 text-lg font-semibold capitalize">{job.job_type}</p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={job.referral_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Apply with Referral Link
          </a>
        </div>
      </div>

      {/* Analytics */}
      {analytics && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-2xl font-bold">{analytics.impressions || 0}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <MousePointerClick className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Clicks</p>
                <p className="text-2xl font-bold">{analytics.clicks || 0}</p>
                <p className="text-xs text-gray-500">CTR: {analytics.ctr}%</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold">{analytics.applications || 0}</p>
                <p className="text-xs text-gray-500">Rate: {analytics.application_rate}%</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Hires</p>
                <p className="text-2xl font-bold">{analytics.hires || 0}</p>
                <p className="text-xs text-gray-500">Rate: {analytics.hire_rate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {job.tech_stack?.map((tech, index) => (
              <span key={index} className="badge badge-primary text-base px-3 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements?.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Benefits</h2>
          <ul className="space-y-2">
            {job.benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
