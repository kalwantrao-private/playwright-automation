import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: [ '**/*.ts', '**/*.mjs' ],
        rules: {
            semi: ["error", "always"],
            "pedding-line-between-statements": [
                "error",
                
                { blankline: "always", prev: "import", next: "*" },
                { blankline: "always", prev: "*", next: "export" },
                { blankline: "always", prev: "function", next: "function" }
            ],
            "prefer-const": "warn",
            "no-const-binary-expression": "error",
            
        }
    }
]);
