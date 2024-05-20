"use client"



export default function Admin() {
  return (
        <div>
          <h2 className="text-xl mb-5">Welcome back, Admin!</h2>
          <p>Here is the overview of your account:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="p-5 border rounded-md shadow">
              <h3 className="text-lg mb-2">Total Users</h3>
              <p>500</p>
            </div>
            <div className="p-5 border rounded-md shadow">
              <h3 className="text-lg mb-2">Total Products</h3>
              <p>50</p>
            </div>
          </div>
        </div>
  )
}
