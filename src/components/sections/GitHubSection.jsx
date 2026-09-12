import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, GitPullRequest, CircleDot, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function GitHubSection() {
  const username = portfolioData.githubStats.username || 'Hariom-patidar-tech';

  const [liveStats, setLiveStats] = useState({
    totalStars: 0,
    publicRepos: 4,
    followers: 0,
    repos: portfolioData.githubStats.pinnedRepos || []
  });

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();

        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          
          const formattedRepos = reposData.slice(0, 8).map((r) => ({
            name: r.name,
            stars: r.stargazers_count,
            forks: r.forks_count,
            lang: r.language || 'Python',
            desc: r.description || 'Open source repository by Hariom Patidar.',
            url: r.html_url
          }));

          setLiveStats({
            totalStars: stars,
            publicRepos: userData.public_repos || reposData.length,
            followers: userData.followers || 0,
            repos: formattedRepos.length > 0 ? formattedRepos : portfolioData.githubStats.pinnedRepos
          });
        }
      } catch (err) {
        console.log('Using default GitHub stats fallback', err);
      }
    }

    fetchGitHubData();
  }, [username]);

  return (
    <section id="github" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Open Source & Commits"
        title="GitHub Ecosystem & Repositories"
        subtitle={`Live GitHub activity, contribution heatmap, and repository metrics for @${username}.`}
      />

      {/* Live GitHub Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-5 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-900 text-white">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-slate-900">{liveStats.totalStars}</div>
            <div className="text-[11px] font-mono text-slate-500">Total Stars</div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-900 text-white">
            <FaGithub className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-slate-900">{liveStats.publicRepos}</div>
            <div className="text-[11px] font-mono text-slate-500">Repositories</div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-900 text-white">
            <GitPullRequest className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-slate-900">24+</div>
            <div className="text-[11px] font-mono text-slate-500">PRs Merged</div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-900 text-white">
            <CircleDot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-slate-900">{liveStats.followers}</div>
            <div className="text-[11px] font-mono text-slate-500">Followers</div>
          </div>
        </GlassCard>
      </div>

      {/* Real GitHub Contribution Heatmap Card */}
      <GlassCard className="p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <FaGithub className="w-5 h-5 text-slate-900" />
            <h3 className="font-display font-bold text-lg text-slate-900">
              @{username} GitHub Contribution Heatmap
            </h3>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="btn-antigravity-dark px-4 py-2 text-xs font-mono font-semibold flex items-center space-x-1.5 shadow-sm"
          >
            <span className="text-white">Follow on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

        {/* Real Live Dynamic GitHub Contribution Chart */}
        <div className="overflow-x-auto pb-2 flex justify-center">
          <img
            src={`https://ghchart.rshah.org/0f172a/${username}`}
            alt={`${username} GitHub Contribution Heatmap`}
            className="w-full h-auto min-w-[700px] max-w-full rounded-lg filter drop-shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=minimal&bg_color=00000000&color=0f172a&line=0f172a&point=0f172a&area=true&hide_border=true`;
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-200 mt-6">
          <span>Live GitHub Contribution Graph (@{username})</span>
          <div className="flex items-center space-x-1">
            <span>Less</span>
            <span className="w-3 h-3 rounded-sm bg-slate-100" />
            <span className="w-3 h-3 rounded-sm bg-slate-300" />
            <span className="w-3 h-3 rounded-sm bg-slate-600" />
            <span className="w-3 h-3 rounded-sm bg-slate-900" />
            <span>More</span>
          </div>
        </div>
      </GlassCard>

      {/* Real Repositories Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-slate-900 mb-4">
          Open Source Repositories & Star Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveStats.repos.map((repo) => (
            <GlassCard key={repo.name} className="p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={repo.url || `https://github.com/${username}/${repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display font-bold text-sm text-slate-900 group-hover:underline truncate"
                  >
                    {repo.name}
                  </a>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold shrink-0">
                    {repo.lang}
                  </span>
                </div>
                <p className="text-slate-600 text-xs line-clamp-3 mb-4 font-sans">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{repo.stars}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-700" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
                <a
                  href={repo.url || `https://github.com/${username}/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-900 hover:text-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
