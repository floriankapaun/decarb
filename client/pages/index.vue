<template>
    <div>
        <Hero
            level="1"
            :title="$t('p.index.hero.h')"
            :subtitle="$t('p.index.hero.p')"
            :button="$t('p.index.hero.ctaButton')"
            :to="localeRoute(registerDomainLink)"
        />
        <section class="bx--grid how-to">
            <div class="bx--row">
                <div class="bx--col-sm-2 bx--col-md-2 step">
                    <Report32 />
                    <p>{{ $t('p.index.howTo[0]') }}</p>
                </div>
                <div class="bx--col-sm-2 bx--col-md-2 step">
                    <Carbon32 />
                    <p>{{ $t('p.index.howTo[1]') }}</p>
                </div>
                <div class="bx--col-sm-2 bx--col-md-2 step">
                    <Badge32 />
                    <p>{{ $t('p.index.howTo[2]') }}</p>
                </div>
                <div class="bx--col-sm-2 bx--col-md-2 step">
                    <Analytics32 />
                    <p>{{ $t('p.index.howTo[3]') }}</p>
                </div>
            </div>
        </section>
        <section class="benefits">
            <div class="bx--grid">
                <h2>{{ $t('p.index.benefits.h') }}</h2>
                <p>{{ $t('p.index.benefits.p') }}</p>
                <p>
                    <NuxtLink
                        :to="localeRoute(registerDomainLink)"
                        class="bx--btn bx--btn--primary"
                    >
                        {{ $t('p.index.benefits.ctaButton') }}
                    </NuxtLink>
                </p>
            </div>
        </section>
        <Hero
            level="2"
            :title="$t('p.index.howItWorks.h')"
            :button="$t('p.index.howItWorks.ctaButton')"
            :to="localeRoute('about')"
        />
    </div>
</template>

<script>
import Report32 from '@carbon/icons-vue/lib/report/32'
import Carbon32 from '@carbon/icons-vue/lib/carbon/32'
import Badge32 from '@carbon/icons-vue/lib/badge/32'
import Analytics32 from '@carbon/icons-vue/lib/analytics/32'

import { mapGetters } from 'vuex'

export default {
    name: 'Index',
    components: {
        Report32,
        Carbon32,
        Badge32,
        Analytics32,
    },
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/',
        },
    },
    computed: {
        ...mapGetters({
            getIsLoggedIn: 'auth/getIsLoggedIn',
        }),
        registerDomainLink() {
            if (this.getIsLoggedIn) return 'dashboard/register-domain'
            return 'register'
        },
    },
}
</script>

<style lang="scss" scoped>
.how-to,
.benefits {
    padding-top: $spacing-10;
    padding-bottom: $spacing-10;

    @include carbon--breakpoint(md) {
        padding-top: $spacing-12;
        padding-bottom: $spacing-12;
    }
}

.step {
    svg {
        display: block;
        margin-bottom: $spacing-05;
    }

    p {
        max-width: 20ch;
    }
}

.benefits {
    p {
        max-width: 50ch;
    }
}
</style>
