class $Base {
  _model$

  /**
   * @param {any} model
   */
  constructor(model) {
    this._model$ = model
  }

  get _model() {
    return this._model$
  }
}

export default $Base
