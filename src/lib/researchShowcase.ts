import { PAPERS } from './papers';
import { RESEARCH_UPDATES } from './researchUpdates';

// Curated from Gabriel's research shortlist, reviewed September 2026.
// Keep contribution and alumni eligibility review in the draft PR before publication.
export type ResearchPaper = {
	title: string;
	authors: readonly string[];
	description: string;
	link: string;
	date: string;
};

const existingSummaries: Record<string, string> = {
	'2211.00241':
		'A learned adversary beat superhuman KataGo more than 97% of the time; the exploit transferred and could be reproduced by human experts.',
	'2412.14093':
		'Claude 3 Opus selectively complied during training; harmful-query compliance reached 14% in the training-signalled condition and explicit alignment-faking reasoning rose after RL.',
	'forum?id=pOq9vDIYev':
		'Soft Preference Learning improved difficult repeated-sampling accuracy, output diversity, viewpoint representation, and calibration relative to standard temperature scaling.',
	'2307.15217':
		'A field-level taxonomy of RLHF failure modes, complementary methods, and auditing standards.',
	'2502.05209':
		'Eleven attacks exposed hidden capabilities; attack success predicted held-out elicitation, and a leading unlearning method was reversed in 16 fine-tuning steps.',
	'2110.03605':
		'Built targeted, universal, disguised, physically realizable, and black-box feature-level attacks and used them to predict natural copy-paste failures.',
	'forum?id=ZpSZ7pNoCs':
		'Replacing cross-entropy with harmonic loss improved interpretability, data efficiency, and convergence across algorithmic, vision, and language tasks.',
	'2302.10894':
		'Introduces a 12-trojan benchmark for whether interpretability tools help humans find unknown model bugs; evaluates 16 attribution tools and seven feature-synthesis methods.'
};

const additionalPapers: Omit<ResearchPaper, 'date'>[] = [
	{
		title: 'Scaling Laws for Reward Model Overoptimization',
		authors: ['Leo Gao'],
		description:
			'Measured Goodhart-style overoptimization in RLHF proxies and found smooth scaling relationships across model, data, and optimization choices.',
		link: 'https://arxiv.org/abs/2210.10760'
	},
	{
		title: 'Scaling Laws For Scalable Oversight',
		authors: ['Josh Engels', 'David D. Baek'],
		description:
			'Built and validated a quantitative oversight-scaling model across Nim, Mafia, Debate, Backdoor Code, and Wargames.',
		link: 'https://arxiv.org/abs/2504.18530'
	},
	{
		title: 'Natural Emergent Misalignment from Reward Hacking in Production RL',
		authors: ['Benjamin Wright'],
		description:
			'Reward hacking learned in production coding environments generalized to alignment faking, malicious cooperation, and attempted safety-research sabotage.',
		link: 'https://arxiv.org/abs/2511.18397'
	},
	{
		title: 'DecodingTrust: A Comprehensive Assessment of Trustworthiness in GPT Models',
		authors: ['Chenhui Zhang'],
		description:
			'Evaluated GPT-3.5 and GPT-4 across toxicity, bias, robustness, privacy, ethics, and fairness, uncovering jailbreak and data-leakage vulnerabilities.',
		link: 'https://arxiv.org/abs/2306.11698'
	},
	{
		title: 'Distillation Robustifies Unlearning',
		authors: ['Leni Shor'],
		description:
			'Shows distillation can remove latent capabilities left behind by ordinary unlearning; UNDO matched retraining-level robustness with 60–80% of the compute and 0.01% labelled pretraining data, including on WMDP.',
		link: 'https://arxiv.org/abs/2506.06278'
	},
	{
		title:
			'Sparse Feature Circuits: Discovering and Editing Interpretable Causal Graphs in Language Models',
		authors: ['Eric J. Michaud'],
		description:
			'Introduced causally implicated, human-interpretable feature circuits; used them to improve classifier generalization and automate circuit discovery at scale.',
		link: 'https://arxiv.org/abs/2403.19647'
	},
	{
		title: 'Not All Language Model Features Are One-Dimensionally Linear',
		authors: ['Josh Engels', 'Eric J. Michaud', 'Isaac Liao'],
		description:
			'Found irreducible circular features for concepts such as weekdays and months and causally linked them to modular computations in multiple LLMs.',
		link: 'https://arxiv.org/abs/2405.14860'
	},
	{
		title: 'A Mechanistic Understanding of Alignment Algorithms: A Case Study on DPO and Toxicity',
		authors: ['Itamar Pres'],
		description:
			'Found that DPO suppressed toxic outputs by bypassing rather than removing capabilities, then used the mechanism to reverse the alignment behavior.',
		link: 'https://arxiv.org/abs/2401.01967'
	},
	{
		title: 'CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring',
		authors: ['Timothy Kostolansky'],
		description:
			'Compared CoT and action-only monitoring in adversarial coding tasks and tested when harmful side goals remain visible to a trusted monitor.',
		link: 'https://arxiv.org/abs/2505.23575'
	},
	{
		title: 'Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation',
		authors: ['Leo Gao'],
		description:
			"A weaker monitor detected reward hacking from a stronger model's chain of thought, while optimizing against the monitor encouraged hidden intent rather than eliminating most misbehavior.",
		link: 'https://arxiv.org/abs/2503.11926'
	},
	{
		title: 'International AI Safety Report',
		authors: ['Tamay Besiroglu', 'Stephen Casper'],
		description:
			'Synthesizes the evidence on general-purpose AI capabilities, systemic risks, evaluations, and safeguards for an international policy audience.',
		link: 'https://arxiv.org/abs/2501.17805'
	},
	{
		title: 'Me, Myself, and AI: The Situational Awareness Dataset (SAD) for LLMs',
		authors: ['Kaivu Hariharan'],
		description:
			'Introduced a broad benchmark for whether LLMs know what they are and the circumstances in which they operate, including evaluation-versus-deployment distinctions.',
		link: 'https://arxiv.org/abs/2407.04694'
	},
	{
		title: 'Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision',
		authors: ['Leo Gao'],
		description:
			'Strong models exceeded weak supervisors, and an auxiliary confidence loss recovered nearly 80% of the GPT-2-to-GPT-4 performance gap on NLP tasks.',
		link: 'https://arxiv.org/abs/2312.09390'
	},
	{
		title: 'On the creation of narrow AI: hierarchy and nonlocality of neural network skills',
		authors: ['Eric J. Michaud', 'Asher Parker-Sartori'],
		description:
			'Finds that broad curricula may be required to learn narrow skills and that skills are not perfectly localisable, while pruning-based transfer can still outperform distillation.',
		link: 'https://arxiv.org/abs/2505.15811'
	},
	{
		title: 'Unlearning-based Neural Interpretations',
		authors: ['Ching Lam Choi'],
		description:
			'Introduces an adaptive unlearning-based attribution baseline that removes salient features, smooths local decision boundaries, and produces more faithful and robust interpretations than static baselines.',
		link: 'https://arxiv.org/abs/2410.08069'
	},
	{
		title: 'Weight-sparse transformers have interpretable circuits',
		authors: ['Leo Gao', 'Achyuta Rajaram'],
		description:
			'Weight sparsity produced compact, human-readable circuits; scaling improved the capability–interpretability frontier but exposed a remaining scale limit.',
		link: 'https://arxiv.org/abs/2511.13653'
	},
	{
		title: 'Locating and Editing Factual Associations in GPT',
		authors: ['Kevin Meng'],
		description:
			'Localises factual recall to mid-layer feed-forward computations and introduces ROME, which edits specific facts while preserving specificity and generalisation.',
		link: 'https://arxiv.org/abs/2202.05262'
	},
	{
		title: 'Black-Box Access is Insufficient for Rigorous AI Audits',
		authors: ['Stephen Casper', 'Marvin von Hagen', 'Misha Gerovitch', 'Wendy Sun'],
		description:
			'Argues from concrete audit failure modes that query-only access cannot support rigorous external audits and specifies stronger access requirements.',
		link: 'https://arxiv.org/abs/2401.14446'
	},
	{
		title: 'Efficient Dictionary Learning with Switch Sparse Autoencoders',
		authors: ['Josh Engels', 'Eric J. Michaud'],
		description:
			'Switch SAEs routed activations across expert autoencoders and delivered a substantial reconstruction-versus-sparsity Pareto improvement at fixed compute.',
		link: 'https://arxiv.org/abs/2410.08201'
	},
	{
		title: 'MLE-bench: Evaluating Machine Learning Agents on Machine Learning Engineering',
		authors: ['Neil Chowdhury'],
		description:
			'Turned 75 Kaggle competitions into an agent benchmark; the best evaluated setup reached bronze-medal performance on 16.9% of competitions.',
		link: 'https://arxiv.org/abs/2410.07095'
	}
];

const otherSummaries: Record<string, string> = {
	'2303.13506':
		'Models neural scaling as the acquisition of discrete skills and tests the resulting predictions.',
	'2312.08793':
		'Tests how language models respond when instructions to withhold information conflict with other objectives.',
	'2306.09442':
		'Studies how red-team attacks can be developed against language models without an existing attack dataset.',
	'2405.12999': 'Evaluates whether one language model can detect deception by another.',
	XmvgWEjkhG:
		'Tests whether modifying a model can expose capabilities missed by ordinary evaluations.',
	pOq9vDIYev:
		'Studies preference learning methods that preserve diversity rather than optimizing for a single preferred response.',
	'2502.01628': 'Studies an alternative training loss designed to improve model interpretability.'
};

// Dates from arXiv v1 metadata or the publisher's original release.
// OpenReview-only entries use verified proceedings years; sort these after dated entries
// in that year without implying an exact release day.
const publicationDates: Record<string, string> = {
	'https://arxiv.org/abs/2110.03605': '2021-10-07',
	'https://arxiv.org/pdf/2211.00241.pdf': '2022-11-01',
	'https://arxiv.org/abs/2303.13506': '2023-03-23',
	'https://openai.com/research/building-an-early-warning-system-for-llm-aided-biological-threat-creation':
		'2024-01-31',
	'https://arxiv.org/abs/2307.15217': '2023-07-27',
	'https://openreview.net/forum?id=XmvgWEjkhG': '2024',
	'https://openreview.net/forum?id=pOq9vDIYev': '2025',
	'https://arxiv.org/pdf/2312.08793.pdf': '2023-12-14',
	'https://arxiv.org/pdf/2405.12999': '2024-05-10',
	'https://arxiv.org/pdf/2302.10894.pdf': '2023-02-08',
	'https://arxiv.org/abs/2306.09442': '2023-06-15',
	'https://arxiv.org/pdf/2502.01628': '2025-02-03',
	'https://arxiv.org/abs/2412.14093': '2024-12-18',
	'https://arxiv.org/abs/2210.10760': '2022-10-19',
	'https://arxiv.org/abs/2511.18397': '2025-11-23',
	'https://arxiv.org/abs/2504.18530': '2025-04-25',
	'https://arxiv.org/abs/2306.11698': '2023-06-20',
	'https://arxiv.org/abs/2506.06278': '2025-06-06',
	'https://arxiv.org/abs/2403.19647': '2024-03-28',
	'https://arxiv.org/abs/2401.01967': '2024-01-03',
	'https://arxiv.org/abs/2405.14860': '2024-05-23',
	'https://arxiv.org/abs/2505.23575': '2025-05-29',
	'https://arxiv.org/abs/2503.11926': '2025-03-14',
	'https://arxiv.org/abs/2407.04694': '2024-07-05',
	'https://arxiv.org/abs/2312.09390': '2023-12-14',
	'https://arxiv.org/abs/2501.17805': '2025-01-29',
	'https://arxiv.org/abs/2410.08069': '2024-10-10',
	'https://arxiv.org/abs/2511.13653': '2025-11-17',
	'https://arxiv.org/abs/2505.15811': '2025-05-21',
	'https://arxiv.org/abs/2202.05262': '2022-02-10',
	'https://arxiv.org/abs/2401.14446': '2024-01-25',
	'https://arxiv.org/abs/2410.08201': '2024-10-10',
	'https://arxiv.org/abs/2410.07095': '2024-10-09'
};

const previousPapers: ResearchPaper[] = [
	...PAPERS.map((paper) => {
		const url = new URL(paper.link);
		const id =
			url.searchParams.get('id') ??
			url.pathname
				.split('/')
				.pop()!
				.replace(/\.pdf$/, '');
		return {
			title: paper.title,
			authors: paper.authors.map((name) =>
				name === 'Riya Yagi' ? 'Riya Tyagi' : name === 'Neil Choudhury' ? 'Neil Chowdhury' : name
			),
			description:
				existingSummaries[id] ??
				otherSummaries[id] ??
				'Evaluates how language-model assistance affects the ability to carry out biological-threat tasks.',
			link: paper.link
		};
	}),
	...additionalPapers
]
	.map((paper) => {
		const date = publicationDates[paper.link];
		if (!date) throw new Error(`Missing research publication date: ${paper.title}`);
		return { ...paper, date };
	})
	.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export const RESEARCH_PAPERS = [...previousPapers, ...RESEARCH_UPDATES]
	.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
