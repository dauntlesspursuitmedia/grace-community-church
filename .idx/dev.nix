{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_18
  ];

  # Sets environment variables in the workspace
  env = {
    SOME_ENV_VAR = "hello";
    SANITY_STUDIO_PROJECT_ID = "0u9numjg";
    SANITY_STUDIO_DATASET = "production";
    SANITY_STUDIO_API_VERSION = "2023-11-15";
    SANITY_FRONTEND_URL = "http://localhost:3000";
    SANITY_STUDIO_URL = "http://localhost:3000";

    # Generated in sanity.io/manage
    # Token with "Viewer" permissions
    SANITY_READ_TOKEN = "skbyBjvhSjj9H3si19Su5m1GUylpeFOw9gmow5yTV7ADRWh2RTVPo3i8ItslNItlnfMwtjFxVqGB8K51NGqZwTBoEDPdcxktekDOoHWyTQMoXxwRtWAGFGkQnjEfUgb9j14sA97P3YyGd8JFuJV90BZ1fGV8XzmueM5DsjTNXaxpgNmEPQWb";

    # Generated in sanity.io/manage
    # Token with "Editor" permissions
    SANITY_WRITE_TOKEN = "skYyRutfiGffehCCNTQ4GnWO25PpX7aeZfbAIsDB4j7xoSGhNskcPa1rxxOszFcUHWMbT20qICjY5GbWtmZFd6FQWDp3dktvKioeVMMpzuYVudLzmddBHiPmT6CypKzemoYi25fFa0v31kPcttr8Zbgid7EnXCmL5UrUwX0hsk9rd20QGfRD";

    SERMON_AUDIO_API_KEY = "823d770c-0486-434d-8302-6d6e6ac420f9";
    SERMON_AUDIO_BROADCAST_ID = "cbcofmanchestertn";
    SERMON_AUDIO_BASE_URL = https://api.sermonaudio.com;


  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "angular.ng-template"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
        id = "web";
      }
    ];
  };
}
