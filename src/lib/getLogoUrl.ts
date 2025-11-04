const billLogos: Record<string, string> = {
    deepseek: '/bills-logos/deepseek-logo.svg',
    electricity: '/bills-logos/electricity-logo.svg',
    figma: '/bills-logos/figma-logo.svg',
    linkedin: '/bills-logos/linkedin-logo.svg',
    notion: '/bills-logos/notion-logo.svg',
    photoshop: '/bills-logos/photoshop-logo.svg',
    spotify: '/bills-logos/spotify-logo.svg',
    youtube: '/bills-logos/youtube-logo.svg',
}

export function getLogoUrl(serviceName: string): string | null {
  const lowerName = serviceName.toLowerCase()

  // This will check for exact match first
  if (billLogos[lowerName]) return billLogos[lowerName]

  // Then check for partial matches
  for (const key in billLogos) {
    if (lowerName.includes(key)) {
      return billLogos[key]
    }
  }

  return null
}
