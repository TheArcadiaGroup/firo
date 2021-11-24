# IDS.Company Sveltekit + Tailwind Init Project

## Directories

### lib

This directory contains the components used in the project in the format `ComponentName/index.svelte`.

### routes

This directory contains the main routes of the project i.e. `index.svelte` for the `/` route, or directories such as `api` directory with routes leading to `/api/{path-in-api-route}`.

### styles

This directory contains the styles associated with the project, these are mostly `css` files, but in this case, only the `tailwind.css` file for initializing tailwind is required.

### static

This directory contains the static files that can be accessed in the app from the `/` route. In this case, its recommended to have the files in directories associated with their types such as `images/png` for png images.

The project types should be placed in the `global.d.ts` file or any additional files in an `@types` directory which can be added for this purpose.

Other directories such as the `utils` can be added for utility functions used across the application. There are already aliases for these directories thereby allowing their imports to take the following approach `$routes/{...file_path}/{file_name}`. More aliases can be added to the `tsconfig` and `svelte.config` files.

### tailwind.config.cjs

To foster DRY principles, it is recommended to extend the basic tailwind theme in this file to ensure that theme related changes can be made from a single point as opposed to searching for what changes to make within the code.
