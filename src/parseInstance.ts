import type { Instance } from './interfaces/Instance'

/**
 * Parses the instance
 * @param worldId id of the world
 * @param instanceId instance string
 * @returns obj with parsed instance
 */
export const parseInstance = (worldId: string, instanceId: string) => {
  // parse instance string
  const instanceIdParts: { [key: string]: string | null } = Object.fromEntries(
    instanceId.split('~').map((x) => {
      const regexRes = x.match(/^(?<key>[^\(]+)(\((?<value>[^\)]+)\))?$/)
      if (!regexRes?.groups?.key) {
        return []
      }
      return [regexRes.groups.key, regexRes.groups.value || null]
    }),
  )

  const instanceName = Object.keys(instanceIdParts).shift()
  if (!instanceName) {
    return null
  }

  // if nothing is set its public
  let instance: Instance = {
    worldId: worldId,
    name: instanceName,
    type: 'public',
  }

  if (instanceIdParts.region) {
    instance.region = <Instance['region']>instanceIdParts.region
  }

  if (instanceIdParts.nonce) {
    instance.nonce = instanceIdParts.nonce
  }

  // hidden(usr_00000000-0000-0000-0000-000000000000)
  if (instanceIdParts.hidden) {
    instance = {
      ...instance,
      type: 'friends+',
      userId: instanceIdParts.hidden,
    }
  }
  // friends(usr_00000000-0000-0000-0000-000000000000)
  else if (instanceIdParts.friends) {
    instance = {
      ...instance,
      type: 'friends',
      userId: instanceIdParts.friends,
    }
  }
  // private(usr_00000000-0000-0000-0000-000000000000)
  // private(usr_00000000-0000-0000-0000-000000000000)~canRequestInvite
  else if (instanceIdParts.private) {
    instance = {
      ...instance,
      type: instanceIdParts.canRequestInvite ? 'invite+' : 'invite',
      userId: instanceIdParts.private,
    }
  }
  // group(grp_00000000-0000-0000-0000-000000000000)
  else if (instanceIdParts.group) {
    instance = {
      ...instance,
      type:
        instanceIdParts.groupAccessType == 'public'
          ? 'groupPublic'
          : instanceIdParts.groupAccessType == 'plus'
          ? 'group+'
          : 'group',
      groupId: instanceIdParts.group,
      require18yo: 'ageGate' in instanceIdParts,
    }
  }

  return instance
}
