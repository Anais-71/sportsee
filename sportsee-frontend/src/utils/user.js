/**
 * Class representing a User.
 */
export class User {
  /**
   * Create a User.
   * @param {Object} getUserData - The user data.
   * @param {number} [getUserData.data.id=null] - The user's ID.
   * @param {Object} getUserData.data.userInfos - The user's information.
   * @param {string} [getUserData.data.userInfos.firstName=''] - The user's first name.
   * @param {string} [getUserData.data.userInfos.lastName=''] - The user's last name.
   * @param {number} [getUserData.data.userInfos.age=null] - The user's age.
   * @param {number} [getUserData.data.score=0] - The user's score.
   * @param {Object} getUserData.data.keyData - The user's key nutritional data.
   * @param {number} [getUserData.data.keyData.calorieCount=0] - The user's calorie count.
   * @param {number} [getUserData.data.keyData.proteinCount=0] - The user's protein count.
   * @param {number} [getUserData.data.keyData.carbohydrateCount=0] - The user's carbohydrate count.
   * @param {number} [getUserData.data.keyData.lipidCount=0] - The user's lipid count.
   */
  constructor(getUserData) {
    /**
     * @type {number|null}
     */
    this.id = getUserData?.data?.id || null

    /**
     * @type {string}
     */
    this.firstName = getUserData?.data?.userInfos?.firstName || ''

    /**
     * @type {string}
     */
    this.lastName = getUserData?.data?.userInfos?.lastName || ''

    /**
     * @type {number|null}
     */
    this.age = getUserData?.data?.userInfos?.age || null

    /**
     * @type {number}
     */
    this.score = getUserData?.data?.score || 0

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
