export const narrations = {
  scene1: "Welcome back. You know the basics — now let's go deeper into the infrastructure that powers the cloud.",
  scene2: "Cloud services come in three layers — IaaS, PaaS, and SaaS. Think of it like pizza: make it yourself, take-and-bake, or order delivery.",
  scene3: "IaaS gives you the raw building blocks — virtual machines, storage, and networking. You control everything from the OS up. Maximum power, maximum responsibility.",
  scene4: "PaaS removes the infrastructure headache. Just push your code, and the platform handles servers, scaling, and deployment. Focus on what you build, not how to run it.",
  scene5: "SaaS is software ready to use — no installation, no maintenance. Gmail, Slack, Notion — just open your browser and work.",
  scene6: "Choosing between IaaS, PaaS, and SaaS depends on how much control you need versus how much you want managed for you.",
  scene7: "Virtualization splits one physical server into many virtual machines. Containers take it further — lightweight, fast, and portable.",
  scene8: "Cloud storage comes in three flavors: Object storage for files, Block storage for databases, and File storage for shared drives.",
  scene9: "Auto-scaling adds or removes servers based on demand. Load balancers distribute traffic evenly. Together, they keep your app fast no matter how many users show up.",
  scene10: "Serverless means you write functions, not servers. The cloud runs your code only when needed and charges you only for the time it executes.",
  scene11: "Real-world apps combine all these layers. A streaming service uses IaaS for encoding, PaaS for APIs, SaaS for analytics, and serverless for notifications.",
  scene12: "You now understand the infrastructure behind the cloud. From virtual machines to serverless — the cloud gives you the power to build anything. Keep exploring.",
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
  containerStartup: "< 1 second",
  serverlessExecs: "1M+ free/month",
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

/* ── Session 2: Deep Dive Data ── */

export const iaasFeatures = [
  { name: "Virtual Machines", description: "Create and manage VMs with your choice of OS", icon: "vm", example: "AWS EC2, Azure VMs, GCP Compute Engine" },
  { name: "Networking", description: "Virtual networks, firewalls, load balancers, DNS", icon: "network", example: "AWS VPC, Azure VNet, GCP VPC" },
  { name: "Storage", description: "Block storage, object storage, backups", icon: "storage", example: "AWS EBS, Azure Disks, GCP Persistent Disk" },
  { name: "Security", description: "Identity management, encryption, access control", icon: "security", example: "AWS IAM, Azure AD, GCP IAM" },
];

export const paasFeatures = [
  { name: "Auto Deployment", description: "Push code, platform deploys automatically", icon: "deploy", example: "Heroku git push, Vercel deploy" },
  { name: "Managed Databases", description: "Database setup, backups, and scaling handled for you", icon: "database", example: "AWS RDS, Heroku Postgres, PlanetScale" },
  { name: "Built-in Scaling", description: "Platform scales your app based on traffic", icon: "scale", example: "Heroku dynos, App Engine instances" },
  { name: "Dev Tools", description: "Logging, monitoring, CI/CD pipelines included", icon: "tools", example: "Vercel Analytics, Heroku Metrics" },
];

export const saasExamples = [
  { name: "Gmail", category: "Communication", users: "1.8B+", icon: "mail", color: "#EA4335" },
  { name: "Slack", category: "Collaboration", users: "32M+", icon: "chat", color: "#4A154B" },
  { name: "Salesforce", category: "CRM", users: "150K+ orgs", icon: "crm", color: "#00A1E0" },
  { name: "Notion", category: "Productivity", users: "30M+", icon: "doc", color: "#FFFFFF" },
  { name: "Zoom", category: "Video", users: "300M+", icon: "video", color: "#2D8CFF" },
  { name: "Dropbox", category: "Storage", users: "700M+", icon: "folder", color: "#0061FF" },
];

export const comparisonCriteria = [
  { criteria: "Control Level", iaas: "Full control", paas: "App-level only", saas: "None" },
  { criteria: "Setup Time", iaas: "Hours to Days", paas: "Minutes", saas: "Seconds" },
  { criteria: "Expertise Needed", iaas: "High (sysadmin)", paas: "Medium (developer)", saas: "Low (end user)" },
  { criteria: "Cost Model", iaas: "Pay per resource", paas: "Pay per app", saas: "Pay per user" },
  { criteria: "Scalability", iaas: "Manual / scripted", paas: "Automatic", saas: "Built-in" },
  { criteria: "Best For", iaas: "Custom infra needs", paas: "App development", saas: "Business tools" },
];

export const vmVsContainer = {
  vm: {
    name: "Virtual Machine",
    startup: "Minutes",
    size: "GBs",
    isolation: "Full OS",
    density: "10-20 per host",
    analogy: "Separate apartments — each with own kitchen, bathroom, plumbing",
  },
  container: {
    name: "Container",
    startup: "Seconds",
    size: "MBs",
    isolation: "Process-level",
    density: "100s per host",
    analogy: "Rooms in a shared house — shared kitchen and plumbing, private rooms",
  },
};

export const storageTypes = [
  {
    name: "Object Storage",
    description: "Store any file — images, videos, backups. Access via URL.",
    analogy: "A warehouse with labeled boxes — store anything, find it by label",
    examples: "AWS S3, Azure Blob, GCP Cloud Storage",
    useCases: "Static websites, media files, backups, data lakes",
    color: "blue",
  },
  {
    name: "Block Storage",
    description: "Fast, low-latency storage attached to VMs. Like a hard drive.",
    analogy: "An SSD plugged into your computer — fast, direct access",
    examples: "AWS EBS, Azure Managed Disks, GCP Persistent Disk",
    useCases: "Databases, boot volumes, high-performance apps",
    color: "purple",
  },
  {
    name: "File Storage",
    description: "Shared file system accessible by multiple servers simultaneously.",
    analogy: "A shared network drive in an office — everyone can access the same files",
    examples: "AWS EFS, Azure Files, GCP Filestore",
    useCases: "Shared data, CMS, legacy apps, home directories",
    color: "green",
  },
];

export const autoScalingSteps = [
  { label: "Normal Load", servers: 2, users: 100, color: "#22C55E" },
  { label: "Traffic Spike", servers: 2, users: 500, color: "#F59E0B" },
  { label: "Auto-Scale Up", servers: 6, users: 500, color: "#3B82F6" },
  { label: "Traffic Drops", servers: 6, users: 100, color: "#F59E0B" },
  { label: "Scale Down", servers: 2, users: 100, color: "#22C55E" },
];

export const serverlessFeatures = [
  { name: "No Server Management", description: "Write code, not infrastructure. Zero servers to maintain.", icon: "noserver" },
  { name: "Pay Per Execution", description: "Charged only when your code runs — idle time is free.", icon: "pay" },
  { name: "Auto-Scale to Zero", description: "Scales from 0 to thousands of instances instantly.", icon: "scale" },
  { name: "Event-Driven", description: "Triggered by HTTP requests, file uploads, database changes, schedules.", icon: "event" },
];

export const serverlessProviders = [
  { name: "AWS Lambda", color: "#FF9900" },
  { name: "Azure Functions", color: "#0078D4" },
  { name: "GCP Cloud Functions", color: "#4285F4" },
  { name: "Cloudflare Workers", color: "#F6821F" },
  { name: "Vercel Functions", color: "#FFFFFF" },
];

export const realWorldLayers = [
  { service: "CDN", type: "SaaS", description: "Cloudflare serves static files globally", color: "#F6821F" },
  { service: "Frontend", type: "PaaS", description: "React app on Vercel with auto-scaling", color: "#FFFFFF" },
  { service: "API Server", type: "PaaS", description: "Node.js API on Heroku or Railway", color: "#A855F7" },
  { service: "Auth", type: "SaaS", description: "Authentication via Auth0 or Firebase", color: "#EB5424" },
  { service: "Database", type: "IaaS/PaaS", description: "PostgreSQL on AWS RDS or PlanetScale", color: "#3B82F6" },
  { service: "File Storage", type: "IaaS", description: "Media files stored in AWS S3 buckets", color: "#FF9900" },
  { service: "Notifications", type: "Serverless", description: "Push notifications via Lambda + SNS", color: "#22C55E" },
  { service: "Analytics", type: "SaaS", description: "Usage tracking with Mixpanel", color: "#8B5CF6" },
];
