import Link from "next/link";

function LandingPage() {
  return (
    <div className="flex flex-auto justify-center items-center">
      <div className="">
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
