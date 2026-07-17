export interface CompanyPreset {
  name: string;
  domain: string;
  industry: string;
  segment: string;
  employees: number;
}

export const COMPANIES: CompanyPreset[] = [
  { name: "Northwind Logistics", domain: "northwindlogistics.com", industry: "Logistics", segment: "Enterprise", employees: 8200 },
  { name: "Vertex Dynamics", domain: "vertexdynamics.io", industry: "Manufacturing", segment: "Enterprise", employees: 14500 },
  { name: "Cascade Financial Group", domain: "cascadefg.com", industry: "Financial Services", segment: "Enterprise", employees: 22100 },
  { name: "Brightline Health", domain: "brightlinehealth.com", industry: "Healthcare", segment: "Mid-Market", employees: 3400 },
  { name: "Solara Energy", domain: "solaraenergy.com", industry: "Energy", segment: "Enterprise", employees: 9800 },
  { name: "Meridian Retail Co.", domain: "meridianretail.com", industry: "Retail", segment: "Mid-Market", employees: 5200 },
  { name: "Ironclad Insurance", domain: "ironcladinsurance.com", industry: "Insurance", segment: "Enterprise", employees: 11200 },
  { name: "Pinecrest Systems", domain: "pinecrestsystems.com", industry: "Technology", segment: "Mid-Market", employees: 1800 },
  { name: "Harbor Point Bank", domain: "harborpointbank.com", industry: "Financial Services", segment: "Enterprise", employees: 17600 },
  { name: "Lumen Biotech", domain: "lumenbiotech.com", industry: "Life Sciences", segment: "Mid-Market", employees: 2600 },
  { name: "Trailhead Manufacturing", domain: "trailheadmfg.com", industry: "Manufacturing", segment: "Mid-Market", employees: 4100 },
  { name: "Zenith Aerospace", domain: "zenithaero.com", industry: "Aerospace", segment: "Enterprise", employees: 26400 },
  { name: "Coastal Telecom", domain: "coastaltelecom.com", industry: "Telecommunications", segment: "Enterprise", employees: 31200 },
  { name: "Ember Cloud Systems", domain: "embercloud.io", industry: "Technology", segment: "Growth", employees: 620 },
  { name: "Granite Peak Materials", domain: "granitepeakmat.com", industry: "Industrials", segment: "Mid-Market", employees: 3900 },
  { name: "Aster Consumer Goods", domain: "asterconsumer.com", industry: "Consumer Goods", segment: "Enterprise", employees: 19800 },
  { name: "Blue Harbor Shipping", domain: "blueharborshipping.com", industry: "Logistics", segment: "Mid-Market", employees: 2900 },
  { name: "Redwood Analytics", domain: "redwoodanalytics.io", industry: "Technology", segment: "Growth", employees: 410 },
  { name: "Summit Health Partners", domain: "summithealthpartners.com", industry: "Healthcare", segment: "Enterprise", employees: 15300 },
  { name: "Anchor Point Capital", domain: "anchorpointcapital.com", industry: "Financial Services", segment: "Mid-Market", employees: 1650 },
  { name: "Pioneer Foods Group", domain: "pioneerfoodsgroup.com", industry: "Consumer Goods", segment: "Mid-Market", employees: 6700 },
  { name: "Nimbus Data Corp", domain: "nimbusdata.io", industry: "Technology", segment: "Growth", employees: 780 },
  { name: "Cobalt Mining Co.", domain: "cobaltmining.com", industry: "Industrials", segment: "Enterprise", employees: 8900 },
  { name: "Wavelength Media", domain: "wavelengthmedia.com", industry: "Media", segment: "Mid-Market", employees: 2200 },
  { name: "Sterling Legal Group", domain: "sterlinglegal.com", industry: "Professional Services", segment: "Mid-Market", employees: 1450 },
  { name: "Beacon Freight Lines", domain: "beaconfreight.com", industry: "Logistics", segment: "Enterprise", employees: 12800 },
  { name: "Orbital Semiconductor", domain: "orbitalsemi.com", industry: "Technology", segment: "Enterprise", employees: 21300 },
  { name: "Willow Creek Foods", domain: "willowcreekfoods.com", industry: "Consumer Goods", segment: "Mid-Market", employees: 3300 },
  { name: "Keystone Utilities", domain: "keystoneutilities.com", industry: "Energy", segment: "Enterprise", employees: 10400 },
  { name: "Fathom Insurance Group", domain: "fathominsurance.com", industry: "Insurance", segment: "Mid-Market", employees: 2750 },
  { name: "Crestview Software", domain: "crestviewsoftware.com", industry: "Technology", segment: "Growth", employees: 540 },
  { name: "Highline Construction", domain: "highlineconstruction.com", industry: "Industrials", segment: "Mid-Market", employees: 4600 },
  { name: "Aurora Pharmaceuticals", domain: "aurorapharma.com", industry: "Life Sciences", segment: "Enterprise", employees: 18700 },
  { name: "Boreal Airlines", domain: "borealairlines.com", industry: "Aerospace", segment: "Enterprise", employees: 24100 },
  { name: "Marbella Hospitality", domain: "marbellahospitality.com", industry: "Hospitality", segment: "Mid-Market", employees: 5900 },
  { name: "Quarry Point Steel", domain: "quarrypointsteel.com", industry: "Industrials", segment: "Enterprise", employees: 9200 },
  { name: "Falcon Ridge Robotics", domain: "falconridge.io", industry: "Technology", segment: "Growth", employees: 330 },
  { name: "Union Square Retail", domain: "unionsquareretail.com", industry: "Retail", segment: "Enterprise", employees: 13600 },
  { name: "Tidewater Energy", domain: "tidewaterenergy.com", industry: "Energy", segment: "Mid-Market", employees: 3100 },
  { name: "Silverline Payments", domain: "silverlinepayments.com", industry: "Financial Services", segment: "Growth", employees: 890 },
];

export const OWNERS = [
  { name: "Amelia Chen", avatar: "" },
  { name: "Marcus Webb", avatar: "" },
  { name: "Priya Sharma", avatar: "" },
  { name: "Jordan Blake", avatar: "" },
  { name: "Sofia Marin", avatar: "" },
  { name: "Ethan Cole", avatar: "" },
  { name: "Nina Patel", avatar: "" },
  { name: "Diego Ruiz", avatar: "" },
];

export const REGIONS = ["North America", "EMEA", "APAC", "LATAM"];

export const PRODUCTS = [
  "Platform Core",
  "Analytics Suite",
  "Automation Add-on",
  "Enterprise Connect",
  "AI Copilot",
  "Data Cloud",
];
