import React from 'react'

function Todo() {
  return (
    <>
    <section className="vh-100" >
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-9 col-xl-7">
          <div className="card rounded-3">
            <div className="card-body p-4">
  
              <h4 className="text-center my-3 pb-3">To Do App</h4>
  
              <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                <div className="col-12">
                  <div data-mdb-input-init className="form-outline">
                    <input type="text" id="form1" className="form-control" />
                    <label className="form-label" for="form1">Enter a task here</label>
                  </div>
                </div>
  
                <div className="col-12">
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary">Save</button>
                </div>
  
                <div className="col-12">
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-warning">Get tasks</button>
                </div>
              </form>
  
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Todo item</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Buy groceries for next week</td>
                    <td>In progress</td>
                    <td>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger">Delete</button>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success ms-1">Finished</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Renew car insurance</td>
                    <td>In progress</td>
                    <td>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger">Delete</button>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success ms-1">Finished</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Sign up for online course</td>
                    <td>In progress</td>
                    <td>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger">Delete</button>
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success ms-1">Finished</button>
                    </td>
                  </tr>
                </tbody>
              </table>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      
    </>
  )
}

export default Todo
