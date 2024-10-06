import { useSession, signOut } from "next-auth/react";
import UserForm from "../src/presentation/UserForm";
import Head from "next/head";
import Script from "next/script";

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  const nameParts = session.user.name ? session.user.name.split(" ") : [];
  const firstName = nameParts[0] || "Guest"; 
  const lastName = nameParts[1] || ""; 

  const userName = session.user.name || ""; 

  return (
    <>
      <Head>
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
                <a className="navbar-brand" href="/">
                  Test Youssef
                </a>
              </div>
              <div
                className="collapse navbar-collapse menu-ui-design"
                id="navbar-menu"
              >
                <ul
                  className="nav navbar-nav navbar-right"
                  data-in="fadeInDown"
                  data-out="fadeOutUp"
                >
                  <li className="smooth-menu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("token"); 
                        window.location.href = "/sign-in";
                      }}
                    >
                      Se Déconnecter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="clearfix"></div>
      </header>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-heading text-center">
          <h2>Mon Profile</h2>
        </div>
        <div className="container">
          <div className="about-content">
            <div className="row">
              <div className="col-sm-6">
                <div className="single-about-txt">
                  <h3>
                    I am {firstName} {lastName}. A professional user.
                  </h3>
                  {/* UserForm integrated here */}
                  <UserForm userId={session.user.id} userName={userName} />
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="single-about-add-info">
                        <h3>Phone</h3>
                        <p>+21655025447</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="single-about-add-info">
                        <h3>Email</h3>
                        <p>{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-offset-1 col-sm-5">
                <div className="single-about-img">
                  <img
                    src="images/about/profile_image.jpg"
                    alt="profile_image"
                  />
                  <div className="about-list-icon">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-dribbble" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer-copyright" className="footer-copyright">
        <div className="container">
          <div className="hm-footer-copyright text-center">
            <p>
              &copy; copyright Guetat Youssef. design and developed by{" "}
              <a href="https://www.linkedin.com/in/youssef-guetat-223535213/">Guetat Youssef</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Load Scripts */}
      <Script src="/js/jquery.js" strategy="beforeInteractive" />
      <Script src="/js/jquery.sticky.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
};

export default Profile;
