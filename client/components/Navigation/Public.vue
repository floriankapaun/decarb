<template>
    <CvHeaderNav :aria-label="$t('c.navigation.public.ariaLabel')">
        <CvHeaderMenuItem :to="localeRoute('about')">
            {{ $t('c.navigation.public.about') }}
        </CvHeaderMenuItem>
    </CvHeaderNav>
</template>
