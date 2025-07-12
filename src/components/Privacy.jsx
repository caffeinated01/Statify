function Privacy() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 py-10 px-5">
        <h1 className="text-2xl underline">Privacy Policy</h1>
        <div className="max-w-[1000px]">
          <div className="mb-10">
            <p>
              This Privacy Policy describes how Statify ("we," "us," or "our")
              collects, uses, and protects information when you use our site. By
              accessing or using the site, you agree to the terms of this
              Privacy Policy.
            </p>
          </div>
          <div className="space-y-2 mb-10">
            <h1 className="text-2xl underline">Information We Collect:</h1>
            <ul>
              a. Information You Provide: When you use Statify, we may collect
              certain information that you voluntarily provide to us. This may
              include your Spotify login information, such as your username and
              password, which are necessary to access your Spotify account
              through our site.
            </ul>
            <ul>
              b. Local Storage: We may store limited information locally on your
              device using the browser's local storage mechanism. This may
              include login tokens or session identifiers, which are used to
              facilitate your use of the site. This information is stored
              securely on your device and is deleted automatically upon logout
              or when you clear your browser's local storage.
            </ul>
          </div>
          <div className="space-y-2 mb-10">
            <h1 className="text-2xl underline">How We Use Your Information:</h1>
            <ul>
              We use the information we collect solely to provide you with
              access to the features and functionality of Statify. Specifically,
              we use your Spotify login information to authenticate your
              identity and retrieve your listening statistics and preferences
              from Spotify's API. We do not share your information with
              third-party service providers, advertisers, or other third
              parties.
            </ul>
          </div>
          <div className="space-y-2 mb-10">
            <h1 className="text-2xl underline">Data Retention:</h1>
            <ul>
              We do not retain any user data on our servers. Any information
              collected during your use of the site, such as your Spotify login
              information or browsing history, is stored locally on your device
              using the browser's local storage. We do not have access to this
              information, and it is deleted automatically upon logout or when
              you clear your browser's local storage.
            </ul>
          </div>
          <div className="space-y-2 mb-10">
            <h1 className="text-2xl underline">Cookies:</h1>
            <ul>
              We do not use cookies or tracking technologies on the Site. We do
              not track your IP address, browser type, or other usage data.
            </ul>
          </div>
          <p>
            By using Statify, you consent to the collection, use, and storage of
            your information as described in this Privacy Policy. If you do not
            agree with any aspect of this Privacy Policy, please do not use the
            Site.
          </p>
        </div>
      </div>
    </>
  );
}
export default Privacy;
