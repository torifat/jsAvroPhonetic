{
  description = "Avro Phonetic - JavaScript";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          env = { };
          packages = with pkgs; [
            nodejs_23
            pnpm
          ];
          # shellHook = ''
          # '';
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    );
}
