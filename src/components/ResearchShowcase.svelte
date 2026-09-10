<script lang="ts">
	import { RESEARCH_PAPERS } from '$lib/researchShowcase';
	import { RESEARCH_HIGHLIGHTS, CITATIONS_CHECKED } from '$lib/researchHighlights';
	const featured = RESEARCH_HIGHLIGHTS.map((highlight) => {
		const paper = RESEARCH_PAPERS.find((paper) => paper.link.endsWith(highlight.id));
		if (!paper) throw new Error('Missing highlighted paper: ' + highlight.id);
		return { ...paper, ...highlight, imgSrc: '/images/papers/' + highlight.image };
	});

	const dateFormat = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const formatDate = (date: string) =>
		date.length === 4 ? date : dateFormat.format(new Date(`${date}T12:00:00Z`));
</script>

<p>
	Selected work coauthored by MAIA members and alumni. These projects were conducted across their
	respective research groups and institutions.
</p>

<h3 class="section-label">Highlighted papers</h3>
<div class="featured-grid not-prose">
	{#each featured as paper (paper.link)}
		<article>
			<a
				href={paper.link}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`Read ${paper.title}`}
			>
				<img src={paper.imgSrc} alt={`First page of ${paper.title}`} loading="lazy" />
			</a>
			<h4><a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a></h4>
			<time datetime={paper.date}>{formatDate(paper.date)}</time>
			<a class="citation-count" href={'https://openalex.org/' + paper.openAlex} target="_blank" rel="noopener noreferrer">{paper.citations} indexed citations</a>
			<p class="authors">MAIA coauthors: {paper.authors.join(', ')}</p>
		</article>
	{/each}
</div>
<p class="citation-note">Citation counts from OpenAlex, checked {formatDate(CITATIONS_CHECKED)}. Coverage varies; zero means no citations indexed in that record.</p>
<h3 class="section-label">All research</h3>

<div class="research-grid not-prose">
	{#each RESEARCH_PAPERS as paper (paper.link)}
		<article>
			<h3><a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3>
			<time datetime={paper.date}>{formatDate(paper.date)}</time>
			<p>{paper.description}</p>
			<p class="authors">MAIA coauthors: {paper.authors.join(', ')}</p>
		</article>
	{/each}
</div>

<style>
	.research-grid {
		display: grid;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}
	article {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		background: var(--maia-nav-surface);
	}
	h3,
	h4 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
		font-weight: 650;
		line-height: 1.4;
	}
	p {
		margin: 0 0 1rem;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--maia-ink);
	}
	.authors {
		margin: auto 0 0;
		padding-top: 0.5rem;
		font-size: 0.8125rem;
	}
	time {
		margin-bottom: 1rem;
		font-size: 0.8125rem;
		color: var(--maia-ink);
	}
	a {
		color: var(--maia-accent);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	a:focus-visible {
		outline: 2px solid var(--maia-accent);
		outline-offset: 4px;
	}
	.section-label {
		margin: 2rem 0 1rem;
		font-size: 1.25rem;
	}
	.citation-count, .citation-note { font-size: 0.8125rem; }
	.citation-note { margin-top: 1rem; }
	.featured-grid {
		display: grid;
		gap: 1.5rem;
	}
	.featured-grid h4 {
		font-size: 1.25rem;
	}
	.featured-grid img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
		background: white;
		margin-bottom: 1rem;
	}
	@media (min-width: 900px) {
		.featured-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (min-width: 640px) {
		.research-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
