# next-cart-app

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/cloudme-digital/next-cart-app">
    <img src="public/android-chrome-192x192.png" alt="Logo" width="192" height="192">
  </a>

<h3 align="center">Next Cart App</h3>

  <p align="center">
    E-commerce mobile application that consumes WooCommerce API.
    <br />
    <a href="https://github.com/cloudme-digital/next-cart-app"><strong>Go to the repo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/cloudme-digital/next-cart-app/issues/new?labels=bug&template=bug-report---.md">Report a Bug</a>
    ·
    <a href="https://github.com/cloudme-digital/next-cart-app/issues/new?labels=enhancement&template=feature-request---.md">Request a Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#how-to-use">Development</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#supervisors">Supervisors</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- <div align="center"><img src="images/screenshot.png" alt="Screenshot"></div> -->
<!-- <br /> -->

Next Cart App is an e-commerce mobile application that consumes WordPress/WooCommerce GraphQL API. It is created in NextJS framework with Capacitor runtime to work on both Android and iOS.

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

### Built With

- [NextJS Framework (CSR)](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering)
- [Ionic Capacitor Runtime](https://capacitorjs.com/)
- [TailwindCSS Stylesheets](https://tailwindcss.com/)
- [Apollo GraphQL Client](https://www.apollographql.com/docs/react/)
- [WordPress GraphQL API](https://www.wpgraphql.com/)
- [WooCommerce GraphQL API](https://woographql.com/)
- [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication/)

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get this project up and running follow these simple steps.

### Prerequisites

You need a Linux or macOS machine with the following software:

- NodeJS (v20 or newer)

  ```sh
  node --version
  ```

- NextJS CLI (v14 or newer)

  ```sh
  npm install -g next@latest
  ```

- Capacitor CLI (v6 or newer)
  ```sh
  npm install -g @capacitor/cli
  ```

### Installation

1. Clone the remote repository to a local one

   ```sh
   git clone https://github.com/cloudme-digital/next-cart-app.git
   cd next-cart-app
   ```

2. Install all dependencies and build the app

   ```sh
   npm install
   npm run build
   ```

3. Open the target project (or do it manually)

   ```sh
   cap open android # just to open the 'android' folder in Android Studio
   cap open ios # just to open the 'ios' folder in in Apple Xcode
   ```

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

<!-- HOW TO USE -->

## How to Use

You need to have a WooCommerce site to use it as a backend with the following plugins installed: [WPGraphQL](https://wordpress.org/plugins/wp-graphql/), [WPGraphQL WooCommerce](https://github.com/wp-graphql/wp-graphql-woocommerce/) and [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication/). Change the URLs in `next.config.js` and `ApolloClient.js` files. Change the names in `capacitor.config.json` and `Navbar.component.tsx` and `Header.component.tsx` files.

### Assets

The public directory houses images and any other files you want to include with your application. You need to [generate all standard favicons](https://favicon.io/favicon-converter/) to be added in this folder directly.

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

## Contributing

Any contributions you make are **greatly appreciated**. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Added some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

<!-- AUTHORS -->

## Authors

- Ahmed Almadhoob

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

<!-- SUPERVISORS -->

## Supervisors

- Ali Al Toblani
- Muhammed Zahid

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>

<!-- LICENSE -->

## License

Copyright (C) 2024 Cloudme Digital Co. W.L.L. All rights reserved.
<br />This project is released under the [MIT license](./LICENSE).

<p align="right">(<a href="#next-cart-app">back to top</a>)</p>
