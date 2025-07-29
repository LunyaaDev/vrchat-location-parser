import type { Instance } from './interfaces/Instance'

/**
 * Format the instance from the instance object.
 * @param instance instance object
 * @returns object with worldId and instanceId
 */
export const formatInstanceId = (instance: Instance) => {
  let instanceId = instance.name

  // hidden(usr_00000000-0000-0000-0000-000000000000)
  if (instance.type == 'friends+') {
    instanceId += `~hidden(${instance.userId})`
  }
  // friends(usr_00000000-0000-0000-0000-000000000000)
  else if (instance.type == 'friends') {
    instanceId += `~friends(${instance.userId})`
  }
  // private(usr_00000000-0000-0000-0000-000000000000)
  else if (instance.type == 'invite+') {
    instanceId += `~private(${instance.userId})~canRequestInvite`
  }

  // private(usr_00000000-0000-0000-0000-000000000000)~canRequestInvite
  else if (instance.type == 'invite') {
    instanceId += `~private(${instance.userId})`
  }
  // group(grp_00000000-0000-0000-0000-000000000000)
  else if (
    instance.type == 'group' ||
    instance.type == 'groupPublic' ||
    instance.type == 'group+'
  ) {
    instanceId += `~group(${instance.groupId})`

    if (instance.type == 'groupPublic') {
      instanceId += '~groupAccessType(public)'
    } else if (instance.type == 'group+') {
      instanceId += '~groupAccessType(plus)'
    } else {
      instanceId += '~groupAccessType(members)'
    }

    if (instance.require18yo) {
      instanceId += '~ageGate'
    }
  }

  if (instance.region) {
    instanceId += `~region(${instance.region})`
  }

  if (instance.nonce) {
    instanceId += `~nonce(${instance.nonce})`
  }

  return instanceId
}
