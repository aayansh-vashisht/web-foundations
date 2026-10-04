import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/* ==========================================================================
   1. STATE MACHINE TYPES
   ========================================================================== */

/**
 * Discriminated union representing the complete lifecycle of an asynchronous request.
 */
export type RequestState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };

/**
 * Compile-time exhaustiveness check.
 * If a new status is added to RequestState without handling it, TypeScript will fail compilation.
 */
export function assertNever(x: never): never {
    throw new Error(`Unhandled state reached: ${JSON.stringify(x)}`);
}

/* ==========================================================================
   2. STATE HANDLER IMPLEMENTATIONS
   ========================================================================== */

/**
 * Functional pattern-matching handler that evaluates every state branch.
 */
export function matchRequestState<T, R>(
    state: RequestState<T>,
    matcher: {
        idle: () => R;
        loading: () => R;
        success: (data: T) => R;
        error: (message: string) => R;
    }
): R {
    switch (state.status) {
        case 'idle':
            return matcher.idle();
        case 'loading':
            return matcher.loading();
        case 'success':
            return matcher.success(state.data);
        case 'error':
            return matcher.error(state.message);
        default:
            return assertNever(state);
    }
}

/**
 * State renderer function producing formatted terminal outputs for each state.
 */
export function renderRequestState<T>(
    state: RequestState<T>,
    formatData: (data: T) => string = (d) => JSON.stringify(d, null, 2)
): string {
    return matchRequestState(state, {
        idle: () => '⚪ [IDLE]: System waiting. No network calls active.',
        loading: () => '🟡 [LOADING]: Asynchronous request in flight... please wait.',
        success: (data) => `🟢 [SUCCESS]: Data received successfully:\n${formatData(data)}`,
        error: (message) => `🔴 [ERROR]: Request failed. Reason: "${message}"`,
    });
}

/* ==========================================================================
   3. SIMULATED ASYNC DISPATCHER & INTERACTIVE CLI
   ========================================================================== */

interface ServerHealthPayload {
    uptimeSeconds: number;
    activeConnections: number;
    environment: string;
    region: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function simulateFetch(
    outcome: 'success' | 'network_error' | 'timeout'
): Promise<ServerHealthPayload> {
    await sleep(1200); // Simulate network latency

    if (outcome === 'network_error') {
        throw new Error('503 Service Unavailable: Remote upstream host unreachable.');
    }

    if (outcome === 'timeout') {
        throw new Error('408 Request Timeout: Gateway deadline exceeded after 1200ms.');
    }

    return {
        uptimeSeconds: 84920,
        activeConnections: 142,
        environment: 'production-us-east',
        region: 'iad-cluster-04',
    };
}

async function startCli() {
    const rl = readline.createInterface({ input, output });
    let currentState: RequestState<ServerHealthPayload> = { status: 'idle' };

    while (true) {
        console.log('\n===============================================');
        console.log('       STATE MACHINE CONTROLLER (CLI)          ');
        console.log('===============================================');
        console.log(`Current Status: ${currentState.status.toUpperCase()}`);
        console.log('1. Dispatch Successful Request (idle -> loading -> success)');
        console.log('2. Dispatch Failing Request (idle -> loading -> error)');
        console.log('3. Dispatch Timeout Request (idle -> loading -> error)');
        console.log('4. Reset to Idle');
        console.log('5. Print State Inspection (Evaluated by handler)');
        console.log('6. Exit');

        const choice = (await rl.question('\nSelect an action (1-6): ')).trim();

        switch (choice) {
            case '1':
            case '2':
            case '3': {
                const scenario =
                    choice === '1' ? 'success' : choice === '2' ? 'network_error' : 'timeout';

                // 1. Transition to LOADING
                currentState = { status: 'loading' };
                console.log('\n' + renderRequestState(currentState));

                // 2. Await simulated network call
                try {
                    const result = await simulateFetch(scenario);
                    // Transition to SUCCESS
                    currentState = { status: 'success', data: result };
                } catch (err) {
                    // Transition to ERROR
                    currentState = {
                        status: 'error',
                        message: err instanceof Error ? err.message : 'Unknown exception occurred.',
                    };
                }

                // 3. Render final state
                console.log('\n' + renderRequestState(currentState));
                break;
            }

            case '4': {
                currentState = { status: 'idle' };
                console.log('\nState reset.');
                console.log(renderRequestState(currentState));
                break;
            }

            case '5': {
                console.log('\n--- State Inspection via Exhaustive Matcher ---');
                console.log(renderRequestState(currentState));
                break;
            }

            case '6': {
                console.log('Terminating state machine session. Goodbye!');
                rl.close();
                return;
            }

            default: {
                console.log('Invalid option. Please choose between 1 and 6.');
            }
        }
    }
}

startCli();