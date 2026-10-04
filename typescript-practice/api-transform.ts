import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/* ==========================================================================
   1. TYPES (RAW VS. APPLICATION MODEL)
   ========================================================================== */

/**
 * Raw wire payload received from an external API endpoint.
 * Contains snake_case naming, nullable values, and raw numeric timestamps.
 */
export interface RawUserApiResponse {
    user_id: string;
    first_name: string;
    last_name?: string | null;
    contact_email: string;
    registered_at_timestamp?: number | null;
    is_verified?: boolean | null;
    account_tier?: 'basic' | 'pro' | 'enterprise' | null;
    profile_details?: {
        bio?: string | null;
        avatar_url?: string | null;
        tags?: string[] | null;
    } | null;
}

/**
 * Normalized application model consumed by UI components and domain logic.
 * Enforces camelCase, concrete Date instances, and non-nullable defaults.
 */
export interface UserModel {
    id: string;
    fullName: string;
    email: string;
    registeredAt: Date;
    isVerified: boolean;
    tier: 'basic' | 'pro' | 'enterprise';
    bio: string;
    avatarUrl: string;
    tags: string[];
}

/* ==========================================================================
   2. TRANSFORMATION ENGINE & FALLBACK HANDLERS
   ========================================================================== */

const DEFAULT_AVATAR = 'https://assets.example.com/defaults/avatar-placeholder.png';
const DEFAULT_BIO = 'This user has not written a bio yet.';
const DEFAULT_TIER: UserModel['tier'] = 'basic';

/**
 * Transforms raw untrusted API data into the domain model while handling missing,
 * undefined, or null optional values.
 */
export function transformUserResponse(raw: RawUserApiResponse): UserModel {
    // Safe string sanitization and fallback for names
    const firstName = (raw.first_name ?? 'Anonymous').trim();
    const lastName = raw.last_name?.trim() ?? '';
    const fullName = lastName.length > 0 ? `${firstName} ${lastName}` : firstName;

    // Safe timestamp to Date instance conversion
    let registeredAt: Date;
    if (
        raw.registered_at_timestamp &&
        !Number.isNaN(raw.registered_at_timestamp) &&
        raw.registered_at_timestamp > 0
    ) {
        registeredAt = new Date(raw.registered_at_timestamp);
    } else {
        registeredAt = new Date();
    }

    // Safe tier extraction
    const allowedTiers: UserModel['tier'][] = ['basic', 'pro', 'enterprise'];
    const tier: UserModel['tier'] =
        raw.account_tier && allowedTiers.includes(raw.account_tier)
            ? raw.account_tier
            : DEFAULT_TIER;

    // Optional nested profile object resolution
    const profile = raw.profile_details;
    const bio = profile?.bio?.trim() || DEFAULT_BIO;
    const avatarUrl = profile?.avatar_url?.trim() || DEFAULT_AVATAR;
    const tags = Array.isArray(profile?.tags)
        ? profile.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
        : [];

    return {
        id: raw.user_id || 'unknown_id',
        fullName,
        email: raw.contact_email?.trim() || 'unspecified@example.com',
        registeredAt,
        isVerified: Boolean(raw.is_verified),
        tier,
        bio,
        avatarUrl,
        tags,
    };
}

/* ==========================================================================
   3. INTERACTIVE CLI RUNNER
   ========================================================================== */

const completeRawPayload: RawUserApiResponse = {
    user_id: 'usr_8721',
    first_name: 'Sarah',
    last_name: 'Connor',
    contact_email: 's.connor@resistance.net',
    registered_at_timestamp: 1773000000000,
    is_verified: true,
    account_tier: 'enterprise',
    profile_details: {
        bio: 'Systems security specialist and tactical operations lead.',
        avatar_url: 'https://images.example.com/profiles/sarah.jpg',
        tags: ['security', 'leadership', 'tactical'],
    },
};

const incompleteRawPayload: RawUserApiResponse = {
    user_id: 'usr_1049',
    first_name: 'John',
    last_name: null, // missing optional string
    contact_email: 'john.doe@sample.org',
    registered_at_timestamp: null, // missing timestamp
    is_verified: null, // missing boolean flag
    account_tier: null, // missing enum tier
    profile_details: null, // missing nested object entirely
};

function displayComparison(raw: RawUserApiResponse, transformed: UserModel) {
    console.log('\n--- [INPUT] Raw API Payload (JSON) ---');
    console.log(JSON.stringify(raw, null, 2));

    console.log('\n--- [OUTPUT] Transformed Application Model ---');
    console.log({
        ...transformed,
        registeredAt: `${transformed.registeredAt.toISOString()} (Date Object)`,
    });
    console.log('-----------------------------------------------------\n');
}

async function startCli() {
    const rl = readline.createInterface({ input, output });

    while (true) {
        console.log('=== API RESPONSE TRANSFORMATION CLI ===');
        console.log('1. Transform complete API response');
        console.log('2. Transform incomplete API response (nulls & missing fields)');
        console.log('3. Enter custom raw JSON payload');
        console.log('4. Exit');

        const choice = (await rl.question('\nSelect an option (1-4): ')).trim();

        switch (choice) {
            case '1': {
                const transformed = transformUserResponse(completeRawPayload);
                displayComparison(completeRawPayload, transformed);
                break;
            }
            case '2': {
                const transformed = transformUserResponse(incompleteRawPayload);
                displayComparison(incompleteRawPayload, transformed);
                break;
            }
            case '3': {
                console.log('\nEnter or paste a JSON object matching RawUserApiResponse (single line):');
                const customInput = await rl.question('> ');
                try {
                    const parsed = JSON.parse(customInput) as RawUserApiResponse;
                    const transformed = transformUserResponse(parsed);
                    displayComparison(parsed, transformed);
                } catch (err) {
                    console.log(`\nInvalid JSON input: ${(err as Error).message}\n`);
                }
                break;
            }
            case '4': {
                console.log('Exiting transformer.');
                rl.close();
                return;
            }
            default: {
                console.log('Invalid option, please choose between 1 and 4.\n');
            }
        }
    }
}

startCli();