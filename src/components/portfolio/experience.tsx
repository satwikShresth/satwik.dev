const experiences = [
	{
		company: "Sharing Excess",
		location: "Philadelphia, PA",
		position: "Software Engineer",
		team: "Logistics & redistribution technology",
		period: "2024 - Present",
		responsibilities: [
			"Developed a logistics PWA with React and TypeScript to streamline food distribution operations and field data collection",
			"Owned core infrastructure decisions; onboarded new contributors with documentation standards and code review practices",
			"Modernized a legacy JavaScript codebase to TypeScript, reducing bugs and improving responsiveness by 30%",
			"Migrated the backend from Express to oRPC with type-safe API contracts, eliminating runtime model errors, strengthening authentication, and reducing API latency",
			"Implemented Playwright end-to-end tests in CI/CD, improving reliability and reducing production bugs",
			"Architected the database schema for donation and redistribution workflows, optimizing queries to improve performance by 20%",
		],
		technologies: [
			"React",
			"TypeScript",
			"PWA",
			"oRPC",
			"Playwright",
			"CI/CD",
			"Express",
		],
	},
	{
		company: "Susquehanna International Group",
		location: "Bala Cynwyd, PA",
		position: "Software Engineer Co-op",
		team: "Team Order Routing and Quoting (TORQ)",
		period: "September 2023 - March 2024",
		responsibilities: [
			"Developed a C++ protocol metrics publisher to tail multiple log files to generate data frames for 5.8 billion+ messages/day",
			"Built a Python orchestration layer with C++ bindings to aggregate metric data-frames and stream real-time data on Grafana",
			"Created a Python FastAPI proxy server to integrate OpenTelemetry alerts with an internal messaging platform via RESTful API",
			"Developed a concurrent Python Kafka consumer to process 500+ million messages in 5 minutes, increasing speed by 9x",
		],
		technologies: [
			"C++",
			"Python",
			"Kafka",
			"FastAPI",
			"Kubernetes",
			"GitLab CI/CD",
			"Grafana",
			"RESTful API",
		],
	},
	{
		company: "OPEX Corporation",
		location: "Moorestown, NJ",
		position: "Software Engineer Co-op",
		team: "Warehouse Automation and Robotics",
		period: "September 2022 - March 2023",
		responsibilities: [
			"Implemented asynchronous windows inter-process communication, connecting multiple C++ applications with proprietary protocol, reducing alert latency by 60%",
			"Developed a Python tool using Doxygen to integrate 15,000+ dynamic Windows Help files into a C++ MFC application",
			"Wrote comprehensive unit and integration tests for robot's host application, increasing test coverage and operational reliability",
		],
		technologies: ["C++", "Python", "Windows IPC", "Doxygen", "Robotics"],
	},
	{
		company: "Drexel University",
		location: "Philadelphia, PA",
		position: "Teaching Assistant",
		team: "College of Computing & Informatics",
		period: "September 2022 - March 2025",
		responsibilities: [
			"Mentored over 150 students during weekly labs and tutoring hours, helping them grasp complex concepts",
			"Developed grading tool with Python and JavaScript to automate assignment compilation, reducing grading time by 80%",
		],
		technologies: ["Python", "JavaScript", "Mentoring", "Plugin Architecture"],
	},
];

export function Experience({ id = "experience" }: { id?: string }) {
	return (
		<section
			id={id}
			data-project-section={id}
			className="mb-20 scroll-mt-32 border-b border-border/20 pb-20"
		>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
				<div className="lg:col-span-4">
					<div className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">
						Experience
					</div>
					<h2
						className="mb-6 text-3xl font-semibold text-foreground lg:text-4xl"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						Work & Leadership
					</h2>
				</div>

				<div className="space-y-8 lg:col-span-8">
					{experiences.map((experience) => (
						<div
							key={experience.company + experience.period}
							className="space-y-3"
						>
							<div>
								<h3 className="mb-1 text-xl font-semibold text-foreground">
									{experience.position}
								</h3>
								<p className="text-base font-medium text-foreground/90">
									{experience.company}
								</p>
								<p className="text-sm text-foreground/70">
									{experience.location} • {experience.period}
								</p>
								{experience.team ? (
									<p className="text-sm text-foreground/60 italic">
										{experience.team}
									</p>
								) : null}
							</div>
							<ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
								{experience.responsibilities.map((r) => (
									<li key={r}>{r}</li>
								))}
							</ul>
							{experience.technologies.length > 0 ? (
								<div className="flex flex-wrap gap-2 pt-2">
									{experience.technologies.map((tech) => (
										<span
											key={tech}
											className="rounded-full border border-border/50 bg-accent/30 px-3 py-1 text-xs text-foreground"
										>
											{tech}
										</span>
									))}
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
