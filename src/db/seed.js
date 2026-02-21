#!/usr/bin/env node
/**
 * Seed database with sample jobs for testing
 */
import { Jobs } from '../models/index.js';

console.log('🌱 Seeding sample jobs...\n');

const sampleJobs = [
  {
    platform_id: 'mercor',
    title: 'Senior AI/ML Engineer',
    company: 'AI Startup (YC W24)',
    description: 'Build cutting-edge LLM applications. Work on RAG, fine-tuning, and production ML systems.',
    salary_min: 120, salary_max: 180, salary_period: 'hour',
    location: 'Remote - Worldwide', remote_type: 'worldwide', job_type: 'fulltime', experience: 'senior',
    tech_stack: ['Python', 'PyTorch', 'LangChain', 'AWS', 'Docker'],
    requirements: ['5+ years ML experience', 'LLM fine-tuning experience', 'Production deployment skills', 'Strong communication'],
    benefits: ['Flexible hours', 'Latest hardware', '$2K learning budget', 'Stock options'],
    apply_url: 'https://work.mercor.com/explore', priority: 5,
  },
  {
    platform_id: 'mercor',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    description: 'Build user-facing products with React and Node.js. Join a team of 20 engineers.',
    salary_min: 60, salary_max: 100, salary_period: 'hour',
    location: 'Remote - Europe', remote_type: 'europe', job_type: 'fulltime', experience: 'mid',
    tech_stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    requirements: ['3+ years full stack experience', 'React expertise', 'API design skills'],
    benefits: ['Remote work', 'Health insurance', 'Annual retreat'],
    apply_url: 'https://work.mercor.com/explore', priority: 4,
  },
  {
    platform_id: 'turing',
    title: 'DevOps / Platform Engineer',
    company: 'CloudScale',
    description: 'Scale infrastructure for a fast-growing SaaS platform.',
    salary_min: 80, salary_max: 130, salary_period: 'hour',
    location: 'Remote - Worldwide', remote_type: 'worldwide', job_type: 'contract', experience: 'senior',
    tech_stack: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'GitHub Actions'],
    requirements: ['4+ years DevOps', 'AWS certification preferred', 'Kubernetes expert'],
    benefits: ['Flexible schedule', 'Cutting-edge stack'],
    apply_url: 'https://www.turing.com/jobs', priority: 3,
  },
  {
    platform_id: 'toptal',
    title: 'Data Scientist',
    company: 'DataDriven Inc',
    description: 'Lead data science initiatives. Build ML models for business intelligence.',
    salary_min: 90, salary_max: 140, salary_period: 'hour',
    location: 'Remote - USA', remote_type: 'usa', job_type: 'fulltime', experience: 'senior',
    tech_stack: ['Python', 'SQL', 'Spark', 'TensorFlow', 'Tableau'],
    requirements: ['5+ years data science', 'PhD preferred', 'Business communication'],
    benefits: ['Competitive pay', 'Remote-first culture', 'Conference budget'],
    apply_url: 'https://www.toptal.com/talent/apply', priority: 4,
  },
  {
    platform_id: 'mercor',
    title: 'Frontend Developer (React)',
    company: 'Design Studio',
    description: 'Build beautiful, responsive web applications with modern React.',
    salary_min: 50, salary_max: 80, salary_period: 'hour',
    location: 'Remote - Worldwide', remote_type: 'worldwide', job_type: 'fulltime', experience: 'mid',
    tech_stack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    requirements: ['3+ years React', 'UI/UX sensibility', 'Performance optimization'],
    benefits: ['4-day work week option', 'Learning budget'],
    apply_url: 'https://work.mercor.com/explore', priority: 3,
  },
];

for (const jobData of sampleJobs) {
  const job = Jobs.create(jobData);
  console.log(`  ✅ ${job.title} @ ${job.company} (${job.id})`);
}

console.log(`\n✅ Seeded ${sampleJobs.length} sample jobs`);
process.exit(0);
