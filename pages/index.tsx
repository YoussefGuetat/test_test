import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import $ from "jquery"; // Import jQuery directly
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Link from 'next/link'; // Import Link from next/link

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if jQuery is loaded
      $(document).ready(function () {
        if (typeof $.fn.owlCarousel === "function") {
          $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
          });
        } else {
          console.error("OwlCarousel is not loaded");
        }
      });
    }
  }, []);

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/sign-in"; // Not used since we will replace with Link
  };

  return (
    <>
      <Head>
        {/* Meta Data */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>

      {/* Top Area */}
      <header className="top-area">
        <div className="header-area">
          <nav className="navbar navbar-default bootsnav navbar-fixed dark no-background">
            <div className="container">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navbar-menu"
                >
                  <i className="fa fa-bars"></i>
                </button>
                <Link href="/" className="navbar-brand">Test Youssef</Link>

              </div>
              <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                  <li className="smooth-menu">
                    <Link href="/sign-in">
                      Se connecter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="clearfix"></div>
      </header>

      {/* Welcome Hero */}
      <section id="welcome-hero" className="welcome-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="header-text">
                <h2>
                  Bonjour <span>,</span> Je suis <br /> GUETAT Youssef <br /> Vas-y{" "}
                  <span>.</span>
                </h2>
                <Link href="/sign-in">
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer-copyright" className="footer-copyright">
        <div className="container">
          <div className="hm-footer-copyright text-center">
            <p>
              &copy; copyright Guetat Youssef. design and developed by{" "}
              <a href="https://www.linkedin.com/in/youssef-guetat-223535213/">Guetat Youssef</a>
            </p>
          </div>
        </div>
        <div id="scroll-Top">
          <div className="return-to-top">
            <i className="fa fa-angle-up" id="scroll-top"></i>
          </div>
        </div>
      </footer>

     {/* Load Scripts */}
<Script src="/js/jquery.js" strategy="beforeInteractive" />
<Script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" strategy="afterInteractive" />
<Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
<Script src="/js/bootsnav.js" strategy="afterInteractive" />
<Script src="/js/jquery.sticky.js" strategy="afterInteractive" />
<Script src="/js/progressbar.js" strategy="afterInteractive" />
<Script src="/js/jquery.appear.js" strategy="afterInteractive" />
<Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
<Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js" strategy="afterInteractive" />

    </>
  );
};

export default Home;
