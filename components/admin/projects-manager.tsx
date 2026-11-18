'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowUpRight,
  Save,
  X,
  ExternalLink,
} from 'lucide-react';
import { Project } from '@/lib/types/portfolio';
import { fallbackProjects } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function ProjectsManager() {
  const [projects, setProjects] = React.useState<Project[]>(fallbackProjects);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isCreating, setIsCreating] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load from Supabase if connected
  React.useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true });

        if (data && !error && data.length > 0) {
          setProjects(
            data.map((item) => ({
              id: item.id,
              title: item.title,
              slug: item.slug,
              domain: item.domain,
              summary: item.summary,
              overview: item.overview,
              problem: item.problem,
              solution: item.solution,
              keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
              responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
              techStack: item.tech_stack || [],
              outcome: Array.isArray(item.outcome) ? item.outcome : [],
              liveDemoUrl: item.live_demo_url,
              coverImage: item.cover_image,
              galleryImages: Array.isArray(item.gallery_images) ? item.gallery_images : [],
              status: (item.status === 'published' ? 'published' : 'draft') as 'published' | 'draft',
              isFeatured: item.is_featured,
              sortOrder: item.sort_order,
              viewsCount: item.views_count || 0,
            }))
          );
        }
      }
    }
    loadData();
  }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleTogglePublish = async (project: Project) => {
    const nextStatus: 'published' | 'draft' = project.status === 'published' ? 'draft' : 'published';
    const updated: Project[] = projects.map((p) => (p.id === project.id ? { ...p, status: nextStatus } : p));
    setProjects(updated);

    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase
        .from('projects')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', project.id);
      if (error) {
        showFeedback('error', 'Failed to update status in database.');
        return;
      }
    }
    showFeedback('success', `Project marked as ${nextStatus}.`);
  };

  const handleToggleFeatured = async (project: Project) => {
    const nextFeatured = !project.isFeatured;
    const updated = projects.map((p) => (p.id === project.id ? { ...p, isFeatured: nextFeatured } : p));
    setProjects(updated);

    const supabase = createClient();
    if (supabase) {
      await supabase
        .from('projects')
        .update({ is_featured: nextFeatured, updated_at: new Date().toISOString() })
        .eq('id', project.id);
    }
    showFeedback('success', nextFeatured ? 'Marked as featured.' : 'Removed from featured.');
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }
    setProjects(projects.filter((p) => p.id !== id));

    const supabase = createClient();
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
    showFeedback('success', `Project "${title}" deleted.`);
  };

  const handleSaveProject = async (formData: Project) => {
    // Validate required fields
    if (!formData.title || !formData.slug || !formData.domain || !formData.summary) {
      showFeedback('error', 'Title, slug, domain, and summary are required.');
      return;
    }

    const isNew = !projects.some((p) => p.id === formData.id);
    let nextProjects: Project[];

    if (isNew) {
      nextProjects = [...projects, formData];
    } else {
      nextProjects = projects.map((p) => (p.id === formData.id ? formData : p));
    }
    setProjects(nextProjects);

    const supabase = createClient();
    if (supabase) {
      const payload = {
        id: formData.id,
        title: formData.title,
        slug: formData.slug,
        domain: formData.domain,
        summary: formData.summary,
        overview: formData.overview,
        problem: formData.problem,
        solution: formData.solution,
        key_features: formData.keyFeatures,
        responsibilities: formData.responsibilities,
        tech_stack: formData.techStack,
        outcome: formData.outcome,
        live_demo_url: formData.liveDemoUrl,
        cover_image: formData.coverImage,
        gallery_images: formData.galleryImages,
        status: formData.status,
        is_featured: formData.isFeatured,
        sort_order: formData.sortOrder,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await supabase.from('projects').insert([payload]);
      } else {
        await supabase.from('projects').update(payload).eq('id', formData.id);
      }
    }

    setEditingProject(null);
    setIsCreating(false);
    showFeedback('success', isNew ? 'Project created successfully.' : 'Project updated successfully.');
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Projects Manager</h2>
          <p className="text-xs text-slate-400">
            Create, edit, reorder, and publish case studies. Drafts can be previewed privately.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProject({
              id: 'p-' + Date.now(),
              title: '',
              slug: '',
              domain: 'Finance',
              summary: '',
              overview: '',
              problem: '',
              solution: '',
              keyFeatures: [''],
              responsibilities: [''],
              techStack: ['Power BI', 'DAX'],
              outcome: [''],
              liveDemoUrl: null,
              coverImage: null,
              galleryImages: [],
              status: 'draft',
              isFeatured: false,
              sortOrder: projects.length + 1,
            });
            setIsCreating(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-lg text-xs font-medium border flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or domain..."
          className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Title & Domain</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{proj.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{proj.domain} • /{proj.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(proj)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        proj.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                      }`}
                    >
                      {proj.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-1 rounded transition-colors ${
                        proj.isFeatured ? 'text-amber-400 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={proj.isFeatured ? 'Featured project' : 'Not featured'}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{proj.sortOrder}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${proj.slug}?preview=true`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-brand-400 transition-colors"
                        title="Live Preview Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(proj);
                          setIsCreating(false);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal Form */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          isNew={isCreating}
          onClose={() => {
            setEditingProject(null);
            setIsCreating(false);
          }}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
}

interface ProjectEditModalProps {
  project: Project;
  isNew: boolean;
  onClose: () => void;
  onSave: (p: Project) => void;
}

function ProjectEditModal({ project, isNew, onClose, onSave }: ProjectEditModalProps) {
  const [formData, setFormData] = React.useState<Project>({ ...project });
  const [techInput, setTechInput] = React.useState('');

  const autoGenerateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isNew ? autoGenerateSlug(val) : prev.slug,
    }));
  };

  const handleArrayItemChange = (field: 'keyFeatures' | 'responsibilities' | 'outcome', index: number, value: string) => {
    const list = [...(formData[field] || [])];
    list[index] = value;
    setFormData({ ...formData, [field]: list });
  };

  const handleAddArrayItem = (field: 'keyFeatures' | 'responsibilities' | 'outcome') => {
    const list = [...(formData[field] || []), ''];
    setFormData({ ...formData, [field]: list });
  };

  const handleRemoveArrayItem = (field: 'keyFeatures' | 'responsibilities' | 'outcome', index: number) => {
    const list = [...(formData[field] || [])];
    list.splice(index, 1);
    setFormData({ ...formData, [field]: list });
  };

  const handleAddTechTag = () => {
    if (!techInput.trim()) return;
    const existing = Array.isArray(formData.techStack) ? formData.techStack : [];
    if (!existing.includes(techInput.trim())) {
      setFormData({ ...formData, techStack: [...existing, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTechTag = (tag: string) => {
    const existing = Array.isArray(formData.techStack) ? formData.techStack : [];
    setFormData({ ...formData, techStack: existing.filter((t) => t !== tag) });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl my-8 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {isNew ? 'Create New Case Study' : `Edit: ${formData.title}`}
            </h3>
            <p className="text-xs text-slate-400">All fields strictly follow verified facts and anonymization guidelines.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Multi-Entity Consolidated Finance Analytics"
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Domain & Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Domain *</label>
              <input
                type="text"
                required
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                placeholder="e.g. Finance, Banking, Logistics"
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="draft">Draft (Hidden from public)</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded border-slate-700 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="isFeatured" className="font-semibold text-slate-300 cursor-pointer">
              Mark as Featured Project
            </label>
          </div>

          {/* One-line Summary */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">One-line Summary *</label>
            <input
              type="text"
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Overview Paragraph</label>
            <textarea
              rows={2}
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Problem / Challenge</label>
              <textarea
                rows={3}
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Solution / What I Built</label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Key Features Bullets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">Key Features</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('keyFeatures')}
                className="text-brand-400 hover:text-brand-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Feature Bullet
              </button>
            </div>
            <div className="space-y-2">
              {(formData.keyFeatures || []).map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleArrayItemChange('keyFeatures', i, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('keyFeatures', i)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities Bullets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">My Role & Responsibilities</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('responsibilities')}
                className="text-brand-400 hover:text-brand-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Responsibility
              </button>
            </div>
            <div className="space-y-2">
              {(formData.responsibilities || []).map((resp, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayItemChange('responsibilities', i, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('responsibilities', i)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome Bullets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">Outcome & Impact (Hide section if empty)</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('outcome')}
                className="text-brand-400 hover:text-brand-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Outcome Bullet
              </button>
            </div>
            <div className="space-y-2">
              {(formData.outcome || []).map((out, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={out}
                    onChange={(e) => handleArrayItemChange('outcome', i, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('outcome', i)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips Tag Input */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Tech Stack</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechTag();
                  }
                }}
                placeholder="Type tech name and click Add (e.g. Power BI, DAX, Python)"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
              />
              <button
                type="button"
                onClick={handleAddTechTag}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 font-semibold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(Array.isArray(formData.techStack) ? formData.techStack : []).map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechTag(t)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Live Demo URL */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Live Demo URL (Optional, sample data only)
            </label>
            <input
              type="url"
              value={formData.liveDemoUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value || null })}
              placeholder="https://app.powerbi.com/view?r=..."
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Modal actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <Link
            href={`/projects/${formData.slug}?preview=true`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:underline"
          >
            <span>Live Draft Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Case Study</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
