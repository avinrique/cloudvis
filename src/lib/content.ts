export const narrations = {
  scene1: "What if you could access unlimited computing power — without owning a single server? Welcome to Cloud Computing.",
  scene2: "Cloud computing is the on-demand delivery of computing resources over the internet, with pay-as-you-go pricing. Think of it like electricity: you plug in and use what you need, without building your own power plant.",
  scene3: "Computing has evolved through four major eras — from mainframes to PCs, client-server to cloud. In 2006, Amazon launched AWS, and computing shifted from a capital expense to an operational one.",
  scene4: "Traditional computing means owning everything. Cloud computing means renting what you need, scaling in minutes, and paying only for what you use.",
  scene5: "Cloud architecture has distinct layers — from physical infrastructure at the bottom to your browser at the top, with virtualization and management in between.",
  scene6: "NIST defines five essential characteristics: On-Demand Self-Service, Broad Network Access, Resource Pooling, Rapid Elasticity, and Measured Service.",
  scene7: "Clouds come in four flavors: Public, Private, Hybrid, and Community. Over 80% of enterprises now use a hybrid or multi-cloud strategy.",
  scene8: "Cloud services come in three layers: IaaS gives you raw building blocks, PaaS gives you a ready platform, and SaaS gives you everything — just log in and use it.",
  scene9: "Cloud brings powerful advantages — cost savings, scalability, global access. But also real limitations — internet dependency, vendor lock-in, security concerns. The key is understanding both sides.",
  scene10: "The cloud landscape is led by three giants: AWS at 31%, Azure at 25%, and Google Cloud at 11%. Platforms like Vercel make deployment as simple as a single Git push.",
  scene11: "From code to cloud in seconds. Write your code, push to Git, and watch the deployment pipeline do the rest.",
  scene12: "Cloud Computing is not just technology — it is a paradigm shift. $600 billion and growing. Start Building.",
};

export const stats = {
  marketSize: "$600B+",
  enterpriseAdoption: "94%",
  costSavings: "30-50%",
  hybridAdoption: "80%+",
  awsShare: "31%",
  azureShare: "25%",
  gcpShare: "11%",
  vmPerServer: "10-20+",
  autoScaleTime: "30-60 seconds",
  deployTime: "minutes",
  traditionalDeploy: "12-18 months",
};

export const evolutionEras = [
  { era: "Mainframe Era", period: "1960s", description: "One giant machine, many users sharing via terminals", icon: "mainframe" },
  { era: "PC Revolution", period: "1980s", description: "One machine per person — data silos everywhere", icon: "pc" },
  { era: "Client-Server", period: "1990s", description: "Connected networks, but expensive infrastructure", icon: "server" },
  { era: "Cloud Era", period: "2006+", description: "Amazon launched AWS — computing on demand", icon: "cloud" },
];

export const nistCharacteristics = [
  { name: "On-Demand Self-Service", description: "Provision resources instantly, like a vending machine", icon: "vending" },
  { name: "Broad Network Access", description: "Access from any device, anywhere with internet", icon: "network" },
  { name: "Resource Pooling", description: "Shared infrastructure serving many users efficiently", icon: "pool" },
  { name: "Rapid Elasticity", description: "Scale up and down like a rubber band with demand", icon: "elastic" },
  { name: "Measured Service", description: "Pay only for what you consume, metered like electricity", icon: "meter" },
];

export const deploymentModels = [
  { name: "Public Cloud", description: "Shared, affordable, run by providers like AWS", analogy: "Public bus", color: "blue", examples: "AWS, Azure, GCP" },
  { name: "Private Cloud", description: "Full control, higher cost, used by banks & governments", analogy: "Own car", color: "purple", examples: "VMware, OpenStack" },
  { name: "Hybrid Cloud", description: "Best of both — most popular enterprise model", analogy: "Car + Bus", color: "amber", examples: "80% of enterprises" },
  { name: "Community Cloud", description: "Shared by organizations with common needs", analogy: "Carpool", color: "cyan", examples: "Government, Healthcare" },
];

export const serviceModels = [
  {
    name: "IaaS",
    fullName: "Infrastructure as a Service",
    description: "Raw building blocks — VMs, storage, networking",
    analogy: "Rent empty plot with utilities",
    pizza: "Buy ingredients, cook yourself",
    examples: "AWS EC2, Azure VMs, GCP Compute",
    userManages: ["Applications", "Data", "Runtime", "Middleware", "OS"],
    providerManages: ["Virtualization", "Servers", "Storage", "Networking"],
  },
  {
    name: "PaaS",
    fullName: "Platform as a Service",
    description: "Platform ready — just bring your code",
    analogy: "Furnished office",
    pizza: "Buy pre-made, bake at home",
    examples: "Heroku, Vercel, Google App Engine",
    userManages: ["Applications", "Data"],
    providerManages: ["Runtime", "Middleware", "OS", "Virtualization", "Servers", "Storage", "Networking"],
  },
  {
    name: "SaaS",
    fullName: "Software as a Service",
    description: "Everything done for you — just log in",
    analogy: "Order delivery",
    pizza: "Order delivery pizza",
    examples: "Gmail, Slack, Salesforce",
    userManages: [],
    providerManages: ["Applications", "Data", "Runtime", "Middleware", "OS", "Virtualization", "Servers", "Storage", "Networking"],
  },
];

export const advantages = [
  "Cost Efficiency",
  "Scalability",
  "Accessibility",
  "Disaster Recovery",
  "Speed & Agility",
  "Auto-Updates",
  "Environmental Sustainability",
];

export const limitations = [
  "Internet Dependency",
  "Security & Privacy",
  "Vendor Lock-In",
  "Limited Control",
  "Compliance & Legal",
  "Hidden Costs",
];

export const cloudPlatforms = [
  { name: "AWS", share: 31, color: "#FF9900", description: "The pioneer — 200+ services, largest market share" },
  { name: "Azure", share: 25, color: "#0078D4", description: "Enterprise favorite — deep Microsoft integration" },
  { name: "GCP", share: 11, color: "#4285F4", description: "Data & AI powerhouse — built on Google infrastructure" },
  { name: "Others", share: 33, color: "#6B7394", description: "Alibaba, IBM, DigitalOcean, Oracle, and more" },
];

export const architectureLayers = [
  { name: "Physical Infrastructure", description: "Servers, storage, networking hardware", color: "blue" },
  { name: "Virtualization", description: "Hypervisors split one machine into many VMs", color: "purple" },
  { name: "Management Layer", description: "Scaling, security, billing, orchestration", color: "amber" },
  { name: "Network", description: "Internet connecting front-end to back-end", color: "cyan" },
  { name: "Front-End", description: "Your browser, app, or device", color: "green" },
];
