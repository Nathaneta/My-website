export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Services & Solutions</h1>
      <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-300">Select solutions tailored to your industry and goals. Interactive demos coming soon.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4,5,6].map((i)=> (
          <div key={i} className="rounded-lg border border-gray-200 p-5 transition hover:shadow-md dark:border-gray-800">
            <h3 className="text-lg font-semibold">Service {i}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Description of service {i} with hover and click interactions.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

