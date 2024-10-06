import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import jQuery
const jQuery = dynamic(() => import('jquery'), { ssr: false });

const SignIn = () => {
    useEffect(() => {
        const loadJQuery = async () => {
            // Explicitly define the type of $
            const $ = (await jQuery) as typeof import('jquery');

            const navbar = $(".navbar") as JQuery & { sticky: (options?: any) => JQuery };

            if (navbar.length && typeof navbar.sticky === 'function') {
                navbar.sticky(); 
            }
        };

        loadJQuery();
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
                <link rel="stylesheet" href="/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/style1.css" />
                <style>{`
                    #sign-in {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background-color: #f8f9fa;
                    }
                    .header-text {
                        text-align: center;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        width: 400px;
                        position: relative;
                        left: 35%;
                        top: -150px;
                    }
                    .btn-google {
                        background-color: #4285f4;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        font-size: 16px;
                        width: 100%;
                    }
                    .btn-google:hover {
                        background-color: #357ae8;
                    }
                    .header-text h2,
                    .header-text p {
                        color: #000;
                    }
                `}</style>
            </Head>

            <header className="top-area">
                <div className="header-area">
                    <nav className="navbar navbar-default bootsnav navbar-fixed dark no-background">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                    <i className="fa fa-bars"></i>
                                </button>
                                <Link className="navbar-brand" href="/">Test Youssef</Link>
                            </div>
                            <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                                <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                                    <li className="smooth-menu">
                                        <Link href="/" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = "/";
                                        }}>Acceuil</Link>
                                    </li>
                                    <li className="smooth-menu">
                                        <Link href="/sign-in" onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = "/sign-in";
                                        }}>Se connecter</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="clearfix"></div>
            </header>

            <section id="sign-in" className="welcome-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-text">
                                <h2>Bienvenue</h2>
                                <p>Connecter pour continuer</p>
                                <button className="btn-google" onClick={() => signIn('google')}>Connecter avec Google</button>
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
                            <Link href="https://www.linkedin.com/in/youssef-guetat-223535213/">Guetat Youssef</Link>
                        </p>
                    </div>
                </div>
            </footer>

            {/* Load Scripts */}
            <Script src="/js/jquery.js" strategy="beforeInteractive" />
            <Script src="/js/jquery.sticky.js" strategy="afterInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" strategy="afterInteractive" />
            <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
            <Script src="/js/bootsnav.js" strategy="afterInteractive" />
            <Script src="/js/progressbar.js" strategy="afterInteractive" />
            <Script src="/js/jquery.appear.js" strategy="afterInteractive" />
            <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js" strategy="afterInteractive" />
        </>
    );
};

export default SignIn;
