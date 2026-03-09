import Link from "next/link";

const Unauthorized = () => {
  return (
    <section
      className={`flex flex-col items-center justify-center h-screen pt-35`}
    >
      <div className="animate_top mx-auto max-w-[518px] text-center">
        <img src="/images/404/404.svg" alt="404" width={1000} height={1000} />

        <h2 className="mb-5 mt-3 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          You are not authorized to access this page.
        </h2>
        <p className="mb-7.5">
          This page is restricted to authorized users only. Please contact your
          administrator for more information.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand hover:bg-brand-hover px-6 py-3 font-medium text-white duration-300 ease-in-out"
        >
          Go Back
          <svg
            className="fill-white"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
              fill=""
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Unauthorized;
