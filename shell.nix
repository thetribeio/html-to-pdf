let
    nixpkgs = import <nixpkgs> { };

    nodejs = nixpkgs.nodejs-9_x;
    yarn = nixpkgs.yarn.override { inherit nodejs; };
in
    nixpkgs.runCommand "html-to-pdf" { buildInputs = [ nodejs yarn ]; } ""
