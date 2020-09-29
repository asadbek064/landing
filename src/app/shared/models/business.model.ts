export class Business {
    BusinessName: { type: string };
    BusinessAddress: {
        StreetAddress: { type: string };
        City: { type: string };
        State: { type: string };
        ZipCode: { type: string };
        Country: string;
    };
    WebsiteUrl: { type: string };
    BusinessType: { type: string };

    BusinessEIN: { type: number};
    Socials: {
        BusinessLinkedIn?: { type: string };
        BusinessTwitter?: { type: string };
        BusinessYoutube?: { type: string };
        BusinessInstagram?: { type: string };
        BusinessFacebook?: { type: string };
    };
    BusinessPhone: { type: string };
    RegistereePhone: { type: string };
    BusinessEmail: { type: string };
    RegistereeLinkedIn: { type: string };
    RegistereeTitle: { type: string };

    designated_NonProfit?: string;
    eNewsletter: { type: boolean };
    TermsAgree: { type: boolean };
    success: any;
}
