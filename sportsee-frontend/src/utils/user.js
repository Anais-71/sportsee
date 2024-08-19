/**
 * Class representing a User.
 */
export class User {
  /**
   * Create a User.
   * @param {Object} getUserData - The user data.
   * @param {Object} getUserData.data - The data object containing user information.
   * @param {number} [getUserData.data.userId=null] - The user's ID.
   * @param {Object} getUserData.data.userInfos - The user's information.
   * @param {string} [getUserData.data.userInfos.firstName=''] - The user's first name.
   * @param {string} [getUserData.data.userInfos.lastName=''] - The user's last name.
   * @param {string} [getUserData.data.userInfos.email=''] - The user's email.
   */
  constructor(getUserData) {
    /**
     * @type {number|null}
     */
    this.id = getUserData?.data?.userId || null

    /**
     * @type {string}
     */
    this.firstName = getUserData?.data?.userInfos?.firstName || ''

    /**
     * @type {string}
     */
    this.lastName = getUserData?.data?.userInfos?.lastName || ''

    /**
     * @type {string}
     */
    this.email = getUserData?.data?.userInfos?.email || ''
  }
}

export default User
