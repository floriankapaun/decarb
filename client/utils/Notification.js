class Notification {
    /**
     * Notification constructor
     * @param {Object} params - containing params
     * @param {Date} [params.createdAt]
     * @param {String} [params.type]
     * @param {String} [params.title]
     * @param {String} [params.subTitle]
     * @param {String} [params.caption]
     * @param {String} [params.actionLabel]
     * @param {String} [params.closeAriaLabel=Close Notification]
     * @param {Boolean} [params.lowContrast=true]
     * @param {Function} [params.doClose]
     * @param {Function} [params.doAction]
     */
    constructor(params) {
        // Set default value for `this.closeAriaLabel` and `this.lowContrast`
        this.closeAriaLabel = 'Remove Notification'
        this.lowContrast = true
        // Assign all params to object (overwrites closeAriaLabel if param given)
        Object.assign(this, params)
        // Make sure `createdAt` contains value which serves as identifier
        if (!this.createdAt) this.createdAt = Date.now()
        // Make sure type is correct
        const typeOptions = ['info', 'success', 'warning', 'error']
        if (!typeOptions.includes(this.type)) this.type = 'info'
    }
}

export default Notification
