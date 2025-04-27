import { SwaggerUIConstants, SwaggerTag } from './swagger.interfaces';

export const SWAGGER_UI_CONSTANTS: SwaggerUIConstants = {
  TOPBAR: {
    BACKGROUND_COLOR: '#00274C',
  },
  AUTHORIZE: {
    BACKGROUND_COLOR: '#222222',
  },
  HTTP_METHODS: {
    GET: {
      BACKGROUND_COLOR: '#E4E4E4',
      BORDER_COLOR: '#DADFE1',
      SUMMARY_COLOR: '#222222',
    },
    POST: {
      BACKGROUND_COLOR: '#E4E4E4',
      BORDER_COLOR: '#DADFE1',
      SUMMARY_COLOR: '#222222',
    },
    DELETE: {
      BACKGROUND_COLOR: '#E4E4E4',
      BORDER_COLOR: '#DADFE1',
      SUMMARY_COLOR: '#222222',
    },
    PATCH: {
      BACKGROUND_COLOR: '#E4E4E4',
      BORDER_COLOR: '#DADFE1',
      SUMMARY_COLOR: '#222222',
    },
    PUT: {
      BACKGROUND_COLOR: '#E4E4E4',
      BORDER_COLOR: '#DADFE1',
      SUMMARY_COLOR: '#222222',
    },
  },
};

export const _SWAGGER_TAGS: SwaggerTag[] = [
  {
    name: 'app',
    description: 'App route in Swagger Custom UI',
  },
];
