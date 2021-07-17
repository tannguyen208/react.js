class Role {
  _roles = {}

  _permissions = {}

  setRoles(role) {
    this._roles = role
  }

  getRoles() {
    return this._roles
  }

  setPermissions(permissions) {
    this._permissions = permissions
  }

  getPermissions() {
    return this._permissions
  }
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
Role.instance = null

/**
 * get instance
 * @return this.instance
 */
Role.getInstance = function () {
  if (!Role.instance) {
    Role.instance = new Role()
  }

  return this.instance
}

/**
 * Saving global roles variables
 *
 * @param {Object} role
 */
Role.setRoles = function (role = {}) {
  Role.getInstance().setRoles(role)
}

/**
 * Saving global permissions variables
 *
 * @param {Object} permissions
 */
Role.setPermissions = function (permissions = {}) {
  Role.getInstance().setPermissions(permissions)
}

/**
 * Get global roles variables
 *
 * @return {Object} role
 */
Role.getRoles = function (...args) {
  const rs = Role.getInstance().getRoles()
  return [...args].reduce((accumulator, roleKey) => {
    if (roleKey && typeof roleKey === 'string') {
      accumulator[roleKey] = !!rs[roleKey]
    }

    return accumulator
  }, {})
}

/**
 * Get global permission variables
 *
 * @param {string} permissionKey
 * @return {number}
 * @default 0
 */
Role.getPermissionBy = function (permissionKey) {
  const p = Role.getInstance().getPermissions()
  return p[permissionKey] || 0
}

/**
 * Get global permissions variables
 *
 * @return {Object} permissions
 */
Role.getPermissions = function (...args) {
  const p = Role.getInstance().getPermissions()

  return [...args].reduce((accumulator, permissionKey) => {
    if (permissionKey && typeof permissionKey === 'string') {
      accumulator[permissionKey] = p[permissionKey] || 0
    }

    return accumulator
  }, {})
}

/**
 * Convert binary string to number
 *
 * @param {string} binary
 * @returns number
 * @example
 *
 * 10011 => 19
 */
Role.convertToNumber = function (binary) {
  return parseInt(binary, 2)
}

/**
 * Convert number to binary string
 *
 * @param {number} number
 * @returns {string} binary string with length default is 16
 * @example
 *
 * 19 => 10011
 */
Role.convertToBinary = function (number, length = 16) {
  return parseInt(number.toString()).toString(2).padStart(length, '0')
}

/**
 * Check has permission
 *
 * @param {number} number Number from API
 * @returns {Function} boolean
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
 *
 * @param {number[]} args
 * @returns number
 */
Role.sumPermission = function (...args) {
  let sum = 0

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'number') {
      sum += args[i]
    }
  }

  return sum
}

export default Role
