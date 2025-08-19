export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white py-8 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-600">Privacy</a>
            <a href="#" className="hover:text-primary-600">Terms</a>
            <a href="#" className="hover:text-primary-600">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

