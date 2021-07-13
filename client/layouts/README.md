# Layouts

This directory contains the Nuxt Layouts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/views#layouts).

## `default.vue`

The default template, used if no other template is specified. Should only be applied to publicaly available pages.

## `dashboard.vue`

Used for all dashboard pages. Only authenticated users can access those.

## `minimal.vue`

Used for pages like Logout and Register to reduce the possibility of users loosing focus.

## `error.vue`

Default Error Template – displayed if Nuxt throws an Error. Doesn't work like an actual layout but more like a page, but Nuxt enforces it to exist in the layouts directory.
