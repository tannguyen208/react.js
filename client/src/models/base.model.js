class BaseModel {
  _model$

  /**
   * @param {any} model
   */
  constructor(model) {
    this._model$ = model
  }

  get model$() {
    return this._model$
  }
}

export default BaseModel
