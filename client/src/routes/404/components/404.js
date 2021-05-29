import React from 'react'

function Error404() {
  return (
    <div className="err-container text-center">
      <div className="err">
        <h1>404</h1>
        <h2>Sorry, Page not found</h2>
      </div>

      <div className="err-body">
        <a href="/" className="btn btn-raised btn-lg btn-default">
          Go Back to Home Page
        </a>
      </div>
    </div>
  )
}

export default React.memo(Error404)
