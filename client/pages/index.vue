<template>
    <div>
        <div class="bx--grid bx--grid--full-width landing-page">
            <div class="bx--row landing-page__banner">
                <div class="bx--col-lg-16">
                    <CvBreadcrumb
                        no-trailing-slash
                        aria-label="Page navigation"
                    >
                        <CvBreadcrumbItem>
                            <CvLink href="/">Getting started</CvLink>
                        </CvBreadcrumbItem>
                    </CvBreadcrumb>
                    <h1 class="landing-page__heading">
                        Design &amp; build with Carbon
                    </h1>
                </div>
            </div>
            <div class="bx--row landing-page__r2">
                <div class="bx--col bx--no-gutter">
                    <CvTabs selected="0" aria-label="Tab navigation">
                        <CvTab label="About">
                            <div
                                class="bx--grid bx--grid--no-gutter bx--grid--full-width"
                            >
                                <div class="bx--row landing-page__tab-content">
                                    <div class="bx--col-md-4 bx--col-lg-7">
                                        <h2 class="landing-page__subheading">
                                            What is Carbon?
                                        </h2>
                                        <p class="landing-page__p">
                                            Carbon is IBM’s open-source design
                                            system for digital products and
                                            experiences. With the IBM Design
                                            Language as its foundation, the
                                            system consists of working code,
                                            design tools and resources, human
                                            interface guidelines, and a vibrant
                                            community of contributors.
                                        </p>
                                        <CvButton>Learn more</CvButton>
                                    </div>
                                    <div
                                        class="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8"
                                    >
                                        <img
                                            class="landing-page__illo"
                                            src="@/assets/img/tab-illo.png"
                                            alt="Carbon illustration"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CvTab>
                        <CvTab label="Design">
                            <div
                                class="bx--grid bx--grid--no-gutter bx--grid--full-width"
                            >
                                <div class="bx--row landing-page__tab-content">
                                    <div class="bx--col-lg-16">
                                        Rapidly build beautiful and accessible
                                        experiences. The Carbon kit contains all
                                        resources you need to get started.
                                    </div>
                                </div>
                            </div>
                        </CvTab>
                        <CvTab label="Develop">
                            <div
                                class="bx--grid bx--grid--no-gutter bx--grid--full-width"
                            >
                                <div class="bx--row landing-page__tab-content">
                                    <div class="bx--col-lg-16">
                                        Carbon provides styles and components in
                                        Vanilla, React, Angular, and Vue for
                                        anyone building on the web.
                                    </div>
                                </div>
                            </div>
                        </CvTab>
                    </CvTabs>
                </div>
            </div>
            <div class="bx--row landing-page__r3">
                <div class="bx--col-md-4 bx--col-lg-4">
                    <h3 class="landing-page__label">The Principles</h3>
                </div>
                <div class="bx--col-md-4 bx--col-lg-4">Carbon is Open</div>
                <div class="bx--col-md-4 bx--col-lg-4">Carbon is Modular</div>
                <div class="bx--col-md-4 bx--col-lg-4">
                    Carbon is Consistent
                </div>
            </div>
        </div>
        <h1>Get an ecofriendly website</h1>
        <p>
            Track and offset your websites carbon footprint. So you can make a
            big difference with little effort.
        </p>
        <NuxtLink to="register" class="inline-block p-4 bg-green-500"
            >Register your domain</NuxtLink
        >
        <!-- <p v-if="$fetchState.pending">Fetching mountains...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <p>{{ mountains }}</p>
        <button @click="$fetch">Refresh</button> -->
    </div>
</template>

<script>
import {
    CvButton,
    CvBreadcrumb,
    CvBreadcrumbItem,
    CvLink,
    CvTabs,
    CvTab,
} from '@carbon/vue'

// eslint-disable-next-line no-unused-vars
const props = {
    tabs: {
        selected: 0,
        triggerHref: '#',
        role: 'navigation',
    },
    tab: {
        href: '#',
        role: 'presentation',
        tabIndex: 0,
    },
}

export default {
    components: {
        CvButton,
        CvBreadcrumb,
        CvBreadcrumbItem,
        CvLink,
        CvTabs,
        CvTab,
    },
    head() {
        // Set Meta Tags for this Page
    },
    // data() {
    //     return { mountains: [] }
    // },
    // async fetch() {
    //     this.mountains = await fetch(
    //         'http://localhost:4000/api/v1/domains'
    //     ).then((res) => res.text())
    // },
}
</script>

<style lang="scss">
@import '@/assets/scss/carbon-utils';

@import '@/assets/scss/carbon-mixins';

.landing-page__banner {
    padding-top: $spacing-05;
    padding-bottom: $spacing-07 * 4;
    @include landing-page-background;
}

.landing-page__heading {
    @include carbon--type-style('productive-heading-05');
}

.landing-page__r2 .bx--tabs__nav {
    right: 0;
}
.landing-page__illo {
    max-width: 100%;
}
</style>
