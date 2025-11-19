function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content mt-auto p-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span>
          Copyright © 2025 SportConnect. Developed by{" "}
          <a
            href="https://www.linkedin.com/in/ep3100/"
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="link link-hover underline"
          >
            Emanuel Pimentel
          </a>{" "}
          and{" "}
          <a
            href="https://mychiffonn.com"
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="link link-hover underline"
          >
            My Chiffon Nguyen
          </a>{" "}
          with 🩵.
        </span>
        <a
          href="https://github.com/mychiffonn/sport-connect"
          rel="noopener noreferrer nofollow"
          target="_blank"
          className="link link-hover underline"
        >
          Source Code
        </a>
      </div>
    </footer>
  )
}

export default Footer
