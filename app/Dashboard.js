import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-sm font-medium text-gray-200">Any Day, Any Time, Any Where.</h2>
            <p className="text-xs text-gray-300">Originated in Abu Dhabi, UAE</p>
          </div>
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <Link className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" href="/signin">
            Sign In</Link>
            <Link className="ml-3 inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600" href="/signup">
            Sign up</Link>
          </div>
        </header>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Wizarding World AI</h1>
        <p className="text-2xl md:text-3xl font-bold text-orange-400 mb-8">
          Unleash the magic of AI conversations
        </p>

        <p className="text-lg text-gray-200 mb-12">
          Wizarding World AI is your portal to enchanted dialogues. Engage with AI-powered characters from magical realms, learn spells of modern technology, and embark on digital adventures beyond imagination.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">4</h3>
            <p className="text-gray-300">Magical Chatbots</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">1,000</h3>
            <p className="text-gray-300">Expected Wizards</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">700+</h3>
            <p className="text-gray-300">Lines of Enchanted Code</p>
          </div>
        </div>
      </div>
    </div>
  );
}