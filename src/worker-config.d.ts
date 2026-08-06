// Generated entry-point types for Cloudflare bindings.
// `npm run cf:typegen` keeps this in sync with wrangler.toml / `.dev.vars`.
interface Env {
	ASSETS: Fetcher;
	ENVIRONMENT: string;
	DB?: D1Database;
	KV?: KVNamespace;
	R2?: R2Bucket;
}

type Runtime = import('@cloudflare/workers-types').Env;