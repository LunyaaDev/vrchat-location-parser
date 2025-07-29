interface InstanceBase {
  /**
   * World ID of the instance.
   */
  worldId: string
  /**
   * Name of the instance.
   *
   * Usually a 5 digit number, can also be a custom name.
   *
   * Max length is 41 characters.
   *
   * Allowed characters are:
   * - a-z
   * - A-Z
   * - 0-9
   * - _ (underscore)
   * - \- (dash)
   */
  name: string
  /**
   * Region of the instance.
   *
   * | Region | Hosted in | Token |
   * | --- | --- | --- |
   * | USA, West | San José | us |
   * | USA, East | Washington D.C. | 	use |
   * | Europe | Amsterdam | eu |
   * | Japan | Tokyo | jp |
   *
   */
  region?: 'eu' | 'jp' | 'us' | 'use'
  /**
   * @deprecated Removed from VRChat instances
   */
  nonce?: string
}

interface InstancePublic extends InstanceBase {
  /**
   * Type of the instance.
   */
  type: 'public'
}

interface InstanceUser extends InstanceBase {
  /**
   * Type of the instance.
   */
  type: 'friends+' | 'friends' | 'invite+' | 'invite'
  /**
   * User ID of the user who created the instance.
   *
   * @example usr_00000000-0000-0000-0000-000000000000
   */
  userId: string
}

interface InstanceGroup extends InstanceBase {
  /**
   * Type of the instance.
   */
  type: 'groupPublic' | 'group+' | 'group'
  /**
   * Group ID of the group who created the instance.
   *
   * @example grp_00000000-0000-0000-0000-000000000000
   */
  groupId: string
  /**
   * Wether the group requires users to be 18 years or older to join.
   */
  require18yo: boolean
}

export type Instance = InstancePublic | InstanceUser | InstanceGroup
