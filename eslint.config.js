module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "ecmaFeatures": {
    "classes": true,
    "jsx": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "extends": ["eslint", "eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "arrow-body-style": "error",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "eqeqeq": "error",
    "generator-star-spacing": "error",
    "no-duplicate-imports": "error",
    "no-eq-null": "error",
    "no-undefined": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "rest-spread-spacing": "error",
    "semi": "error",
    "template-curly-spacing": "error",
    "yield-star-spacing": "error"
  }
}
