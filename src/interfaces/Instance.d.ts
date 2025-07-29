interface InstanceBase {
  worldId: string
  name: string
  region?: 'eu' | 'jp' | 'us' | 'use'
  /**
   * @deprecated Removed from VRChat instances
   */
  nonce?: string
}

interface InstancePublic extends InstanceBase {
  type: 'public'
}

interface InstanceUser extends InstanceBase {
  type: 'friends+' | 'friends' | 'invite+' | 'invite'
  userId: string
}

interface InstanceGroup extends InstanceBase {
  type: 'groupPublic' | 'group+' | 'group'
  groupId: string
  require18yo: boolean
}

export type Instance = InstancePublic | InstanceUser | InstanceGroup
