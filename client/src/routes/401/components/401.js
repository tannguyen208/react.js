import React from 'react'

function Error401() {
  return (
    <div className="err-container text-center">
      <div className="err">
        <h1>401</h1>
        <h2>Sorry, No Have Access</h2>
      </div>

      <div className="err-body">
        <a href="/" className="btn btn-raised btn-lg btn-default">
          Go Back to Home Page
        </a>
      </div>
    </div>
  )
}

export default React.memo(Error401)
