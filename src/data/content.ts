export const navigation = [
  { label: "Features", href: "/#benefits" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faqs" },
];

export const features = [
  { title: "Your process. Understood.", description: "Give your agent the playbook you already use. It follows your steps, your context, and your definition of done.", icon: "workflow" },
  { title: "You stay in control.", description: "Choose what runs automatically and what needs your approval. Review every action in one clear activity log.", icon: "control" },
  { title: "One less handoff.", description: "Keep work moving between your tools, from the first request to the final update.", icon: "connect" },
];

export const steps = [
  { title: "Start with what you know.", description: "Connect your workspace and bring the documents, instructions, and context your team relies on.", tags: ["Knowledge base", "Team playbooks", "Connected tools"], detail: "Workspace connected", icon: "connect" },
  { title: "Show it how you work.", description: "Describe a repeatable process. Set the boundaries, add an approval step, and test it with a real example.", tags: ["Natural language", "Approval rules", "Test runs"], detail: "Workflow ready for review", icon: "workflow" },
  { title: "Let the work flow.", description: "Put your agent to work. Follow each run, step in when needed, and refine your workflow as your team grows.", tags: ["Live activity", "Human oversight", "Run history"], detail: "Agent ready to deploy", icon: "control" },
];

export const faqs = [
  { question: "What can I automate with Vesper?", answer: "This template demonstrates an AI operations product: request triage, document review, and updates across connected tools. The interactive workflow is a local demo, so you can explore the experience without connecting an account." },
  { question: "Do I need to write code?", answer: "The product concept is built around plain-language instructions. To adapt this website, edit the typed content files, design tokens, and reusable Next.js components included in the source." },
  { question: "Can a person approve an agent’s work?", answer: "Yes. The demo includes a review checkpoint before the final action. In a live product, connect that interface to your own approval and authorization system." },
  { question: "Can I use this with my existing tools?", answer: "The interface is ready to adapt to your tools. Service integrations, authentication, billing, and an AI execution backend are not included in this frontend template." },
  { question: "What happens when I start the demo?", answer: "A sample request moves through a simulated workflow in your browser. No account is created, no payment is taken, and nothing is sent to an external service." },
];

export const plans = [
  { name: "Explore", price: "$0", description: "See what your first agent can do.", features: ["One example agent", "Interactive workflow preview", "No account required"], action: "Try the demo" },
  { name: "Team", price: "$49", description: "A starting point for growing operations.", features: ["Multiple agent workflows", "Approval checkpoints", "Shared activity history"], action: "Preview team workflow" },
];

export const demoStages = ["Receive request", "Read your playbook", "Review the response", "Complete workflow"];
