export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} Nexora</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}

