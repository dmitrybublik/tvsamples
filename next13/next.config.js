const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // i18n, // disabled to allow next export to static HTML
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },

  // Optional build-time configuration options
  sentry: {
    hideSourceMaps: false,

    // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
    // sections below for information on the following options:
    //   - disableServerWebpackPlugin
    //   - disableClientWebpackPlugin
    //   - autoInstrumentServerFunctions
    //   - hideSourceMaps
    //   - widenClientFileUpload
    //   - transpileClientSDK
  },

  webpack(config, { isServer }) {
    config.experiments = {
      topLevelAwait: true
    },
      config.module = {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(js|ts)$/,
            include: [
              "/node_modules/@sentry/",
            ],
            exclude: [],
            loader: "babel-loader",
          },
        ]
      }
    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: false, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);