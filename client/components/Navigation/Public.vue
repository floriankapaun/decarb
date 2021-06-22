<template>
    <div class="wrapper">
        <CvHeaderMenuItem :to="localeRoute('about')">
            {{ $t('c.navigation.public.about') }}
        </CvHeaderMenuItem>
        <CvHeaderMenuItem :to="localeRoute('members')">
            {{ $t('c.navigation.public.members') }}
        </CvHeaderMenuItem>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: contents;
}
</style>
