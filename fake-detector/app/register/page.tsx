'use client'

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">AI Media Detector</h1>
      <div className="w-full max-w-2xl">
        <form action="/manage">
          <label>DNI:
            <input type="text" />
          </label>
          <label>Email:
            <input type="email" />
          </label>
          <label>Password :
            <input type="password" />
          </label>
          <label>Password verification:
            <input type="password" />
          </label>
          <input type="submit"></input>
        </form>
      </div>
    </main>
  )
}