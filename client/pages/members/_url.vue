<template>
    <!--
        TODO:
        - Add Certificate Download
        - Add Comparisons for Offset Amount
        - Add Project Details
        - Add Achievements
        OPTIMIZE: Display AppError on v-if !getDomainProfile insted of Re-Routing
    -->
    <div>
        <section class="wrapper">
            <div class="bx--grid">
                <h1 class="title">{{ $t('p.member.hero.h') }}</h1>
                <div class="subtitle-wrapper">
                    <p class="subtitle">{{ getDomainProfile.url }}</p>
                    <p class="subtitle">{{ getDomainProfile.companyName }}</p>
                </div>
            </div>
        </section>

        <Hero :title="getTitle" level="2" type="tertiary" />

        <Hero
            v-if="getDomainProfile.offsetKilograms"
            :title="getAmount"
            level="2"
            type="secondary"
        />

        <section class="bx--grid explanation">
            <div class="bx--row">
                <div class="bx--col-sm-4">
                    <h2>{{ $t('p.member.explanation.h') }}</h2>
                    <p>{{ $t('p.member.explanation.p') }}</p>
                </div>
            </div>
        </section>

        <Hero
            level="2"
            :title="$t('p.member.cta.h')"
            :subtitle="$t('p.member.cta.p')"
            :button="$t('p.member.cta.button')"
            to="register"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'MemberPage',
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/members/:url',
        },
    },
    async fetch({ redirect, route, store }) {
        if (!route?.params?.url) redirect('/members')
        if (
            store.getters['domains/getDomainPublicProfile']?.url ===
            route.params.url
        )
            return
        // Get the public profile
        await store.dispatch(
            'domains/fetchDomainPublicProfile',
            route.params.url
        )
        // If it couldn't be fetched, redirect to members overview
        if (!store.getters['domains/getDomainPublicProfile'])
            redirect('/members')
    },
    computed: {
        ...mapGetters({
            getDomainProfile: 'domains/getDomainPublicProfile',
        }),
        getTitle() {
            const date = this.$d(
                new Date(this.getDomainProfile.createdAt),
                'short'
            )
            return this.$t('p.member.since', { date })
        },
        getAmount() {
            // TODO: Improve formatting
            const amount = this.getDomainProfile.offsetKilograms ?? 0
            const unit = 'KG'
            return this.$t('p.member.amount', { amount, unit })
        },
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: $spacing-09 0 $spacing-10;
    background-color: $primary;
    color: $white;

    @include carbon--breakpoint(md) {
        padding: $spacing-11 0 $spacing-12;
    }
}

.title {
    margin-bottom: 0;
    @include decarb--type-style('display-04');
}

.subtitle-wrapper {
    @include carbon--breakpoint(md) {
        display: flex;
    }
}

.subtitle {
    margin-top: $spacing-06;
    @include decarb--type-style('expressive-heading-03');
    @include carbon--breakpoint(md) {
        flex: 1;
    }
}

.subtitle + .subtitle {
    margin-top: 0;
    @include carbon--breakpoint(md) {
        margin-top: $spacing-06;
        padding-left: $spacing-07;
    }
}

.explanation {
    padding-top: $spacing-09;
    padding-bottom: $spacing-10;
    @include carbon--breakpoint(md) {
        padding-top: $spacing-11;
        padding-bottom: $spacing-12;
    }
}
</style>
