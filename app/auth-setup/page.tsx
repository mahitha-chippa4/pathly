export default function AuthSetupPage() {
  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-12 shadow-sm border border-pathly-primary/10">
        <h1 className="text-4xl font-black mb-8">Authentication Setup Guide</h1>
        
        <p className="text-lg opacity-80 mb-12">
          This guide will walk you through setting up OAuth credentials for Google and GitHub. Once you have the credentials, place them in the <code>.env</code> file at the root of the project.
        </p>

        <h2 className="text-2xl font-bold mb-4">1. How to obtain Google Client ID & Secret</h2>
        <div className="bg-pathly-lavender/30 rounded-xl p-6 mb-8 space-y-4">
          <ol className="list-decimal pl-6 space-y-2 opacity-90">
            <li>Go to the <a href="https://console.cloud.google.com/" className="text-pathly-primary font-bold underline" target="_blank" rel="noreferrer">Google Cloud Console</a>.</li>
            <li>Create a new project or select an existing one.</li>
            <li>Navigate to <strong>APIs & Services &gt; Credentials</strong> from the sidebar.</li>
            <li>Click <strong>+ CREATE CREDENTIALS</strong> and select <strong>OAuth client ID</strong>.</li>
            <li>If prompted, configure the OAuth consent screen (select "External" and fill in the required app name and email).</li>
            <li>For Application Type, select <strong>Web application</strong>.</li>
            <li>Under <strong>Authorized redirect URIs</strong>, click Add URI and paste: <br/><code className="bg-white px-2 py-1 rounded text-sm mt-2 inline-block">http://localhost:3000/api/auth/callback/google</code></li>
            <li>Click Create. A modal will appear containing your <strong>Client ID</strong> and <strong>Client Secret</strong>.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold mb-4">2. How to obtain GitHub Client ID & Secret</h2>
        <div className="bg-pathly-mint/30 rounded-xl p-6 mb-8 space-y-4">
          <ol className="list-decimal pl-6 space-y-2 opacity-90">
            <li>Go to your GitHub Settings and navigate to <a href="https://github.com/settings/developers" className="text-pathly-primary font-bold underline" target="_blank" rel="noreferrer">Developer Settings</a>.</li>
            <li>Click on <strong>OAuth Apps</strong> and then <strong>New OAuth App</strong>.</li>
            <li>Fill in the Application name and Homepage URL (e.g., <code>http://localhost:3000</code>).</li>
            <li>For the <strong>Authorization callback URL</strong>, paste: <br/><code className="bg-white px-2 py-1 rounded text-sm mt-2 inline-block">http://localhost:3000/api/auth/callback/github</code></li>
            <li>Click Register application.</li>
            <li>You will immediately see your <strong>Client ID</strong>.</li>
            <li>Click <strong>Generate a new client secret</strong> to get your Client Secret.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold mb-4">3. Where to place them</h2>
        <div className="bg-gray-100 rounded-xl p-6">
          <p className="opacity-90 mb-4">Open the <code>.env</code> file in the root of your Pathly web application folder and paste the credentials like this:</p>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"`}
          </pre>
          <p className="mt-4 text-sm font-bold opacity-70">Note: You must restart the Next.js development server after updating the .env file.</p>
        </div>

      </div>
    </div>
  )
}
