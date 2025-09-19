import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <nav className="absolute top-4 left-4 space-x-4">
        <Link href="/" className="text-blue-600 hover:underline">Game</Link>
        <Link href="/api/health" className="text-blue-600 hover:underline">Health</Link>
      </nav>

      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Me</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Email</h2>
            <a 
              href="mailto:your.email@example.com" 
              className="text-blue-600 hover:underline"
            >
              your.email@example.com
            </a>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">LinkedIn</h2>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/yourprofile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}