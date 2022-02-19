import Link from 'next/link';

function LandingPage() {
  return (
    <div className="h-screen">
      <div className="h-5/6 flex justify-center items-center">
        <Link href="/subjects">
          <h1 className="bg-btn-bg text-btn-text text-xl font-semibold px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-btn-bg-hover">
            Get Started!
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;