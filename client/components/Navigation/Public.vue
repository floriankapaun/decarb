<template>
    <div class="wrapper">
        <CvHeaderMenuItem :to="localeRoute('how-it-works')">
            {{ $t('c.navigation.public.howItWorks') }}
        </CvHeaderMenuItem>
        <CvHeaderMenuItem :to="localeRoute('members')">
            {{ $t('c.navigation.public.members') }}
        </CvHeaderMenuItem>
        <CvHeaderMenuItem :to="localeRoute('about')">
            {{ $t('c.navigation.public.about') }}
        </CvHeaderMenuItem>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: contents;
}
</style>
