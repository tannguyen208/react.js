import $Base from './base.model'

class Todo extends $Base {
  constructor(todo) {
    super(todo)
  }

  get id() {
    return this._model.id
  }

  get title() {
    return this._model.title
  }

  get description() {
    return this._model.desc
  }

  get done() {
    return this._model.done
  }
}

Object.freeze(Todo)

export default Todo
