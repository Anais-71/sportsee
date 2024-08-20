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

    /**
     * @type {number}
     */
    this.calorieCount = getUserData?.data?.keyData?.calorieCount || 0

    /**
     * @type {number}
     */
    this.proteinCount = getUserData?.data?.keyData?.proteinCount || 0

    /**
     * @type {number}
     */
    this.carbohydrateCount = getUserData?.data?.keyData?.carbohydrateCount || 0

    /**
     * @type {number}
     */
    this.lipidCount = getUserData?.data?.keyData?.lipidCount || 0
  }
}

export default User
