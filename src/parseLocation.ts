import { parseInstance } from './parseInstance'

/**
 * Parses the location
 * @param location location string
 * @returns obj with parsed location
 */
export const parseLocation = (location: string) => {
  if (['offline', 'traveling', 'private', ''].includes(location)) return null

  const [worldId, instanceId] = location.split(':')
  return parseInstance(worldId, instanceId)
}
