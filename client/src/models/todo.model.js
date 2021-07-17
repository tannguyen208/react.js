import BaseModel from './base.model'

class Todo extends BaseModel {
  constructor(todo) {
    super(todo)
  }

  get id() {
    return this.model$.id
  }

  get title() {
    return this.model$.title
  }

  get description() {
    return this.model$.desc
  }

  get done() {
    return this.model$.done
  }
}

Object.freeze(Todo)

export default Todo
