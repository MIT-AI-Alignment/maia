// Use this to make high-level changes to the website in one place.
export const CONFIG = {
    banner: {
        visible: true,
        text: "Orientation 2026: fill out the MAIA interest form to grab merch at our events!",
        link: "https://airtable.com/app3u6UqyNPuDm3bn/pagGaVOc5VOJO8pIF/form",
        ctaText: "Fill it out"
    },
    orientation: {
        // Linked from the /orientation26 QR short link, the banner, and the Orientation 2026 page.
        // Submitting it is what unlocks merch at orientation events.
        interestFormLink: "https://airtable.com/app3u6UqyNPuDm3bn/pagGaVOc5VOJO8pIF/form",
        // Popup shown on first load (once per browser session) that sends people to the orientation page.
        // Hidden automatically on the orientation page itself.
        popup: {
            visible: true,
            title: "Welcome to MAIA!",
            text: "Orientation 2026 is happening now. See the schedule, RSVP to events, and fill out the interest form to grab merch.",
            ctaText: "Go to Orientation 2026",
            dismissText: "Maybe later",
            href: "/orientation-2026/"
        },
        // The printed banner + foam-board QR codes encode the bare homepage URL (and MIT's http->https
        // redirect drops any path), so the homepage sends phone visitors that arrive with no referrer
        // (= QR scans) straight to the form, once per device. Set to "" to turn this off.
        homepageQrRedirectUntil: "2026-10-01"
    },
    // TODO: See if up to date.
    mailingListLink: "https://mailchi.mp/0b6484dd282e/public",
    membership: {
        applicationLink: "https://airtable.com/appmfPejcK3lp2StV/pagywO1vQtW28ZYpA/form"
    },
    events: {
        // This is the public MAIA calendar, separate from the organizers' planning calendar.
        calendarIcalLink:
            "https://calendar.google.com/calendar/ical/e11a0576562133f0383f64cbca8dad84b0de285f16008b48eed6e80ea3d1f468%40group.calendar.google.com/public/basic.ics",
        calendarLink:
            "https://calendar.google.com/calendar/u/0?cid=ZTExYTA1NzY1NjIxMzNmMDM4M2Y2NGNiY2E4ZGFkODRiMGRlMjg1ZjE2MDA4YjQ4ZWVkNmU4MGVhM2QxZjQ2OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
    },
    aisf_ml: {
        visible: true,
        deadline: "",
        deadline_short: "",
        applicationLink: "",
        fallInterestFormLink:
            "https://airtable.com/appHwdJxaquLCsb75/pagMgBP9vydmwnBF4/form"
    },
    aisf_gov: {
        visible: true,
        deadline: "",
        deadline_short: "",
        applicationLink: ""
    },
} as const;
