import { formatInstanceId } from './formatInstanceId'
import type { Instance } from './interfaces/Instance'

/**
 * Format the location string from the instance object.
 * @param instance instance object
 * @returns location string
 */
export const formatLocation = (instance: Instance) => {
  return `${instance.worldId}:${formatInstanceId(instance)}`
}
