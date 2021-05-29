class Role {
  _roles = {}
  _permissions = {}
}

/**
 * Role config binary
 */
Role.View = 1
Role.ViewOwner = 2
Role.Create = 4
Role.Update = 8
Role.UpdateOwner = 16
Role.Delete = 32
Role.DeleteOwner = 64
Role.Download = 128
Role.DownloadOwner = 512
Role.Export = 1024
Role.ExportOwner = 2048

/**
 * Global instance
 */
Role._instance = null

/**
 * get instance
 * @return this.instance
 */
Role.getInstance = function () {
  if (!Role._instance) {
    Role._instance = new Role()
  }

  return this._instance
}

/**
 * Saving global roles variables
 * @param {Object} role
 */
Role.setRoles = function (role = {}) {
  Role.getInstance()._roles = role
}

/**
 * Saving global permissions variables
 * @param {Object} permissions
 */
Role.setPermissions = function (permissions = {}) {
  Role.getInstance()._permissions = permissions
}

/**
 * Get global roles variables
 * @return {Object} role
 */
Role.getRoles = function () {
  const rs = Role.getInstance()._roles
  return [...arguments].reduce((accumulator, roleKey) => {
    if (roleKey && typeof roleKey === 'string') {
      accumulator[roleKey] = !!rs[roleKey]
    }

    return accumulator
  }, {})
}

/**
 * Get global permission variables
 * @param {string} permissionKey
 * @return {number} 
 * @default 0
 */
Role.getPermissionBy = function (permissionKey) {
  const p = Role.getInstance()._permissions
  return p[permissionKey] || 0
}

/**
 * Get global permissions variables
 * @return {Object} permissions
 */
Role.getPermissions = function () {
  const p = Role.getInstance()._permissions

  return [...arguments].reduce((accumulator, permissionKey) => {
    if (permissionKey && typeof permissionKey === 'string') {
      accumulator[permissionKey] = p[permissionKey] || 0
    }

    return accumulator
  }, {})
}

/**
 * Convert binary string to number
 * (ex): 10011 => 19
 * @param {string} binary 0001010
 * @returns number
 */
Role.convertToNumber = function (binary: string) {
  return parseInt(binary, 2)
}

/**
 * Convert number to binary string
 * (ex): 19 => 10011
 * @param {number} number
 * @returns array
 */
Role.convertToBinary = function (number, length = 16) {
  return parseInt(number).toString(2).padStart(length, '0')
}

/**
 * Check has permission
 * @param {number} number Number from API
 * @param {number} numberOfPermissions Number of role 1,2,4,8...
 * @returns boolean
 */
Role.hasPermission = function (number) {
  if (!number) {
    // no have access if number is null, undefined, 0
    return () => false
  }

  const binaryNum = Role.convertToBinary(number)
  return function (numberOfPermissions) {
    const binaryPms = Role.convertToBinary(numberOfPermissions, 0)

    return (
      binaryPms.length &&
      binaryPms[0] === '1' &&
      binaryPms[0] === binaryNum[binaryNum.length - binaryPms.length]
    )
  }
}

/**
 * Summary all number
 * @param {number[]} arguments
 * @returns number
 */
Role.sumPermission = function (...args: number[]): number {
  let sum = 0
  for (let i = 0; i < args.length; i++) {
    if (typeof arguments[i] !== 'number') continue

    sum += arguments[i]
  }

  return sum
}

export default Role
