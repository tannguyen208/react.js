class BaseModel {
  _model$

  constructor(model) {
    this._model$ = model
  }

  get model$() {
    return this._model$
  }
}

export default BaseModel
