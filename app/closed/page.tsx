export default function ClosedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">
            🎉 Workshop Goal Achieved!
          </h1>
          <p className="mt-2 text-blue-600 text-lg font-medium">
            Thank you for your amazing support
          </p>
        </div>

        {/* Body */}
        <p className="text-gray-700 text-center leading-relaxed text-[17px]">
          We are excited to announce that we have successfully reached our
          target number of participants for this workshop!
          <br />
          <br />
          Registrations are now closed, but this is just the beginning.
          <br />
          <span className="font-semibold text-blue-700">
            Follow us to stay updated on our upcoming events, sessions, and
            future workshops.
          </span>
        </p>

        {/* Footer / Social CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all font-medium"
          >
            Follow Us for Updates
          </a>
        </div>
      </div>
    </div>
  );
}
