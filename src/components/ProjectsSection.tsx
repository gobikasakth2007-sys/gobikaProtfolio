import { useState } from 'react';
import {
  ArrowUpRight,
  Edit3,
  Eye,
  FolderGit2,
  Github,
  Layers,
  Plus,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { SafeImage } from './SafeImage';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isEditMode: boolean;
  onUpdateProject: (updated: ProjectItem) => void;
  onAddProject: (project: Omit<ProjectItem, 'id'>) => void;
}

function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

export function ProjectsSection({
  projects,
  isEditMode,
  onUpdateProject,
  onAddProject,
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeTech, setActiveTech] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [techInput, setTechInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  const filterCategories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.categoryLabel).filter(Boolean))),
  ];

  const allTechnologies = [
    'All',
    ...Array.from(
      new Set(projects.flatMap((p) => p.technologies).filter(Boolean))
    ),
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.categoryLabel === activeFilter;
    const matchesTech =
      activeTech === 'All' || p.technologies.includes(activeTech);
    return matchesCategory && matchesTech;
  });

  const openEditor = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setTechInput(project.technologies.join(', '));
    setHighlightsInput((project.highlights ?? []).join('\n'));
  };

  const openNewProjectEditor = () => {
    const template: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: [],
      categoryLabel: 'Software Engineering',
      statusLabel: 'In Progress',
      githubUrl: '',
      isEditableTemplate: false,
      highlights: [],
    };
    setEditingProject(template);
    setTechInput('');
    setHighlightsInput('');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;

    const cleanedTech = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const cleanedHighlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload: ProjectItem = {
      ...editingProject,
      title: editingProject.title.trim(),
      description: editingProject.description.trim(),
      technologies: cleanedTech.length > 0 ? cleanedTech : ['Technology Stack'],
      highlights: cleanedHighlights,
      isEditableTemplate: false,
    };

    const exists = projects.some((p) => p.id === payload.id);
    if (exists) {
      onUpdateProject(payload);
    } else {
      const { id: _ignored, ...rest } = payload;
      onAddProject(rest);
    }
    setEditingProject(null);
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#090B11]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
              03. Selected Work &amp; Roadmap
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              Featured Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Research work in deep learning alongside editable project slots reserved for upcoming Java and database systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#11131C] p-1"
            >
              {filterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(category)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={openNewProjectEditor}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Technology Filter Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter projects by technology">
            <span className="mr-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Technology:
            </span>
            {allTechnologies.map((tech) => {
              const selected = activeTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(tech)}
                  aria-pressed={selected}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    selected
                      ? 'bg-violet-600/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 border border-violet-500/40'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-transparent hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          <p className="font-mono-data text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredProjects.length} of {projects.length}
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#11131C] p-10 text-center">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
              No projects match the selected filters
            </p>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              Try clearing the category or technology filter to view all projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setActiveTech('All');
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Project Filters
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const hasValidRepo = isValidUrl(project.githubUrl);

            return (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#11131C] transition-colors duration-150 hover:border-violet-500/40"
              >
                {/* Project Visual Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0B0D14]">
                  {project.imageUrl ? (
                    <SafeImage
                      src={project.imageUrl}
                      alt={project.title}
                      fallbackTitle={project.title}
                      fallbackIcon={<Layers className="h-10 w-10" />}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-slate-100 via-slate-50 to-violet-50/60 dark:from-[#0E1019] dark:via-[#121524] dark:to-violet-950/25">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161926] text-violet-600 dark:text-violet-400">
                        <FolderGit2 className="h-6 w-6" />
                      </div>
                      <span className="font-mono-data text-xs text-slate-500 dark:text-slate-400">
                        Project Slot 0{index + 1} · {project.categoryLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Unboxed quiet metadata line */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{project.statusLabel}</span>
                  </p>

                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-slate-950 dark:text-white [text-wrap:balance]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 flex-1">
                    {project.description}
                  </p>

                  {/* Unboxed Technology List (Zero-pill discipline) */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
                    <p className="font-mono-data text-xs leading-relaxed text-violet-700 dark:text-violet-300">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090B11] px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500/50 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>

                    {hasValidRepo ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openEditor(project)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-dashed border-slate-300 dark:border-white/20 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>{project.isEditableTemplate || isEditMode ? 'Customize' : 'Add GitHub URL'}</span>
                      </button>
                    )}

                    {(isEditMode || project.isEditableTemplate) && hasValidRepo && (
                      <button
                        type="button"
                        onClick={() => openEditor(project)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-500 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#11131C] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedProject.categoryLabel} <span aria-hidden="true">·</span> {selectedProject.statusLabel}
                </p>
                <h3
                  id="project-detail-title"
                  className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedProject.description}
            </p>

            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  Scope &amp; Architecture Notes
                </h4>
                <ul className="mt-2.5 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                  {selectedProject.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono-data text-xs text-violet-700 dark:text-violet-300">
                {selectedProject.technologies.join(' · ')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedProject;
                    setSelectedProject(null);
                    openEditor(target);
                  }}
                  className="rounded-lg border border-slate-200 dark:border-white/10 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500 transition-colors"
                >
                  Edit Project
                </button>
                {isValidUrl(selectedProject.githubUrl) && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>Open Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize / Edit Project Modal */}
      {editingProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setEditingProject(null)}
        >
          <form
            onSubmit={handleSaveProject}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#11131C] p-6 sm:p-8 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="edit-project-title" className="font-display text-xl font-bold text-slate-950 dark:text-white">
                Customize Project
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                aria-label="Close project editor"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label htmlFor="proj-title" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Project Title
              </label>
              <input
                id="proj-title"
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="e.g., Library Management System in Java"
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proj-cat" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  id="proj-cat"
                  type="text"
                  value={editingProject.categoryLabel}
                  onChange={(e) => setEditingProject({ ...editingProject, categoryLabel: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="proj-status" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current Status
                </label>
                <input
                  id="proj-status"
                  type="text"
                  value={editingProject.statusLabel}
                  onChange={(e) => setEditingProject({ ...editingProject, statusLabel: e.target.value })}
                  placeholder="e.g., In Progress / Completed"
                  className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="proj-desc" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                id="proj-desc"
                rows={3}
                required
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="proj-tech" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Technologies (comma-separated)
              </label>
              <input
                id="proj-tech"
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Java, JDBC, Oracle Database"
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="proj-github" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repository URL (leave blank if private or pending)
              </label>
              <input
                id="proj-github"
                type="url"
                value={editingProject.githubUrl}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repository"
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="proj-highlights" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Key Highlights (one per line)
              </label>
              <textarea
                id="proj-highlights"
                rows={3}
                value={highlightsInput}
                onChange={(e) => setHighlightsInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="rounded-lg border border-slate-200 dark:border-white/10 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
