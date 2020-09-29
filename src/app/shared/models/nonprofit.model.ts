export class Nonprofit {
    NonprofitName: { type: string };
    NonprofitAddress: {
        StreetAddress: { type: string };
        City: { type: string };
        State: { type: string };
        ZipCode: { type: string };
        Country: string;
    };
    WebsiteUrl: { type: string };
    NonprofitType: { type: string };

    NonprofitEIN: { type: number};
    Socials: {
        NonprofitLinkedIn?: { type: string };
        NonprofitTwitter?: { type: string };
        NonprofitYoutube?: { type: string };
        NonprofitInstagram?: { type: string };
        NonprofitFacebook?: { type: string };
    };
    NonprofitPhone: { type: string };
    RegistereePhone: { type: string };
    NonprofitEmail: { type: string };
    RegistereeLinkedIn: { type: string };
    RegistereeTitle: { type: string };

    NonprofitLogoImage: { type: any };
    NonprofitReferred?: { type: string };
    eNewsletter: { type: boolean };
    TermsAgree: { type: boolean };
    success: any;
}


