export default function Footer() {
  return (
    <footer className="border-t border-gray-200/10 py-8 text-sm text-gray-500 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-brand">Privacy</a>
            <a href="#" className="hover:text-brand">Terms</a>
            <a href="#" className="hover:text-brand">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

